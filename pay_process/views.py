from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .payment_utils import create_or_get_user
from django.contrib.auth.models import User
import mangopay
from mangopay.api import APIRequest
from mangopay.resources import NaturalUser, Wallet, PayPalPayIn, CardRegistration, DirectPayIn, Money, Transaction, Transfer, BankWirePayOut, BankAccount
from mangopay.utils import Address
import requests
from .serializers import TransactionSerializer, CardSerializer
from rest_framework.renderers import JSONRenderer
import json
from django.db import transaction
from booking.models import BookingRequest, Notif
from trip.models import Trip
from rest_framework.generics import CreateAPIView, ListAPIView, GenericAPIView
from rest_auth.registration.app_settings import register_permission_classes
from django.db.models import Sum
from django.utils import timezone
from django.db.models import Q
from userprofile.models import Discount

# Create your views here.


class PayForBooking(CreateAPIView):
    permission_classes = register_permission_classes()

    def create(self, request, *args, **kwargs):
        # get user from user id
        with transaction.atomic():
            userId = request.data['userId']
            tripId = request.data['tripId']
            selectedBookingIds = request.data['selectedBookingIds']
            cardNumber = request.data['cardNumber']
            cardExpirationDate = request.data['cardExpirationDate']
            cardCvx = request.data['cardCvx']
            isCarrierProposition = request.data['isCarrierProposition']
            carrierProposedPrice = request.data['carrierProposedPrice']

            booking_amount = 0

            # for booking in BookingRequest.objects.filter(pk__in=[int(i) for i in selectedBookingIds]):
            #             print('IN PayForBooking for',booking)

            # user
            user = User.objects.get(pk=userId)
            userprofile = user.profile
            uses_discount = False
            discount_percentage = 0
            percentage_promo = None

            # get price to pay
            
            if isCarrierProposition:
                print("In isCarrierProposition", isCarrierProposition,carrierProposedPrice,selectedBookingIds,tripId)
                booking_amount = carrierProposedPrice
            else:
                booking_requests = BookingRequest.objects.filter(pk__in=selectedBookingIds)
                booking_requests_price = booking_requests.aggregate(Sum('product__proposed_price'))
                booking_amount = booking_requests_price['product__proposed_price__sum']


            if Discount.objects.filter(userprofile=userprofile).exists():
                discount = Discount.objects.filter(userprofile=userprofile).first()
                percentage_promo = discount.percentage_promo
                if percentage_promo.usage_count < percentage_promo.max_usage_count:
                    booking_amount = booking_amount * 0.95
                    percentage_promo.usage_count = percentage_promo.usage_count + 1
                    discount_percentage = 5
                    uses_discount = True
            fees = booking_amount*0.25
            booking_price = booking_amount + fees
            booking_price = booking_price*100

            # Get natural user
            nat_user_id = userprofile.nat_user_id
            natural_user = None
            if nat_user_id is not None:
                natural_user = NaturalUser.get(nat_user_id)
            else:
                natural_user = NaturalUser(first_name=user.first_name,
                                        last_name=user.last_name,
                                        address=None,
                                        proof_of_identity=None,
                                        proof_of_address=None,
                                        person_type='NATURAL',
                                        nationality=userprofile.country,
                                        country_of_residence=userprofile.country,
                                        birthday=1300186358,
                                        email=user.email)
                natural_user.save()
            userprofile.nat_user_id = natural_user.id
            userprofile.save()
            if userprofile.wallet_id is None:
                wallet = Wallet(owners=[natural_user],
                        description='Wallet',
                        currency='EUR',
                        tag="Wallet for User-{}".format(natural_user.id))
                wallet.save()
                userprofile.wallet_id = wallet.get_pk()
                userprofile.save()

            # Register card for user
            card_registration = CardRegistration(user=natural_user, currency='EUR')
            card_registration.save()
            

            cardInfo = {
            'accessKeyRef': card_registration.access_key,
            'data': card_registration.preregistration_data,
            'cardNumber': cardNumber,
            'cardExpirationDate': cardExpirationDate,
            'cardCvx': cardCvx,
            }

            # get tokenized card data
            response = requests.post(card_registration.card_registration_url, data=cardInfo)
            content = response.content

            # update card with data
            card_registration.registration_data = content
            card_registration.save()

            # get user wallet
            user_wallet = Wallet(id=userprofile.wallet_id)

            # pay to user wallet
            direct_payin = DirectPayIn(author=natural_user,
                               debited_funds=Money(amount=booking_price, currency='EUR'),
                               fees=Money(amount=0, currency='EUR'),
                               credited_wallet_id=user_wallet,
                               card_id=card_registration.card_id,
                               secure_mode="DEFAULT",
                               secure_mode_return_url="http://www.localhost:3000")
            direct_payin.save()

            if direct_payin.status == "SUCCEEDED":

                # transfer money from user wallet to inzula wallet
                admin_simple_user = User.objects.get(pk=1)
                admin_user = admin_simple_user.profile
                admin_nat_user_id = admin_user.nat_user_id
                inzula_user = None
                if admin_nat_user_id is not None:
                    inzula_user = NaturalUser.get(admin_nat_user_id)
                else:
                    inzula_user = NaturalUser(first_name=admin_simple_user.first_name,
                                            last_name=admin_simple_user.last_name,
                                            address=None,
                                            proof_of_identity=None,
                                            proof_of_address=None,
                                            person_type='NATURAL',
                                            nationality=admin_user.country,
                                            country_of_residence=admin_user.country,
                                            birthday=1300186358,
                                            email=admin_simple_user.email)
                    inzula_user.save()
                admin_user.nat_user_id = inzula_user.id
                admin_user.save()
                if admin_user.wallet_id is None:
                    wallet = Wallet(owners=[inzula_user],
                            description='Wallet',
                            currency='EUR',
                            tag="Wallet for User-{}".format(inzula_user.id))
                    wallet.save()
                    admin_user.wallet_id = wallet.get_pk()
                    admin_user.save()

                inzula_wallet = Wallet(id=admin_user.wallet_id)

                transfer = Transfer(author=natural_user,
                            credited_user=inzula_user,
                            debited_funds=Money(amount=booking_price, currency='EUR'),
                            fees=Money(amount=0, currency='EUR'),
                            debited_wallet=user_wallet,
                            credited_wallet=inzula_wallet)
                transfer.save()
                if transfer.status == "SUCCEEDED":
                    if percentage_promo is not None:
                        percentage_promo.save()

                    # change the status of all bookings and create notifications
                    for booking in BookingRequest.objects.filter(pk__in=[int(i) for i in selectedBookingIds]):
                        print('IN PayForBooking for',booking)
                        booking.status = 'boo'
                        booking.trip = Trip.objects.get(pk=tripId)

                        if isCarrierProposition:
                            print("In isCarrierProposition2")
                            booking.product.amount_paid = carrierProposedPrice
                            booking.product.charges_paid = carrierProposedPrice * 0.25
                        else:
                            booking.product.amount_paid = booking.product.proposed_price
                            booking.product.charges_paid = booking.product.proposed_price * 0.25

                        if uses_discount:
                            if isCarrierProposition:
                                print("In isCarrierProposition3")
                                booking.product.amount_paid = ((100-discount_percentage) * carrierProposedPrice)/100
                                booking.product.charges_paid = ((100-discount_percentage) * carrierProposedPrice * 0.25)/100
                            else:
                                booking.product.amount_paid = ((100-discount_percentage) * booking.product.proposed_price)/100
                                booking.product.charges_paid = ((100-discount_percentage) * booking.product.proposed_price * 0.25)/100
                            
                        booking.product.save()
                        booking.save()
                        # generate notifications
                        Notif.objects.create(trip=booking.trip,
                        booking_request=booking,
                        created_by=booking.request_by,
                        price_proposal=None,
                        created_on=timezone.now(),
                        type='payment_for_booking',
                        status='unseen')
                    result = {
                    }
                    return Response(result, status=status.HTTP_200_OK)
        return Response({"error": "Error processing payment."}, status=status.HTTP_400_BAD_REQUEST)


class PayForBookingCardId(CreateAPIView):
    permission_classes = register_permission_classes()

    def create(self, request, *args, **kwargs):
        # get user from user id
        with transaction.atomic():
            userId = request.data['userId']
            tripId = request.data['tripId']
            selectedBookingIds = request.data['selectedBookingIds']
            cardId = request.data['cardId']

        # for booking in BookingRequest.objects.filter(pk__in=[int(i) for i in selectedBookingIds]):
        #     print('IN PayForBookingCardId for',booking.product.amount_paid)

            print('IN PayForBookingCardId ',cardId)

            #users
            user = User.objects.get(pk=userId)
            userprofile = user.profile
            uses_discount = False
            discount_percentage = 0
            percentage_promo = None

            # get price to pay
            booking_requests = BookingRequest.objects.filter(pk__in=selectedBookingIds)
            booking_requests_price = booking_requests.aggregate(Sum('product__proposed_price'))
            booking_amount = booking_requests_price['product__proposed_price__sum']
            if Discount.objects.filter(userprofile=userprofile).exists():
                discount = Discount.objects.filter(userprofile=userprofile).first()
                percentage_promo = discount.percentage_promo
                if percentage_promo.usage_count < percentage_promo.max_usage_count:
                    booking_amount = float(booking_amount) * 0.95
                    percentage_promo.usage_count = percentage_promo.usage_count + 1
                    discount_percentage = 5
                    uses_discount = True
            fees = booking_amount*0.25
            booking_price = booking_amount + fees
            booking_price = booking_price*100

            # Get natural user
            nat_user_id = userprofile.nat_user_id
            natural_user = None
            if nat_user_id is not None:
                natural_user = NaturalUser.get(nat_user_id)
            else:
                natural_user = NaturalUser(first_name=user.first_name,
                                        last_name=user.last_name,
                                        address=None,
                                        proof_of_identity=None,
                                        proof_of_address=None,
                                        person_type='NATURAL',
                                        nationality=userprofile.country,
                                        country_of_residence=userprofile.country,
                                        birthday=1300186358,
                                        email=user.email)
                natural_user.save()
            userprofile.nat_user_id = natural_user.id
            userprofile.save()
            if userprofile.wallet_id is None:
                wallet = Wallet(owners=[natural_user],
                        description='Wallet',
                        currency='EUR',
                        tag="Wallet for User-{}".format(natural_user.id))
                wallet.save()
                userprofile.wallet_id = wallet.get_pk()
                userprofile.save()

            # get user wallet
            user_wallet = Wallet(id=userprofile.wallet_id)

            # pay to user wallet
            direct_payin = DirectPayIn(author=natural_user,
                               debited_funds=Money(amount=booking_price, currency='EUR'),
                               fees=Money(amount=0, currency='EUR'),
                               credited_wallet_id=user_wallet,
                               card_id=int(cardId),
                               secure_mode="DEFAULT",
                               secure_mode_return_url="http://www.localhost:3000")
            direct_payin.save()
            if direct_payin.status == "SUCCEEDED":

                # transfer money from user wallet to inzula wallet
                admin_simple_user = User.objects.get(pk=1)
                admin_user = admin_simple_user.profile
                admin_nat_user_id = admin_user.nat_user_id
                inzula_user = None
                if admin_nat_user_id is not None:
                    inzula_user = NaturalUser.get(admin_nat_user_id)
                else:
                    inzula_user = NaturalUser(first_name=admin_simple_user.first_name,
                                            last_name=admin_simple_user.last_name,
                                            address=None,
                                            proof_of_identity=None,
                                            proof_of_address=None,
                                            person_type='NATURAL',
                                            nationality=admin_user.country,
                                            country_of_residence=admin_user.country,
                                            birthday=1300186358,
                                            email=admin_simple_user.email)
                    inzula_user.save()
                admin_user.nat_user_id = inzula_user.id
                admin_user.save()
                if admin_user.wallet_id is None:
                    wallet = Wallet(owners=[inzula_user],
                            description='Wallet',
                            currency='EUR',
                            tag="Wallet for User-{}".format(inzula_user.id))
                    wallet.save()
                    admin_user.wallet_id = wallet.get_pk()
                    admin_user.save()

                inzula_wallet = Wallet(id=admin_user.wallet_id)

                transfer = Transfer(author=natural_user,
                            credited_user=inzula_user,
                            debited_funds=Money(amount=booking_price, currency='EUR'),
                            fees=Money(amount=0, currency='EUR'),
                            debited_wallet=user_wallet,
                            credited_wallet=inzula_wallet)
                transfer.save()

                if transfer.status == "SUCCEEDED":
                    if percentage_promo is not None:
                        percentage_promo.save()
                    # change the status of all bookings and create notifications
                    for booking in BookingRequest.objects.filter(pk__in=[int(i) for i in selectedBookingIds]):
                        booking.status = 'boo'
                        booking.trip = Trip.objects.get(pk=tripId)
                        booking.product.amount_paid = booking.product.proposed_price
                        booking.product.charges_paid = booking.product.proposed_price * 0.25
                        if uses_discount:
                            booking.product.amount_paid = ((100-discount_percentage) * booking.product.proposed_price)/100
                            booking.product.charges_paid = ((100-discount_percentage) * booking.product.proposed_price * 0.25)/100
                            
                        booking.product.save()
                        booking.save()
                        # generate notifications
                        Notif.objects.create(trip=booking.trip,
                        booking_request=booking,
                        created_by=booking.request_by,
                        price_proposal=None,
                        created_on=timezone.now(),
                        type='payment_for_booking',
                        status='unseen')
                    result = {
                    }
                    return Response(result, status=status.HTTP_200_OK)
        return Response({"error": "Error processing payment."}, status=status.HTTP_400_BAD_REQUEST)


def refund_charges(booking, in_decline):
    with transaction.atomic():
        booking_amt = booking.product.amount_paid
        print('refund_charges booking_amt',booking_amt)

        charges_amount = booking.product.charges_paid
        print('refund_charges charges_amount',charges_amount)
        
        total_amt = charges_amount + booking_amt
        amount_to_deduce_from_charges = (booking.product.amount_paid*0.03)+ 1.7
        amount_to_refund = 0.0
        if amount_to_deduce_from_charges >= total_amt:
            amount_to_refund = 0.0
        else:
            amount_to_refund = ( total_amt - amount_to_deduce_from_charges )*100
        if in_decline:
            amount_to_refund = total_amt * 100
        userprofile_to_refund = booking.request_by

        print('refund_charges userprofile_to_refund',userprofile_to_refund)

        # Get natural user to refund
        recipient_nat_user_id = userprofile_to_refund.nat_user_id
        recipient_natural_user = None
        if recipient_nat_user_id is not None:
            recipient_natural_user = NaturalUser.get(recipient_nat_user_id)
        else:
            recipient_natural_user = NaturalUser(first_name=userprofile_to_refund.user.first_name,
                                    last_name=userprofile_to_refund.user.last_name,
                                    address=None,
                                    proof_of_identity=None,
                                    proof_of_address=None,
                                    person_type='NATURAL',
                                    nationality=userprofile_to_refund.country,
                                    country_of_residence=userprofile_to_refund.country,
                                    birthday=1300186358,
                                    email=userprofile_to_refund.user.email)
            recipient_natural_user.save()
        userprofile_to_refund.nat_user_id = recipient_natural_user.id
        userprofile_to_refund.save()

        print('refund_charges recipient_natural_user',recipient_nat_user_id,recipient_natural_user)

        # get user wallet
        if userprofile_to_refund.wallet_id is None:
            wallet = Wallet(owners=[recipient_natural_user],
                    description='Wallet',
                    currency='EUR',
                    tag="Wallet for User-{}".format(recipient_natural_user.id))
            wallet.save()
            userprofile_to_refund.wallet_id = wallet.get_pk()
            userprofile_to_refund.save()
        user_wallet = Wallet.get(userprofile_to_refund.wallet_id)

        # transfer money from user wallet to inzula wallet
        # get inzula wallet
        admin_simple_user = User.objects.get(pk=1)
        admin_user = admin_simple_user.profile
        admin_nat_user_id = admin_user.nat_user_id
        inzula_user = None
        if admin_nat_user_id is not None:
            inzula_user = NaturalUser.get(admin_nat_user_id)
        else:
            inzula_user = NaturalUser(first_name=admin_simple_user.first_name,
                                    last_name=admin_simple_user.last_name,
                                    address=None,
                                    proof_of_identity=None,
                                    proof_of_address=None,
                                    person_type='NATURAL',
                                    nationality=admin_user.country,
                                    country_of_residence=admin_user.country,
                                    birthday=1300186358,
                                    email=admin_simple_user.email)
            inzula_user.save()
        admin_user.nat_user_id = inzula_user.id
        admin_user.save()
        # get inzula wallet
        if admin_user.wallet_id is None:
            wallet = Wallet(owners=[inzula_user],
                    description='Wallet',
                    currency='EUR',
                    tag="Wallet for User-{}".format(inzula_user.id))
            wallet.save()
            admin_user.wallet_id = wallet.get_pk()
            admin_user.save()

        inzula_wallet = Wallet(id=admin_user.wallet_id)

        print('refund_charges amount_to_refund',amount_to_refund)
        # transfer funds from inzula wallet to user wallet
        if amount_to_refund != 0.0:
            transfer = Transfer(author=inzula_user,
                        credited_user=recipient_natural_user,
                        debited_funds=Money(amount=amount_to_refund, currency='EUR'),
                        fees=Money(amount=0, currency='EUR'),
                        debited_wallet=inzula_wallet,
                        credited_wallet=user_wallet)
            transfer.save()
            if transfer.status == "SUCCEEDED":
                booking.product.amount_paid = 0
                booking.product.charges_paid = 0
                booking.product.save()

class PayForBookingWithWallet(CreateAPIView):
    permission_classes = register_permission_classes()

    def create(self, request, *args, **kwargs):
        # get user from user id
        with transaction.atomic():
            userId = request.data['userId']
            tripId = request.data['tripId']
            selectedBookingIds = request.data['selectedBookingIds']

            #users
            user = User.objects.get(pk=userId)
            userprofile = user.profile
            uses_discount = False
            discount_percentage = 0
            percentage_promo =None

            # get price to pay
            booking_requests = BookingRequest.objects.filter(pk__in=selectedBookingIds)
            booking_requests_price = booking_requests.aggregate(Sum('product__proposed_price'))
            booking_amount = booking_requests_price['product__proposed_price__sum']
            if Discount.objects.filter(userprofile=userprofile).exists():
                discount = Discount.objects.filter(userprofile=userprofile).first()
                percentage_promo = discount.percentage_promo
                if percentage_promo.usage_count < percentage_promo.max_usage_count:
                    booking_amount = booking_amount * 0.95
                    percentage_promo.usage_count = percentage_promo.usage_count + 1
                    discount_percentage = 5
                    uses_discount = True
            fees = booking_amount*0.25
            booking_price = booking_amount + fees
            booking_price = booking_price*100

            # Get natural user
            nat_user_id = userprofile.nat_user_id
            natural_user = None
            if nat_user_id is not None:
                natural_user = NaturalUser.get(nat_user_id)
            else:
                natural_user = NaturalUser(first_name=user.first_name,
                                        last_name=user.last_name,
                                        address=None,
                                        proof_of_identity=None,
                                        proof_of_address=None,
                                        person_type='NATURAL',
                                        nationality=userprofile.country,
                                        country_of_residence=userprofile.country,
                                        birthday=1300186358,
                                        email=user.email)
                natural_user.save()
            userprofile.nat_user_id = natural_user.id
            userprofile.save()
            if userprofile.wallet_id is None:
                wallet = Wallet(owners=[natural_user],
                        description='Wallet',
                        currency='EUR',
                        tag="Wallet for User-{}".format(natural_user.id))
                wallet.save()
                userprofile.wallet_id = wallet.get_pk()
                userprofile.save()

            # get user wallet
            user_wallet = Wallet.get(userprofile.wallet_id)

            # Check if there are enough funds in user wallet
            if nat_user_id is not None and userprofile.wallet_id is not None and user_wallet is not None:
                funds = str(user_wallet.balance) if user_wallet.balance is not None else ""
                booking_requests = BookingRequest.objects.filter(request_by=userprofile, pk__in=selectedBookingIds)
                booking_requests_price = booking_requests.aggregate(Sum('product__proposed_price'))
                booking_amount = booking_requests_price['product__proposed_price__sum']
                fees_amount = booking_amount*0.25
                fees = fees_amount * 100
                bookings_price = (booking_amount + fees_amount)*100
                booking_price = booking_amount + fees_amount
                payable_funds = float(funds[4:].replace(",", "")) / 100
                if payable_funds < booking_price:
                    return Response({"error": "You do not have enough funds. Use another payment method.{}-{}".format(payable_funds, booking_price)}, status=status.HTTP_200_OK)

            # transfer money from user wallet to inzula wallet
            admin_simple_user = User.objects.get(pk=1)
            admin_user = admin_simple_user.profile
            admin_nat_user_id = admin_user.nat_user_id
            inzula_user = None
            if admin_nat_user_id is not None:
                inzula_user = NaturalUser.get(admin_nat_user_id)
            else:
                inzula_user = NaturalUser(first_name=admin_simple_user.first_name,
                                        last_name=admin_simple_user.last_name,
                                        address=None,
                                        proof_of_identity=None,
                                        proof_of_address=None,
                                        person_type='NATURAL',
                                        nationality=admin_user.country,
                                        country_of_residence=admin_user.country,
                                        birthday=1300186358,
                                        email=admin_simple_user.email)
                inzula_user.save()
            admin_user.nat_user_id = inzula_user.id
            admin_user.save()
            if admin_user.wallet_id is None:
                wallet = Wallet(owners=[inzula_user],
                        description='Wallet',
                        currency='EUR',
                        tag="Wallet for User-{}".format(inzula_user.id))
                wallet.save()
                admin_user.wallet_id = wallet.get_pk()
                admin_user.save()

            inzula_wallet = Wallet(id=admin_user.wallet_id)

            transfer = Transfer(author=natural_user,
                        credited_user=inzula_user,
                        debited_funds=Money(amount=booking_price, currency='EUR'),
                        fees=Money(amount=0, currency='EUR'),
                        debited_wallet=user_wallet,
                        credited_wallet=inzula_wallet)
            transfer.save()
            if transfer.status == "SUCCEEDED":
                if percentage_promo is not None:
                    percentage_promo.save()
                # change the status of all bookings and create notifications
                for booking in BookingRequest.objects.filter(pk__in=[int(i) for i in selectedBookingIds]):
                    booking.status = 'boo'
                    booking.trip = Trip.objects.get(pk=tripId)
                    if uses_discount:
                        booking.product.amount_paid = ((100-discount_percentage) * booking.product.proposed_price)/100
                        booking.product.charges_paid = ((100-discount_percentage) * booking.product.proposed_price * 0.25)/100
                        booking.product.save()
                    booking.save()
                    # generate notifications
                    Notif.objects.create(trip=booking.trip,
                    booking_request=booking,
                    created_by=booking.request_by,
                    price_proposal=None,
                    created_on=timezone.now(),
                    type='payment_for_booking',
                    status='unseen')
                result = {
                }
                return Response(result, status=status.HTTP_200_OK)
        return Response({"error": "Error processing payment."}, status=status.HTTP_400_BAD_REQUEST)



class PayForBookingPaypal(CreateAPIView):
    permission_classes = register_permission_classes()

    def create(self, request, *args, **kwargs):
        # get user from user id
        with transaction.atomic():
            userId = request.data['userId']
            tripId = request.data['tripId']
            selectedBookingIds = request.data['selectedBookingIds']

            # get price to pay
            booking_requests = BookingRequest.objects.filter(pk__in=selectedBookingIds)
            booking_requests_price = booking_requests.aggregate(Sum('product__proposed_price'))
            booking_amount = booking_requests_price['product__proposed_price__sum']
            fees = booking_amount*0.25
            fees_amount = fees*100
            booking_price = booking_amount + fees
            booking_price = booking_price*100

            # Get natural user
            user = User.objects.get(pk=userId)
            userprofile = user.profile
            nat_user_id = userprofile.nat_user_id
            natural_user = None
            if nat_user_id is not None:
                natural_user = NaturalUser.get(nat_user_id)
            else:
                natural_user = NaturalUser(first_name=user.first_name,
                                        last_name=user.last_name,
                                        address=None,
                                        proof_of_identity=None,
                                        proof_of_address=None,
                                        person_type='NATURAL',
                                        nationality=userprofile.country,
                                        country_of_residence=userprofile.country,
                                        birthday=1300186358,
                                        email=user.email)
                natural_user.save()
            userprofile.nat_user_id = natural_user.id
            userprofile.save()
            if userprofile.wallet_id is None:
                wallet = Wallet(owners=[natural_user],
                        description='Wallet',
                        currency='EUR',
                        tag="Wallet for User-{}".format(natural_user.id))
                wallet.save()
                userprofile.wallet_id = wallet.get_pk()
                userprofile.save()

            # get user wallet
            user_wallet = Wallet(id=userprofile.wallet_id)

            # pay to user wallet
            paypal_payin = PayPalPayIn(author=natural_user,
                           debited_funds=Money(amount=booking_price, currency='EUR'),
                           fees=Money(amount=0, currency='EUR'),
                           return_url = "http://www.localhost:3000",
                           credited_wallet_id=user_wallet)

            paypal_payin.save()

            # transfer money from user wallet to inzula wallet
            admin_simple_user = User.objects.get(pk=1)
            admin_user = admin_simple_user.profile
            admin_nat_user_id = admin_user.nat_user_id
            inzula_user = None
            if admin_nat_user_id is not None:
                inzula_user = NaturalUser.get(nat_user_id)
            else:
                inzula_user = NaturalUser(first_name=admin_simple_user.first_name,
                                        last_name=admin_simple_user.last_name,
                                        address=None,
                                        proof_of_identity=None,
                                        proof_of_address=None,
                                        person_type='NATURAL',
                                        nationality=admin_user.country,
                                        country_of_residence=admin_user.country,
                                        birthday=1300186358,
                                        email=admin_simple_user.email)
                inzula_user.save()
            admin_user.nat_user_id = inzula_user.id
            admin_user.save()
            if admin_user.wallet_id is None:
                wallet = Wallet(owners=[inzula_user],
                        description='Wallet',
                        currency='EUR',
                        tag="Wallet for User-{}".format(inzula_user.id))
                wallet.save()
                admin_user.wallet_id = wallet.get_pk()
                admin_user.save()

            inzula_wallet = Wallet(id=admin_user.wallet_id)

            transfer = Transfer(author=natural_user,
                        credited_user=inzula_user,
                        debited_funds=Money(amount=fees_amount, currency='EUR'),
                        fees=Money(amount=0, currency='EUR'),
                        debited_wallet=user_wallet,
                        credited_wallet=inzula_wallet)
            transfer.save()

            # change the status of all bookings and create notifications
            for booking in BookingRequest.objects.filter(pk__in=[int(i) for i in selectedBookingIds]):
                booking.status = 'boo'
                booking.trip = Trip.objects.get(pk=tripId)
                booking.save()
                # generate notifications
                Notif.objects.create(trip=booking.trip,
                booking_request=booking,
                created_by=booking.request_by,
                price_proposal=None,
                created_on=timezone.now(),
                type='payment_for_booking',
                status='unseen')
            result = {
            }
            return Response(result, status=status.HTTP_200_OK)
        return Response({"error": "Error processing payment."}, status=status.HTTP_400_BAD_REQUEST)



class Cashout(CreateAPIView):
    permission_classes = register_permission_classes()

    def create(self, request, *args, **kwargs):
        # get user from user id
        with transaction.atomic():
            userId = request.data['userId']
            amount = request.data['amount']
            acc_owner_name = request.data['account_owner_name']
            acc_owner_address = request.data['account_owner_address']
            acc_owner_postal_code = request.data['account_owner_postal_code']
            acc_owner_country = request.data['account_owner_country']
            account_iban = request.data['account_IBAN']
            account_bic = request.data['account_BIC']

            # Get natural user
            user = User.objects.get(pk=userId)
            userprofile = user.profile
            nat_user_id = userprofile.nat_user_id
            natural_user = None
            if nat_user_id is not None:
                natural_user = NaturalUser.get(nat_user_id)
            else:
                natural_user = NaturalUser(first_name=user.first_name,
                                        last_name=user.last_name,
                                        address=None,
                                        proof_of_identity=None,
                                        proof_of_address=None,
                                        person_type='NATURAL',
                                        nationality=userprofile.country,
                                        country_of_residence=userprofile.country,
                                        birthday=1300186358,
                                        email=user.email)
                natural_user.save()
            userprofile.nat_user_id = natural_user.id
            userprofile.save()
            if userprofile.wallet_id is None:
                wallet = Wallet(owners=[natural_user],
                        description='Wallet',
                        currency='EUR',
                        tag="Wallet for User-{}".format(natural_user.id))
                wallet.save()
                userprofile.wallet_id = wallet.get_pk()
                userprofile.save()
            

            # Register account for user
            bankaccount_iban = BankAccount(owner_name=acc_owner_name,
                              user_id=nat_user_id,
                              type="IBAN",
                              owner_address=Address(address_line_1=acc_owner_address, address_line_2='',
                              postal_code=acc_owner_postal_code, country=acc_owner_country),
                              iban=account_iban,
                              bic=account_bic)
            bankaccount_iban.save()

            # get user wallet
            user_wallet = Wallet(id=userprofile.wallet_id)

            # Cashout: Pay from wallet to bank account
            payout = BankWirePayOut(author=natural_user,
                       debited_funds=Money(amount=amount, currency='EUR'),
                       fees=Money(amount=0, currency='EUR'),
                       debited_wallet=user_wallet,
                       bank_account=bankaccount_iban,
                       bank_wire_ref="Cashout from Inzula")
            payout.save()

            result = {
            }
            return Response(result, status=status.HTTP_200_OK)
        return Response({"error": "Error processing payment."}, status=status.HTTP_400_BAD_REQUEST)



class CreateNaturalUser(APIView):
    def post(self, request, format=None):
        # Get or create mangopay user
        userId = request.data['userId']
        user = User.objects.get(pk=userId)
        user_profile = user.profile
        nat_user_id = user_profile.nat_user_id
        natural_user = None
        wallet = None
        if nat_user_id is not None:
            natural_user = NaturalUser.get(nat_user_id)
        else:
            natural_user = NaturalUser(first_name=user.first_name,
                                       last_name=user.last_name,
                                       address=None,
                                       proof_of_identity=None,
                                       proof_of_address=None,
                                       person_type='NATURAL',
                                       nationality=user_profile.country,
                                       country_of_residence=user_profile.country,
                                       birthday=1300186358,
                                       email=user.email)
            natural_user.save()

        admin_user = User.objects.get(pk=1)
        admin_user_profile = admin_user.profile
        admin_nat_user_id = admin_user_profile.nat_user_id
        admin_natural_user = None
        admin_wallet = None
        if admin_nat_user_id is not None:
            admin_natural_user = NaturalUser.get(admin_nat_user_id)
        else:
            admin_natural_user = NaturalUser(first_name=admin_user.first_name,
                                       last_name=admin_user.last_name,
                                       address=None,
                                       proof_of_identity=None,
                                       proof_of_address=None,
                                       person_type='NATURAL',
                                       nationality=admin_user_profile.country,
                                       country_of_residence=admin_user_profile.country,
                                       birthday=1300186358,
                                       email=admin_user.email)
            admin_natural_user.save()
        # Create user wallet
        if user_profile.wallet_id is None:
            wallet = Wallet(owners=[natural_user],
                    description='Wallet',
                    currency='EUR',
                    tag="Wallet for User-{}".format(natural_user.id))
            wallet.save()
            user_profile.wallet_id = wallet.get_pk()
        if admin_user_profile.wallet_id is None:
            admin_wallet = Wallet(owners=[admin_natural_user],
                    description='Wallet',
                    currency='EUR',
                    tag="Wallet for Admin-{}".format(admin_natural_user.id))
            admin_wallet.save()
            admin_user_profile.wallet_id = admin_wallet.get_pk()
        user_profile.nat_user_id = natural_user.id
        user_profile.save()

        admin_user_profile.nat_user_id = admin_natural_user.id
        admin_user_profile.save()
        result = {
        'naturalUserId': natural_user.id,
        'walletId': wallet.id if wallet is not None else user_profile.wallet_id
        }
        return Response(result, status=status.HTTP_200_OK)


class InitCardInfo(APIView):

    def post(self, request, format=None):
        # get user from user id
        userId = request.data['userId']
        nat_user_id = User.objects.get(pk=userId).profile.nat_user_id
        natural_user = NaturalUser.get(nat_user_id)
        # Register card for user
        card_registration = CardRegistration(user=natural_user, currency='EUR')
        card_registration.save()
        result = {
        'accessKeyRef': card_registration.access_key,
        'data': card_registration.preregistration_data,
        'card_id': card_registration.id,
        'reg_url': card_registration.card_registration_url,
        'user_id': userId,
        'nat_user_id': nat_user_id
        }
        post_data = {**result, **request.data}
        response = requests.post(result['reg_url'], data=post_data)
        content = response.content
        return Response({**result, 'tokenized_data': content}, status=status.HTTP_200_OK)


class UpdateCardInfo(APIView):

    def post(self, request, format=None):
        # get user from user id
        userId = request.data['user_id']
        cardId = request.data['card_id']
        data = request.data['data']

        nat_user_id = User.objects.get(pk=userId).profile.nat_user_id
        natural_user = NaturalUser.get(nat_user_id)

        card_registration = CardRegistration(id=cardId)
        card_registration.registration_data = data
        card_registration.save()

        result = {
        'card_id': card_registration.card_id
        }
        return Response(result, status=status.HTTP_200_OK)


class PayIn(APIView):

    def post(self, request, format=None):
        # check if user exists or get user
        #nat_user = create_or_get_user(request.data['card_f_name'], request.data['card_l_name'], request.data['email'])
        # create user wallet if he does not have one
        #wallet = get_or_create_user_wallet(nat_user)
        # register card
        #card = register_card(nat_user)
        # send credited money into user wallet
        # transfer money from user wallet to inzula wallet
        # end.

        userId = request.data['user_id']
        cardId = request.data['card_id']
        selectedBookingIds = request.data['selectedBookingIds']

        userprofile = User.objects.get(pk=userId).profile
        nat_user_id = userprofile.nat_user_id
        natural_user = NaturalUser.get(nat_user_id)
        user_wallet = Wallet(id=userprofile.wallet_id)
        card = CardRegistration(id=cardId)

        direct_payin = DirectPayIn(author=natural_user,
                           debited_funds=Money(amount=4000, currency='EUR'),
                           fees=Money(amount=100, currency='EUR'),
                           credited_wallet_id=user_wallet,
                           card_id=card,
                           secure_mode="DEFAULT",
                           secure_mode_return_url="http://www.localhost:3000")
        direct_payin.save()

        return Response({"result"}, status=status.HTTP_200_OK)


class IncomingUserTransactions(APIView):

    def post(self, request, format=None):
        # get user from user id
        userId = request.data['user_id']

        result = {
        'transactions': []
        }

        nat_user_id = User.objects.get(pk=userId).profile.nat_user_id
        admin_userprofile = User.objects.get(pk=1).profile
        admin_nat_user_id = admin_userprofile.nat_user_id
        admin_natural_user = None
        if admin_nat_user_id is not None:
            admin_natural_user = NaturalUser.get(admin_nat_user_id)
        if nat_user_id is not None:
            natural_user = NaturalUser.get(nat_user_id)

            transactions = Transaction.all(user_id=admin_natural_user.get_pk(),
            status='SUCCEEDED',
            type='TRANSFER',
            credited_user_id=natural_user.get_pk(),
            sort='CreationDate:desc')

            serializer = TransactionSerializer(transactions, many=True)
            jsonResults = JSONRenderer().render(serializer.data)
            result['transactions'] = json.loads(jsonResults)
            return Response(result, status=status.HTTP_200_OK)
        return Response(result, status=status.HTTP_200_OK)


class OutgoingUserTransactions(APIView):

    def post(self, request, format=None):
        # get user from user id
        userId = request.data['user_id']

        result = {
        'transactions': []
        }
        userprofile = User.objects.get(pk=userId).profile
        nat_user_id = userprofile.nat_user_id
        admin_userprofile = User.objects.get(pk=1).profile
        admin_nat_user_id = admin_userprofile.nat_user_id
        admin_natural_user = None
        if admin_nat_user_id is not None:
            admin_natural_user = NaturalUser.get(admin_nat_user_id)
        if nat_user_id is not None:
            natural_user = NaturalUser.get(nat_user_id)

            # transactions = Transaction.all(user_id=natural_user.get_pk(),status='SUCCEEDED',type='TRANSFER',credited_user_id=admin_natural_user.get_pk(),sort='CreationDate:desc')
            # transactions = Transaction.all(user_id=natural_user.get_pk(),
            # status='SUCCEEDED',
            # type='TRANSFER',
            # credited_user_id=admin_natural_user.get_pk(),
            # sort='CreationDate:desc')

            if userprofile.wallet_id is not None:
                user_wallet = Wallet(id=userprofile.wallet_id)
                transactions = user_wallet.transactions.all(status='SUCCEEDED',
                                                    type='TRANSFER',
                                                    sort='CreationDate:desc')
            serializer = TransactionSerializer(transactions, context={'request': request}, many=True)
            jsonResults = JSONRenderer().render(serializer.data)
            result['transactions'] = json.loads(jsonResults)
            return Response(result, status=status.HTTP_200_OK)
        return Response(result, status=status.HTTP_200_OK)


class WithdrawalUserTransactions(APIView):

    def post(self, request, format=None):
        # get user from user id
        userId = request.data['user_id']

        result = {
        'transactions': []
        }

        nat_user_id = User.objects.get(pk=userId).profile.nat_user_id
        if nat_user_id is not None:
            natural_user = NaturalUser.get(nat_user_id)

            transactions = Transaction.all(user_id=natural_user.get_pk(),
            status='SUCCEEDED',
            type='PAYOUT',
            sort='CreationDate:desc')

            serializer = TransactionSerializer(transactions, many=True)
            jsonResults = JSONRenderer().render(serializer.data)
            result['transactions'] = json.loads(jsonResults)
            return Response(result, status=status.HTTP_200_OK)
        return Response(result, status=status.HTTP_200_OK)


class DepositUserTransactions(APIView):

    def post(self, request, format=None):
        # get user from user id
        userId = request.data['user_id']

        result = {
        'transactions': []
        }

        nat_user_id = User.objects.get(pk=userId).profile.nat_user_id
        if nat_user_id is not None:
            natural_user = NaturalUser.get(nat_user_id)

            transactions = Transaction.all(user_id=natural_user.get_pk(),
            status='SUCCEEDED',
            type='PAYIN',
            sort='CreationDate:desc')
            serializer = TransactionSerializer(transactions, many=True)
            jsonResults = JSONRenderer().render(serializer.data)
            result['transactions'] = json.loads(jsonResults)
            return Response(result, status=status.HTTP_200_OK)
        return Response(result, status=status.HTTP_200_OK)



class FailedUserTransactions(APIView):

    def post(self, request, format=None):
        # get user from user id
        userId = request.data['user_id']

        result = {
        'transactions': []
        }

        nat_user_id = User.objects.get(pk=userId).profile.nat_user_id
        if nat_user_id is not None:
            natural_user = NaturalUser.get(nat_user_id)

            transactions = Transaction.all(user_id=natural_user.get_pk(), status='FAILED', sort='CreationDate:desc')

            serializer = TransactionSerializer(transactions, many=True)
            jsonResults = JSONRenderer().render(serializer.data)
            result['transactions'] = json.loads(jsonResults)
            return Response(result, status=status.HTTP_200_OK)
        return Response(result, status=status.HTTP_200_OK)


class UserWalletFunds(APIView):

    def post(self, request, format=None):
        # get user from user id
        userId = request.data['user_id']

        result = {
        'funds': "EUR 0"
        }
        userprofile = User.objects.get(pk=userId).profile
        nat_user_id = userprofile.nat_user_id
        if nat_user_id is not None:
            natural_user = NaturalUser.get(nat_user_id)
            user_wallet = Wallet.get(userprofile.wallet_id)
            if userprofile.wallet_id is not None and user_wallet is not None:
                funds = str(user_wallet.balance) if user_wallet.balance is not None else ""
                wallet_funds = float(funds[4:].replace(",", "")) / 100
                result['funds'] = "EUR " + str(wallet_funds)
            return Response(result, status=status.HTTP_200_OK)
        return Response(result, status=status.HTTP_200_OK)


class MaxPayOutAmount(APIView):

    def post(self, request, format=None):
        # get user from user id
        userId = request.data['user_id']

        result = {
        'funds': "",
        'bookings': "",
        'max_amt': ""
        }
        userprofile = User.objects.get(pk=userId).profile
        nat_user_id = userprofile.nat_user_id
        if nat_user_id is not None:
            natural_user = NaturalUser.get(nat_user_id)
            user_wallet = Wallet.get(userprofile.wallet_id)
            if userprofile.wallet_id is not None and user_wallet is not None:
                result['funds'] = str(user_wallet.balance) if user_wallet.balance is not None else ""
                booking_requests = BookingRequest.objects.filter(request_by=userprofile)
                booking_requests = booking_requests.filter(Q(status="boo") | Q(status="awa"))
                booking_requests_price = booking_requests.aggregate(Sum('product__proposed_price'))
                booking_requests_price = booking_requests_price["product__proposed_price__sum"] if booking_requests_price["product__proposed_price__sum"] is not None else 0
                wallet_funds = float(result['funds'][4:].replace(",", "")) / 100
                result['bookings'] = booking_requests_price
                result['max_amt'] = round(wallet_funds - booking_requests_price, 2) if booking_requests_price<wallet_funds else 0.0
            return Response(result, status=status.HTTP_200_OK)
        return Response(result, status=status.HTTP_200_OK)


class RefundAmount(APIView):

    def post(self, request, format=None):
        # get bookingId
        bookingId = request.data['bookingId']
        result = {
        'amt': 0
        }
        if bookingId != 0:
            booking_request = BookingRequest.objects.get(pk=bookingId)
            print('RefundAmount booking_request',booking_request)
            br_price = booking_request.product.amount_paid
            print('RefundAmount br_price',br_price)
            charges = booking_request.product.charges_paid
            print('RefundAmount charges',charges)
            br_price_and_charges = charges + br_price
            amount_to_refund = br_price_and_charges - ((float(br_price) * 0.03) + 1.7)
            # if amount_to_refund >= float(br_price_and_charges):
            if amount_to_refund <= 0:
                amount_to_refund = 0.0
            result["amt"] = amount_to_refund
            return Response(result, status=status.HTTP_200_OK)
        return Response(result, status=status.HTTP_200_OK)


class UserCards(APIView):

    def post(self, request, format=None):
        # get user from user id
        userId = request.data['user_id']

        result = {
        'cards': []
        }
        userprofile = User.objects.get(pk=userId).profile
        nat_user_id = userprofile.nat_user_id
        if nat_user_id is not None:
            natural_user = NaturalUser.get(nat_user_id)
            user_cards = natural_user.cards.all()
            serializer = CardSerializer(user_cards, many=True)
            jsonResults = JSONRenderer().render(serializer.data)
            result['cards'] = json.loads(jsonResults)
            return Response(result, status=status.HTTP_200_OK)
        return Response(result, status=status.HTTP_200_OK)


        
def deliverPaymentToCarrier(booking_request_id):
    booking_request = BookingRequest.objects.get(pk=booking_request_id)
    trip = booking_request.trip
    carrier = trip.created_by
    sender = booking_request.request_by
    # amount to send to carrier
    booking_amount = float(booking_request.product.proposed_price)*100

    # Get carrier user
    carrier_nat_user_id = carrier.nat_user_id
    carrier_natural_user = None
    if carrier_nat_user_id is not None:
        carrier_natural_user = NaturalUser.get(carrier_nat_user_id)
    else:
        carrier_natural_user = NaturalUser(first_name=carrier.user.first_name,
                                last_name=carrier.user.last_name,
                                address=None,
                                proof_of_identity=None,
                                proof_of_address=None,
                                person_type='NATURAL',
                                nationality=carrier.country,
                                country_of_residence=carrier.country,
                                birthday=1300186358,
                                email=carrier.user.email)
        carrier_natural_user.save()
    carrier.nat_user_id = carrier_natural_user.id
    carrier.save()
    if carrier.wallet_id is None:
        c_wallet = Wallet(owners=[carrier_natural_user],
                description='Wallet',
                currency='EUR',
                tag="Wallet for User-{}".format(carrier_natural_user.id))
        c_wallet.save()
        carrier.wallet_id = c_wallet.get_pk()
        carrier.save()

    # get carrier user wallet
    carrier_user_wallet = Wallet(id=carrier.wallet_id)

    # Get sender user
    sender_nat_user_id = sender.nat_user_id
    sender_natural_user = None
    if sender_nat_user_id is not None:
        sender_natural_user = NaturalUser.get(sender_nat_user_id)
    else:
        sender_natural_user = NaturalUser(first_name=sender.user.first_name,
                                last_name=sender.user.last_name,
                                address=None,
                                proof_of_identity=None,
                                proof_of_address=None,
                                person_type='NATURAL',
                                nationality=sender.country,
                                country_of_residence=sender.country,
                                birthday=1300186358,
                                email=sender.user.email)
        sender_natural_user.save()
    sender.nat_user_id = sender_natural_user.id
    sender.save()
    if sender.wallet_id is None:
        s_wallet = Wallet(owners=[sender_natural_user],
                description='Wallet',
                currency='EUR',
                tag="Wallet for User-{}".format(sender_natural_user.id))
        s_wallet.save()
        sender.wallet_id = s_wallet.get_pk()
        sender.save()

    # get sender user wallet
    sender_user_wallet = Wallet(id=sender.wallet_id)

    # transfer funds
    transfer = Transfer(author=sender_natural_user,
                        credited_user=carrier_natural_user,
                        debited_funds=Money(amount=booking_amount, currency='EUR'),
                        fees=Money(amount=0, currency='EUR'),
                        debited_wallet=sender_user_wallet,
                        credited_wallet=carrier_user_wallet)
    transfer.save()

    # update booking
    booking_request.status = 'del'
    booking_request.save()

    # generate notifications
    Notif.objects.create(trip=booking_request.trip,
    booking_request=booking_request,
    created_by=booking_request.request_by,
    price_proposal=None,
    created_on=timezone.now(),
    type='payment_for_delivery',
    status='unseen')
    Notif.objects.create(trip=booking_request.trip,
    booking_request=booking_request,
    created_by=booking_request.request_by,
    price_proposal=None,
    created_on=timezone.now(),
    type='product_delivered',
    status='unseen')




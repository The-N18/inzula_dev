from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .payment_utils import create_or_get_user
from django.contrib.auth.models import User
import mangopay
from mangopay.api import APIRequest
from mangopay.resources import NaturalUser, Wallet, CardRegistration, DirectPayIn, Money, Transaction, Transfer
from mangopay.utils import Address
import requests
from .serializers import TransactionSerializer
from rest_framework.renderers import JSONRenderer
import json
from django.db import transaction
from booking.models import BookingRequest
from trip.models import Trip
from rest_framework.generics import CreateAPIView, ListAPIView, GenericAPIView
from rest_auth.registration.app_settings import register_permission_classes

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

            userprofile = User.objects.get(pk=userId).profile
            nat_user_id = userprofile.nat_user_id
            natural_user = NaturalUser.get(nat_user_id)
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
                               debited_funds=Money(amount=4000, currency='EUR'),
                               fees=Money(amount=100, currency='EUR'),
                               credited_wallet_id=user_wallet,
                               card_id=card_registration.card_id,
                               secure_mode="DEFAULT",
                               secure_mode_return_url="http://www.localhost:3000")
            direct_payin.save()

            # transfer money from user wallet to inzula wallet
            admin_user = User.objects.get(pk=1).profile
            nat_user_id = admin_user.nat_user_id
            inzula_user = NaturalUser.get(nat_user_id)

            inzula_wallet = Wallet(id=admin_user.wallet_id)

            transfer = Transfer(author=natural_user,
                        credited_user=inzula_user,
                        debited_funds=Money(amount=1000, currency='EUR'),
                        fees=Money(amount=100, currency='EUR'),
                        debited_wallet=user_wallet,
                        credited_wallet=inzula_wallet)
            transfer.save()

            for booking in BookingRequest.objects.filter(pk__in=[int(i) for i in selectedBookingIds]):
                booking.status = 'boo'
                booking.trip = Trip.objects.get(pk=tripId)
                booking.save()

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


class UserTransactions(APIView):

    def post(self, request, format=None):
        # get user from user id
        userId = request.data['user_id']

        nat_user_id = User.objects.get(pk=userId).profile.nat_user_id
        natural_user = NaturalUser.get(nat_user_id)

        transactions = Transaction.all(user_id=natural_user.get_pk(), status='SUCCEEDED')

        serializer = TransactionSerializer(transactions, many=True)
        jsonResults = JSONRenderer().render(serializer.data)
        result = {
        'transactions': json.loads(jsonResults)
        }
        return Response(result, status=status.HTTP_200_OK)

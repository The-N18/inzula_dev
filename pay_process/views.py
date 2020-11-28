from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .payment_utils import create_or_get_user
from django.contrib.auth.models import User
import mangopay
from mangopay.api import APIRequest
from mangopay.resources import NaturalUser, Wallet, CardRegistration
from mangopay.utils import Address

# Create your views here.

class CreateNaturalUser(APIView):
    def post(self, request, format=None):
        # get user from user id
        userId = request.data['userId']
        user = User.objects.get(pk=userId)
        user_profile = user.profile
        nat_user_id = user_profile.nat_user_id
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
                                       nationality=user_profile.country,
                                       country_of_residence=user_profile.country,
                                       birthday=1300186358,
                                       email=user.email)
            natural_user.save()
            user_profile.nat_user_id = natural_user.id
            user_profile.save()
        result = {
        'naturalUserId': natural_user.id
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
        'user_id': userId
        }
        return Response(result, status=status.HTTP_200_OK)


class UpdateCardInfo(APIView):

    def post(self, request, format=None):
        # get user from user id
        userId = request.data['user_id']
        cardId = request.data['card_id']
        data = request.data['data']
        nat_user_id = User.objects.get(pk=userId).profile.nat_user_id
        natural_user = NaturalUser.get(nat_user_id)
        # Register card for user
        card_registration = natural_user.cards.get(cardId)
        card_registration.registration_data = data
        card_registration.save()
        result = {
        'card_id': card_registration.id
        }
        return Response(result, status=status.HTTP_200_OK)


class PayIn(APIView):

    def post(self, request, format=None):
        # check if user exists or get user
        nat_user = create_or_get_user(request.data['card_f_name'], request.data['card_l_name'], request.data['email'])
        # create user wallet if he does not have one
        wallet = get_or_create_user_wallet(nat_user)
        # register card
        card = register_card(nat_user)
        # send credited money into user wallet
        # transfer money from user wallet to inzula wallet
        # end.
        return Response("result", status=status.HTTP_200_OK)

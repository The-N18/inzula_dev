from django.shortcuts import render
from .serializers import UserProfileUpdateSerializer, UserProfileSerializer, CitySerializer
from rest_framework.response import Response
from .models import UserProfile
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView, ListAPIView, GenericAPIView
from rest_auth.registration.app_settings import RegisterSerializer, register_permission_classes
from rest_framework import viewsets, permissions, status
from utils.pagination import CitySetPagination
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.social_serializers import TwitterLoginSerializer
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_auth.registration.views import SocialAccountListView, SocialAccountDisconnectView
from allauth.account.models import EmailAddress
from booking.models import BookingRequest
from trip.models import Trip

class CityView(ListAPIView):
    serializer_class = CitySerializer
    model = serializer_class.Meta.model
    pagination_class = CitySetPagination

    def get_queryset(self):
        name = self.request.query_params.get('label', '')
        queryset = self.model.objects.filter(label__contains=name)
        return queryset.order_by('-label')


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save()

class UpdateProfileView(CreateAPIView):
    serializer_class = UserProfileUpdateSerializer
    permission_classes = [permissions.AllowAny]

    def dispatch(self, *args, **kwargs):
        return super(UpdateProfileView, self).dispatch(*args, **kwargs)

    def get_response_data(self, user):
        if getattr(settings, 'REST_USE_JWT', False):
            data = {
                'user': user,
                'token': self.token
            }
            return JWTSerializer(data).data
        else:
            return TokenSerializer(user.auth_token).data

    def create(self, request, *args, **kwargs):
        user_id = request.data["user_id"]
        user_type = request.data["user_type"]
        user_profile_id = request.data["user_profile_id"]
        first_name = request.data["first_name"]
        last_name = request.data["last_name"]
        phone_number = request.data["phone_number"]
        email = request.data["email"]
        country = request.data["country"]
        passport_number = request.data["passport_number"]
        sex = request.data["sex"]
        picture = request.FILES.get('profile_pic', None)

        userprofile = None
        if user_profile_id:
            userprofile = UserProfile.objects.get(pk=user_profile_id)

        if userprofile:
            if picture is not None:
                userprofile.profile_pic=picture
            userprofile.phone_number=phone_number
            userprofile.country=country
            userprofile.passport_number=passport_number
            userprofile.user.first_name=first_name
            userprofile.user.last_name=last_name
            userprofile.user.email=email
            userprofile.user_type=user_type
            userprofile.sex=sex
            userprofile.user.save()
            userprofile.save()
        serializer = self.get_serializer(userprofile)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,
                        status=status.HTTP_200_OK,
                        headers=headers)


class CompleteProfileView(CreateAPIView):
    serializer_class = UserProfileUpdateSerializer
    permission_classes = [permissions.AllowAny]

    def dispatch(self, *args, **kwargs):
        return super(CompleteProfileView, self).dispatch(*args, **kwargs)

    def get_response_data(self, user):
        if getattr(settings, 'REST_USE_JWT', False):
            data = {
                'user': user,
                'token': self.token
            }
            return JWTSerializer(data).data
        else:
            return TokenSerializer(user.auth_token).data

    def create(self, request, *args, **kwargs):
        user_id = request.data["user_id"]
        user_profile_id = request.data["user_profile_id"]
        first_name = request.data["first_name"]
        last_name = request.data["last_name"]
        phone_number = request.data["phone_number"]
        country = request.data["country"]
        passport_number = request.data["passport_number"]
        sex = request.data["sex"]

        userprofile = None
        if user_profile_id:
            userprofile = UserProfile.objects.get(pk=user_profile_id)

        if userprofile:
            userprofile.phone_number=phone_number
            userprofile.country=country
            userprofile.passport_number=passport_number
            userprofile.user.first_name=first_name
            userprofile.user.last_name=last_name
            userprofile.sex=sex
            userprofile.user.save()
            userprofile.save()
        serializer = self.get_serializer(userprofile)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,
                        status=status.HTTP_200_OK,
                        headers=headers)


class DeleteProfileView(APIView):
    """
    Retrieve or delete a user
    """
    def get_object(self, pk):
        try:
            return UserProfile.objects.get(pk=pk)
        except UserProfile.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        userprofile = self.get_object(pk)
        serializer = UserProfileSerializer(userprofile)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        userprofile = self.get_object(pk)
        # delete Bookings
        BookingRequest.objects.filter(request_by=userprofile, trip=None, confirmed_by_sender=False, status="cre").delete()
        # delete trips
        Trip.objects.filter(created_by=userprofile).delete()
        # disable email
        email = EmailAddress.objects.get(user=userprofile.user.id)
        email.verified = False
        email.save()
        return Response({"detail": "OK"}, status=status.HTTP_204_NO_CONTENT)


class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
    client_class = OAuth2Client

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client

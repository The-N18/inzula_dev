from django.shortcuts import render
from .serializers import UserProfileUpdateSerializer, UserProfileSerializer
from rest_framework.response import Response
from .models import UserProfile
from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView, ListAPIView, GenericAPIView
from rest_auth.registration.app_settings import RegisterSerializer, register_permission_classes
from rest_framework import viewsets, permissions, status

# Create your views here.


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
        user_profile_id = request.data["user_profile_id"]
        first_name = request.data["first_name"]
        last_name = request.data["last_name"]
        phone_number = request.data["phone_number"]
        email = request.data["email"]
        country = request.data["country"]
        passport_number = request.data["passport_number"]
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
            userprofile.save()
        serializer = self.get_serializer(userprofile)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,
                        status=status.HTTP_200_OK,
                        headers=headers)

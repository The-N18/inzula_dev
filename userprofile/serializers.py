from .models import UserProfile
from rest_framework import serializers

class UserProfileIdSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['user']

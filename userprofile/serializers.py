from .models import UserProfile, Location
from rest_framework import serializers

class UserProfileIdSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['user']


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['latitude', 'longitude', 'long_address', 'city', 'country']

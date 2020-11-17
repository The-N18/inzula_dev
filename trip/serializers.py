from .models import Trip
from userprofile.models import UserProfile
from rest_framework import serializers
from userprofile.serializers import UserProfileIdSerializer, LocationSerializer, UserProfileDetailsSerializer

class TripSerializer(serializers.ModelSerializer):
    created_by = UserProfileIdSerializer()
    departure_location = LocationSerializer()
    destination_location = LocationSerializer()

    class Meta:
        model = Trip
        fields = ['pk', 'depart_date', 'created_by', 'comeback_date', 'trip_type', 'departure_location', 'destination_location']


class TripSearchSerializer(serializers.ModelSerializer):
    created_by = UserProfileDetailsSerializer()
    departure_location = LocationSerializer()
    destination_location = LocationSerializer()

    class Meta:
        model = Trip
        fields = ['pk', 'depart_date', 'created_by', 'comeback_date', 'trip_type', 'departure_location', 'destination_location']

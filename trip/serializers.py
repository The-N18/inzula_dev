from .models import Trip
from userprofile.models import UserProfile
from rest_framework import serializers
from userprofile.serializers import UserProfileIdSerializer, LocationSerializer

class TripSerializer(serializers.ModelSerializer):
    created_by = UserProfileIdSerializer()
    departure_location = LocationSerializer()
    destination_location = LocationSerializer()

    class Meta:
        model = Trip
        fields = ['depart_date', 'created_by', 'comeback_date', 'trip_type', 'departure_location', 'destination_location']

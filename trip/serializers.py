from .models import Trip
from userprofile.models import UserProfile
from rest_framework import serializers
from userprofile.serializers import UserProfileIdSerializer, LocationSerializer, UserProfileDetailsSerializer

class TripSerializer(serializers.ModelSerializer):
    created_by = UserProfileIdSerializer()
    departure_location = LocationSerializer()
    destination_location = LocationSerializer()
    creator_user_name = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ['pk', 'depart_date', 'created_by', 'comeback_date', 'trip_type', 'departure_location', 'destination_location', 'creator_user_name']

    def get_creator_user_name(self, obj):
        if obj.created_by:
            return obj.created_by.user.username
        return ""


class TripUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip
        fields = ['pk', 'depart_date', 'comeback_date', 'trip_type']


class TripSearchSerializer(serializers.ModelSerializer):
    created_by = UserProfileDetailsSerializer()
    departure_location = LocationSerializer()
    destination_location = LocationSerializer()
    creator_user_name = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ['pk', 'depart_date', 'created_by', 'comeback_date', 'trip_type', 'departure_location', 'destination_location', 'creator_user_name']

    def get_creator_user_name(self, obj):
        if obj.created_by:
            return obj.created_by.user.username
        return ""

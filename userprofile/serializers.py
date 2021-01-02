from .models import UserProfile, Location, City
from rest_framework import serializers

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['value', 'label', 'pk']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"


class UserProfileIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user']


class UserProfileDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'profile_pic', 'phone_number']


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField()
    user_profile_id = serializers.SerializerMethodField()
    date_joined = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['profile_pic', 'phone_number', 'date_joined', 'first_name', 'last_name', 'email', 'username', 'user_id', 'user_profile_id', 'passport_number', 'country', 'user_type']

    def get_first_name(self, obj):
        if obj.user:
            return obj.user.first_name
        return ""

    def get_last_name(self, obj):
        if obj.user:
            return obj.user.last_name
        return ""

    def get_email(self, obj):
        if obj.user:
            return obj.user.email
        return ""

    def get_username(self, obj):
        if obj.user:
            return obj.user.username
        return ""

    def get_user_id(self, obj):
        if obj.user:
            return obj.user.pk
        return ""

    def get_user_profile_id(self, obj):
        if obj:
            return obj.pk
        return ""

    def get_date_joined(self, obj):
        if obj.user:
            return obj.user.date_joined
        return ""


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['latitude', 'longitude', 'long_address', 'city', 'country']

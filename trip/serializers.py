from .models import Trip
from userprofile.models import UserProfile
from rest_framework import serializers
from userprofile.serializers import UserProfileIdSerializer

class TripSerializer(serializers.ModelSerializer):
    # created_by = UserProfileIdSerializer()
    # created_by = serializers.PrimaryKeyRelatedField(read_only=True)
    # created_by = UserProfileIdSerializer(read_only=True)
    # created_by = serializers.PrimaryKeyRelatedField(
    #     read_only=False, queryset=UserProfile.objects.all())

    class Meta:
        model = Trip
        # fields = '__all__'
        fields = ['depart_date', 'comeback_date', 'trip_type', 'departure_location', 'destination_location']

    # def create(self, validated_data):
    #     created_by = validated_data.pop('created_by')
    #     instance = Trip.objects.create(**validated_data)
        # RelatedModel.objects.create(my_model=instance, **created_by)
        # return instance

from .models import Product, ProductImage, BookingRequest
from rest_framework import serializers
from trip.serializers import TripSerializer
from userprofile.serializers import LocationSerializer


class ProductSerializer(serializers.ModelSerializer):
    pickup_location = LocationSerializer()
    departure_location = LocationSerializer()
    class Meta:
        model = Product
        fields = ["departure_date", "arrival_date",
        "departure_location", "pickup_location", "destination_location",
        "space", "weight", "price", "created_by", "creation_date",
        "name", "description", "recipient_name", "recipient_phone_number",
        "product_category", "proposed_price"]


class ProductImageSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = Product
        fields = ["product", "images"]


class BookingRequestSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    trip = TripSerializer()
    class Meta:
        model = BookingRequest
        fields = ["request_by", "trip", "product",
        "confirmed_by_sender", "made_on", "collector_id"]

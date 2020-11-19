from .models import Product, ProductImage, BookingRequest, Notif
from rest_framework import serializers
from trip.serializers import TripSerializer
from userprofile.serializers import LocationSerializer


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["image"]


class ProductSerializer(serializers.ModelSerializer):
    pickup_location = LocationSerializer()
    departure_location = LocationSerializer()
    images = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ["departure_date", "arrival_date",
        "departure_location", "pickup_location", "destination_location",
        "space", "weight", "price", "created_by", "creation_date",
        "name", "description", "recipient_name", "recipient_phone_number",
        "product_category", "proposed_price", "images", "pk"]

    def get_images(self, obj):
        images = ProductImage.objects.filter(product=obj)
        ser = ProductImageSerializer(images, many=True)
        return ser.data


class BookingRequestSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    trip = TripSerializer()
    class Meta:
        model = BookingRequest
        fields = ["request_by", "trip", "product",
        "confirmed_by_sender", "made_on", "collector_id", "pk"]


class NotifSerializer(serializers.ModelSerializer):
    trip = TripSerializer()
    booking_request = BookingRequestSerializer()

    class Meta:
        model = Notif
        fields = ["created_by", "trip", "booking_request",
        "status", "type", "created_on", "pk"]

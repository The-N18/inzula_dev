from .models import Product, ProductImage, BookingRequest, Notif, PriceProposal
from rest_framework import serializers
from trip.serializers import TripSerializer
from userprofile.serializers import LocationSerializer, CitySerializer


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["image"]


class ProductSerializer(serializers.ModelSerializer):
    destination_location = CitySerializer()
    departure_location = CitySerializer()
    images = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ["departure_date", "arrival_date",
        "departure_location", "destination_location",
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
        "confirmed_by_sender", "made_on", "collector_id", "pk", "status"]


class NotifSerializer(serializers.ModelSerializer):
    trip = TripSerializer()
    booking_request = BookingRequestSerializer()

    class Meta:
        model = Notif
        fields = ["created_by", "trip", "booking_request",
        "status", "type", "created_on", "pk"]


class NotifListSerializer(serializers.ModelSerializer):
    trip = serializers.SerializerMethodField()
    booking_request = serializers.SerializerMethodField()
    proposal = serializers.SerializerMethodField()

    class Meta:
        model = Notif
        fields = ["created_by", "trip", "booking_request",
        "status", "type", "created_on", "pk", "proposal"]

    def get_trip(self, obj):
        dct = {
        "dep_loc": None,
        "des_loc": None,
        "dep_date": None,
        "pk": None
        }
        if obj.trip:
            dct['dep_loc'] = "{}".format(obj.trip.departure_location.label)
            dct['des_loc'] = "{}".format(obj.trip.destination_location.label)
            dct['dep_date'] = "{}".format(obj.trip.depart_date)
            dct['pk'] = obj.trip.pk
        return dct

    def get_booking_request(self, obj):
        dct = {
        "product_name": None,
        "pk": None
        }
        if obj.booking_request:
            dct['product_name'] = "{}".format(obj.booking_request.product.name)
            dct['pk'] = obj.booking_request.pk
        return dct

    def get_proposal(self, obj):
        dct = {
        "price": None,
        "pk": None
        }
        if obj.price_proposal:
            dct['price'] = "{}".format(obj.price_proposal.price)
            dct['pk'] = obj.price_proposal.pk
        return dct


class PriceProposalListSerializer(serializers.ModelSerializer):
    request_by = serializers.SerializerMethodField()
    booking_request = serializers.SerializerMethodField()

    class Meta:
        model = PriceProposal
        fields = ["request_by", "price", "booking_request"]

    def get_request_by(self, obj):
        dct = {
        "username": None,
        "pk": None
        }
        if obj.request_by:
            dct['pk'] = "{}".format(obj.request_by.pk)
            dct['username'] = "{}".format(obj.request_by.user.username)
        return dct

    def get_booking_request(self, obj):
        dct = {
        "product_name": None,
        "pk": None
        }
        if obj.booking_request:
            dct['product_name'] = "{}".format(obj.booking_request.product.name)
            dct['pk'] = obj.booking_request.pk
        return dct

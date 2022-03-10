from .models import Product, ProductImage, BookingRequest, Notif, PriceProposal, Codes
from rest_framework import serializers
from trip.serializers import TripSerializer
from userprofile.serializers import CitySerializer
import datetime


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
    request_by_username = serializers.SerializerMethodField()
    booking_status = serializers.SerializerMethodField()
    is_proposed = serializers.SerializerMethodField()
    proposed_by = serializers.SerializerMethodField()
    

    class Meta:
        model = BookingRequest
        fields = ["request_by", "request_by_username", "trip", "product",
        "confirmed_by_sender", "made_on", "collector_id", "pk", "status", "booking_status", "is_proposed", "proposed_by"]

    def get_request_by_username(self, obj):
        if obj.request_by is not None:
            return obj.request_by.user.username
        return ""
    
    def get_booking_status(self,obj):
        if obj.status == "del":
            # result["detail"] = "BOOKING_ALREADY_DELIVERED"
            return 'expired'
        today = datetime.datetime.now().date()
        print('BookingRequestSerializer today',today,type(today))
        booking_date = obj.product.arrival_date
        if(type(booking_date) is str):
            date_time_obj = datetime.datetime.strptime(booking_date, '%Y-%m-%d')
            booking_date = date_time_obj.date()
            # print("yo",date_time_obj,type(date_time_obj))

        print('BookingRequestSerializer booking_date',booking_date,type(booking_date))
        delta = booking_date - today
        if delta.days <= 1:
            # result["detail"] = "TOO_LATE_TO_CANCEL"
            return 'expired'
        return ""

    def get_is_proposed(self,obj):
        # proposals = list(PriceProposal.objects.filter(booking_request=obj.pk))
        proposalsQueryset = PriceProposal.objects.filter(booking_request=obj.pk)
        proposals = list(proposalsQueryset.values())
        print("BookingRequestSerializer proposals",proposals)
        numb_of_proposals = len(proposals) 
        print("BookingRequestSerializer numb_of_proposals",numb_of_proposals)
        
        if(numb_of_proposals!=0):
            return True
        return False
    
    def get_proposed_by(self,obj):
        proposalsQueryset = PriceProposal.objects.filter(booking_request=obj.pk)
        proposals = list(proposalsQueryset.values())
        print("BookingRequestSerializer get_proposed_by proposals",proposals)

        proposed_by = [i['request_by_id'] for i in proposals]
        print("BookingRequestSerializer proposed_by",proposed_by)
        
        return proposed_by
    

class NotifSerializer(serializers.ModelSerializer):
    trip = TripSerializer()
    booking_request = BookingRequestSerializer()
    creator_username = serializers.SerializerMethodField()

    class Meta:
        model = Notif
        fields = ["created_by", "trip", "booking_request",
        "status", "type", "created_on", "pk", "creator_username"]
    
    def get_creator_username(self, obj):
        if obj.created_by is not None:
            return obj.created_by.user.username
        return None


class NotifListSerializer(serializers.ModelSerializer):
    trip = serializers.SerializerMethodField()
    booking_request = serializers.SerializerMethodField()
    proposal = serializers.SerializerMethodField()
    creator_username = serializers.SerializerMethodField()
    creator_profile_pic = serializers.SerializerMethodField()

    class Meta:
        model = Notif
        fields = ["created_by", "trip", "booking_request",
        "status", "type", "created_on", "pk", "proposal", "creator_username","creator_profile_pic"]
    
    def get_creator_username(self, obj):
        if obj.created_by is not None:
            return obj.created_by.user.username
        return None
    
    def get_creator_profile_pic(self, obj):
        if obj.created_by is not None:
            profile_pic = obj.created_by.profile_pic
            profile_pic_url = None
            print(profile_pic)
            if profile_pic:
                profile_pic_url = profile_pic.url
            return profile_pic_url
        return None
    

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
        "pk": None,
        "departure_date": None,
        "arrival_date": None
        }
        if obj.booking_request:
            dct['product_name'] = "{}".format(obj.booking_request.product.name)
            dct['departure_date'] = "{}".format(obj.booking_request.product.departure_date)
            dct['arrival_date'] = "{}".format(obj.booking_request.product.arrival_date)
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
        fields = ["request_by", "price", "booking_request", "pk"]

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


class CodeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Codes
        fields = ["created_on", "validated_on", "code", "validation_attempts", "trip", "booking"]
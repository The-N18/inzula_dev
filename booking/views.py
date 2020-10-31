from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Trip
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import TripSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
from django.views.decorators.csrf import csrf_exempt
from rest_auth.registration.app_settings import RegisterSerializer, register_permission_classes
from rest_framework.generics import CreateAPIView, ListAPIView, GenericAPIView
from django.db import transaction
from rest_framework import generics
from .models import BookingRequest, Product
from .serializers import BookingRequestSerializer
from userprofile.models import Location, UserProfile, Price, Weight, Space
from django.db.models import Q
# Create your views here.


class BookingRequestViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    queryset = BookingRequest.objects.all()
    serializer_class = BookingRequestSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save()


class BookingRequestView(CreateAPIView):
    serializer_class = BookingRequestSerializer
    permission_classes = register_permission_classes()

    def dispatch(self, *args, **kwargs):
        return super(BookingRequestView, self).dispatch(*args, **kwargs)

    def get_response_data(self, user):
        if getattr(settings, 'REST_USE_JWT', False):
            data = {
                'user': user,
                'token': self.token
            }
            return JWTSerializer(data).data
        else:
            return TokenSerializer(user.auth_token).data

    def create(self, request, *args, **kwargs):
        print(request.data)
        depart_location = Location.objects.create(city=request.data["product_location"])
        pickup_address = Location.objects.create(city=request.data["pickup_address"])
        userprofile = UserProfile.objects.get(user=request.data["created_by"]["user"])
        price = Price.objects.create(amount=request.data["product_value"])
        space = Space.objects.create(volume=request.data["product_size"])
        weight = Weight.objects.create(weight=request.data["product_weight"])
        product = Product.objects.create(arrival_date=request.data["delivery_date"],
        departure_location=depart_location,
        pickup_location=pickup_address,
        name=request.data["product_name"],
        description=request.data["product_description"],
        recipient_name=request.data["recipient_name"],
        recipient_phone_number=request.data["recipient_phone_number"],
        proposed_price=request.data["proposed_price"],
        price=price,
        space=space,
        weight=weight,
        product_category=request.data["product_category"],
        terms_conditions=request.data["terms_conditions"],
        user_agreement=request.data["user_agreement"],
        created_by=userprofile)
        booking_request = BookingRequest.objects.create(product=product, request_by=userprofile)
        serializer = self.get_serializer(booking_request)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,
                        status=status.HTTP_201_CREATED,
                        headers=headers)


class BookingRequestListView(generics.ListAPIView):
    serializer_class = BookingRequestSerializer
    model = serializer_class.Meta.model
    paginate_by = 100

    def get_queryset(self):
        departure_location = self.request.query_params.get('departure_location', '')
        departure_locations = Location.objects.filter(city__startswith=departure_location)
        destination_location = self.request.query_params.get('pickup_location', '')
        destination_locations = Location.objects.filter(city__startswith=destination_location)
        arrival_date = self.request.query_params.get('delivery_date', '')
        products = Product.objects.filter(departure_location__city__contains=departure_location, pickup_location__city__contains=destination_location)
        queryset = self.model.objects.filter(product__in=products)
        return queryset.order_by('-product')

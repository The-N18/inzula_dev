from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Trip
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import TripSerializer, TripSearchSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
from django.views.decorators.csrf import csrf_exempt
from rest_auth.registration.app_settings import RegisterSerializer, register_permission_classes
from rest_framework.generics import CreateAPIView, ListAPIView, GenericAPIView
from django.db import transaction
from userprofile.models import Location, UserProfile
from booking.models import BookingRequest
from rest_framework import generics
from utils.pagination import SearchResultsSetPagination


class TripsListView(generics.ListAPIView):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    serializer_class = TripSerializer
    model = serializer_class.Meta.model
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id', None)
        queryset = self.model.objects.all()
        if user_id is not None:
            queryset = queryset.filter(created_by=user_id)
        return queryset.order_by('-depart_date')


@api_view(['POST', 'GET'])
@ensure_csrf_cookie
def trip_search(request):
    if request.method == 'GET':
        print(request.data)
        # serializer = SnippetSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response("OK", status=status.HTTP_200_OK)


class TripView(CreateAPIView):
    serializer_class = TripSerializer
    permission_classes = register_permission_classes()

    def dispatch(self, *args, **kwargs):
        return super(TripView, self).dispatch(*args, **kwargs)

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
        depart_location = Location.objects.create(city=request.data["departure_location"]["city"])
        dest_location = Location.objects.create(city=request.data["destination_location"]["city"])
        userprofile = UserProfile.objects.get(user=request.data["created_by"]["user"])
        trip = Trip.objects.create(departure_location=depart_location, destination_location=dest_location, created_by=userprofile, depart_date=request.data["depart_date"], comeback_date=request.data["comeback_date"], trip_type=request.data["trip_type"])
        serializer = self.get_serializer(trip)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,
                        status=status.HTTP_201_CREATED,
                        headers=headers)


class AddBookingsToTripView(CreateAPIView):
    serializer_class = TripSerializer
    permission_classes = register_permission_classes()

    def dispatch(self, *args, **kwargs):
        return super(AddBookingsToTripView, self).dispatch(*args, **kwargs)

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
        tripId = request.data["tripId"]
        bookingListIds = request.data["selectedBookings"]
        trip = None
        if tripId is not None:
            trip = Trip.objects.get(pk=tripId)
            for item in bookingListIds:
                bookingRequest = BookingRequest.objects.get(pk=item)
                bookingRequest.trip = trip
                bookingRequest.save()
        serializer = self.get_serializer(trip)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,
                        status=status.HTTP_200_OK,
                        headers=headers)


class TripSearchView(generics.ListAPIView):
    serializer_class = TripSearchSerializer
    model = serializer_class.Meta.model
    pagination_class = SearchResultsSetPagination

    def get_queryset(self):
        departure_location = self.request.query_params.get('departure_location', '')
        departure_locations = Location.objects.filter(city__startswith=departure_location)
        destination_location = self.request.query_params.get('destination_location', '')
        destination_locations = Location.objects.filter(city__startswith=destination_location)
        depart_date = self.request.query_params.get('depart_date', '')
        queryset = self.model.objects.filter(departure_location__city__contains=departure_location, destination_location__city__contains=destination_location)
        return queryset.order_by('-depart_date')

from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Trip
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import TripSerializer, TripSearchSerializer, TripUpdateSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, RetrieveUpdateAPIView
from django.views.decorators.csrf import csrf_exempt
from rest_auth.registration.app_settings import RegisterSerializer, register_permission_classes
from rest_framework.generics import CreateAPIView, ListAPIView, GenericAPIView
from django.db import transaction
from userprofile.models import Location, UserProfile, City
from booking.models import BookingRequest
from rest_framework import generics
from utils.pagination import SearchResultsSetPagination
from django.http import Http404
import datetime
from django.db.models import Q
from django.contrib.auth.models import User

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
        depart_location = City.objects.get(pk=request.data["departure_location"])
        dest_location = City.objects.get(pk=request.data["destination_location"])
        userprofile = UserProfile.objects.get(user=request.data["created_by"]["user"])
        depDate = request.data["depart_date"]
        start_date = datetime.datetime.strptime(depDate, "%Y-%m-%dT%H:%M:%S.%fZ").date()
        depDate2 = start_date.strftime('%Y-%m-%d')
        cbDate = request.data["comeback_date"]
        end_date, cbDate2 = None, None
        if cbDate is not '':
            end_date = datetime.datetime.strptime(cbDate, "%Y-%m-%dT%H:%M:%S.%fZ").date()
            cbDate2 = end_date.strftime('%Y-%m-%d')
        trip = Trip.objects.create(departure_location=depart_location, destination_location=dest_location, created_by=userprofile, depart_date=depDate2, comeback_date=cbDate2, trip_type=request.data["trip_type"])
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
        # departure_locations = City.objects.filter(label__startswith=departure_location)
        destination_location = self.request.query_params.get('destination_location', '')
        # destination_locations = City.objects.filter(label__startswith=destination_location)
        # depart_date = self.request.query_params.get('depart_date', '')
        arrDate = self.request.query_params.get('travel_date', '')
        user_id = self.request.query_params.get('user_id', '')
        trips = Trip.objects.all()
        if user_id != '':
            user_profile = User.objects.get(pk=int(user_id)).profile
            trips = trips.exclude(created_by=user_profile)
        if departure_location:
            # departure_location_obj = City.objects.filter(pk=departure_location)
            trips = trips.filter(departure_location__pk=departure_location)
        if destination_location:
            # destination_location_obj = City.objects.get(pk=destination_location)
            trips = trips.filter(destination_location__pk=destination_location)
        if arrDate != "":
            start_date = datetime.datetime.strptime(arrDate, "%Y-%m-%dT%H:%M:%S.%fZ").date()
            arrival_date = start_date.strftime('%Y-%m-%d')
            trips = trips.filter(Q(depart_date=arrival_date) | Q(comeback_date=arrival_date))
        return trips.order_by('-depart_date')

def validate(date_text):
    try:
        if date_text != datetime.datetime.strptime(date_text, "%Y-%m-%d").strftime('%Y-%m-%d'):
            raise ValueError
        return True
    except ValueError:
        return False

class TripDetail(APIView):
    """
    Retrieve, update or delete a trip instance.
    """
    def get_object(self, pk):
        try:
            return Trip.objects.get(pk=pk)
        except Trip.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        trip = self.get_object(pk)
        serializer = TripSerializer(trip)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        trip = self.get_object(pk)
        dta = request.data
        depDate = dta["depart_date"]
        cbDate = dta["comeback_date"]
        depDate2 = dta["depart_date"]
        cbDate2 = dta["comeback_date"]
        if not validate(depDate):
            start_date = datetime.datetime.strptime(depDate, "%Y-%m-%dT%H:%M:%S.%fZ").date()
            depDate2 = start_date.strftime('%Y-%m-%d')
        if not validate(cbDate):
            end_date = datetime.datetime.strptime(cbDate, "%Y-%m-%dT%H:%M:%S.%fZ").date()
            cbDate2 = end_date.strftime('%Y-%m-%d')
        trip.depart_date = depDate2
        trip.comeback_date = cbDate2
        depart_location = City.objects.get(pk=dta["departure_location"])
        dest_location = City.objects.get(pk=dta["destination_location"])
        trip.departure_location = depart_location
        trip.destination_location = dest_location
        trip.trip_type = dta["trip_type"]
        trip.save()
        serializer = TripUpdateSerializer(trip)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk, format=None):
        trip = self.get_object(pk)
        booking_requests = BookingRequest.objects.filter(trip=trip)
        booking_requests = booking_requests.filter(Q(status__in=['boo', 'con', 'awa', 'col', 'del']) | Q(confirmed_by_sender=True))
        if booking_requests:
            return Response({'detail': 'You cannot delete a trip at this stage.'}, status=status.HTTP_204_NO_CONTENT)
        trip.delete()
        return Response({'detail': 'ok'}, status=status.HTTP_204_NO_CONTENT)

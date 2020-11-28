from django.shortcuts import render
from rest_framework import viewsets, permissions
from trip.models import Trip
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
from .models import BookingRequest, Product, ProductImage, Notif, PriceProposal
from .serializers import ProductSerializer, NotifListSerializer, PriceProposalListSerializer, NotifSerializer, BookingRequestSerializer, ProductImageSerializer
from userprofile.models import Location, UserProfile, Price, Weight, Space, City
from django.db.models import Q
from django.core.serializers import serialize
from utils.pagination import SearchResultsSetPagination
from django.http import Http404
import datetime
from django.contrib.auth.models import User
from django.db.models import Sum


# Create your views here.


class UserBookingsRequestListView(generics.ListAPIView):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    serializer_class = BookingRequestSerializer
    model = serializer_class.Meta.model
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id', None)
        queryset = self.model.objects.all()
        if user_id is not None:
            queryset = queryset.filter(request_by=user_id)
        return queryset.order_by('-made_on')


class UserNotifsListView(generics.ListAPIView):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    serializer_class = NotifListSerializer
    model = serializer_class.Meta.model
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id', None)
        queryset = self.model.objects.all()
        bookings_by_user = BookingRequest.objects.filter(request_by=user_id)
        trips_by_user = Trip.objects.filter(created_by=user_id)
        if user_id is not None:
            queryset = queryset.exclude(created_by=user_id)
            queryset = queryset.exclude(status="seen")
            queryset = queryset.filter(trip__in=trips_by_user, booking_request__in=bookings_by_user)
        return queryset.order_by('-created_on')


class SenderNotifsListView(generics.ListAPIView):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    serializer_class = NotifListSerializer
    model = serializer_class.Meta.model
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id', None)
        queryset = self.model.objects.filter(type='offer_rec')
        bookings_by_user = BookingRequest.objects.filter(request_by=user_id)
        trips_by_user = Trip.objects.filter(created_by=user_id)
        if user_id is not None:
            queryset = queryset.exclude(created_by=user_id)
            queryset = queryset.exclude(status="seen")
            queryset = queryset.filter(booking_request__in=bookings_by_user)
        return queryset.order_by('-created_on')


class CarrierNotifsListView(generics.ListAPIView):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    serializer_class = NotifListSerializer
    model = serializer_class.Meta.model
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id', None)
        queryset = self.model.objects.filter(Q(type='trip_booked') | Q(type='offer_conf'))
        bookings_by_user = BookingRequest.objects.filter(request_by=user_id)
        trips_by_user = Trip.objects.filter(created_by=user_id)
        if user_id is not None:
            queryset = queryset.exclude(created_by=user_id)
            queryset = queryset.exclude(status="seen")
            queryset = queryset.filter(trip__in=trips_by_user)
        return queryset.order_by('-created_on')


class NotifCreateView(CreateAPIView):
    serializer_class = NotifSerializer
    permission_classes = register_permission_classes()

    def dispatch(self, *args, **kwargs):
        return super(NotifCreateView, self).dispatch(*args, **kwargs)

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
        trip = request.data["trip"]
        booking_data = request.data["bookings"]
        type = request.data["type"]
        notif_status = request.data["status"]
        created_by = UserProfile.objects.get(user=request.data["created_by"])
        trip = Trip.objects.get(pk=trip)
        if isinstance(booking_data, list):
        # if type(booking_data) is list:
            for booking_id in booking_data:
                booking_request = BookingRequest.objects.get(pk=booking_id)
                notification = Notif.objects.create(trip=trip,
                booking_request=booking_request,
                created_by=created_by,
                price_proposal=None,
                type=type,
                status=notif_status)
        return Response(status=status.HTTP_204_NO_CONTENT)



class PriceProposalCreateView(CreateAPIView):
    serializer_class = PriceProposalListSerializer
    permission_classes = register_permission_classes()

    def dispatch(self, *args, **kwargs):
        return super(PriceProposalCreateView, self).dispatch(*args, **kwargs)

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
        booking_request = BookingRequest.objects.get(pk=request.data["booking_id"])
        request_by = UserProfile.objects.get(user=request.data["user_id"])
        trips = Trip.objects.filter(departure_location=booking_request.product.departure_location,
                                    destination_location=booking_request.product.destination_location,
                                    depart_date=booking_request.product.arrival_date)
        if request_by.pk == booking_request.product.created_by.pk:
            return Response({"info": "CANNOT_MAKE_OFFER_ON_YOUR_OWN_REQUEST"}, status=status.HTTP_200_OK)
        if not trips:
            return Response({"info": "NO_CORRESPONDING_TRIP"}, status=status.HTTP_200_OK)
        price = request.data["price"]
        price_proposal = PriceProposal.objects.create(booking_request=booking_request,
        request_by=request_by,
        price=price)
        notification = Notif.objects.create(trip=None,
        booking_request=booking_request,
        price_proposal=price_proposal,
        created_by=request_by,
        type='offer_rec',
        status='unseen')
        return Response(status=status.HTTP_204_NO_CONTENT)


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


class ProductImagesViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save()


class ProductsViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
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
        pictures = request.FILES.getlist('pictures')
        departure_location = City.objects.get(pk=request.data["departure_location"])
        destination_location = City.objects.get(pk=request.data["destination_location"])
        userprofile = UserProfile.objects.get(user=request.data["created_by"])
        price = request.data["product_value"]
        space = request.data["product_size"]
        weight = request.data["product_weight"]
        tripId = request.data["tripId"]
        depDate = request.data["delivery_date"]
        start_date = datetime.datetime.strptime(depDate, "%Y-%m-%dT%H:%M:%S.%fZ").date()
        depDate2 = start_date.strftime('%Y-%m-%d')
        product = Product.objects.create(arrival_date=depDate2,
        departure_location=departure_location,
        destination_location=destination_location,
        name=request.data["product_name"],
        description=request.data["product_description"],
        recipient_name=request.data["recipient_name"],
        recipient_phone_number=request.data["recipient_phone_number"],
        proposed_price=request.data["proposed_price"],
        price=price,
        space=space,
        weight=weight,
        product_category=request.data["product_category"],
        terms_conditions=request.data["terms_conditions"].capitalize(),
        user_agreement=request.data["user_agreement"].capitalize(),
        created_by=userprofile)
        trip = None
        booking_request = BookingRequest.objects.create(product=product, request_by=userprofile)
        if tripId != None and tripId != 'null':
            trip = Trip.objects.get(pk=tripId)
            booking_request.trip = trip
            booking_request.save()
            # Create notification
            notification = Notif.objects.create(trip=trip,
            booking_request=booking_request,
            created_by=userprofile,
            type="trip_booked",
            status="unseen")
        if len(pictures) > 0:
            for item in pictures:
                img = ProductImage(image=item, product=product)
                img.save()
        serializer = self.get_serializer(booking_request)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,
                        status=status.HTTP_201_CREATED,
                        headers=headers)


class BookingRequestDetail(APIView):
    """
    Retrieve, update or delete a booking_request instance.
    """
    def get_object(self, pk):
        try:
            return BookingRequest.objects.get(pk=pk)
        except BookingRequest.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        booking_request = self.get_object(pk)
        serializer = BookingRequestSerializer(booking_request)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        booking_request = self.get_object(pk)
        product = booking_request.product
        pictures = request.FILES.getlist('pictures')
        departure_location = City.objects.get(pk=request.data["departure_location"])
        destination_location = City.objects.get(pk=request.data["destination_location"])
        userprofile = UserProfile.objects.get(pk=request.data["created_by"])
        price = request.data["price"] if "price" in request.data else product.price
        space = request.data["space"] if "space" in request.data else product.space
        weight = request.data["weight"] if "weight" in request.data else product.weight
        category = request.data["product_category"] if "product_category" in request.data else product.product_category
        proposed_price = request.data["proposed_price"] if "proposed_price" in request.data else product.proposed_price
        depDate = request.data["arrival_date"]
        start_date = datetime.datetime.strptime(depDate, "%Y-%m-%dT%H:%M:%S.%fZ").date()
        depDate2 = start_date.strftime('%Y-%m-%d')

        product.arrival_date=depDate2
        product.departure_location=departure_location
        product.destination_location=destination_location
        product.name=request.data["name"]
        product.description=request.data["description"]
        product.recipient_name=request.data["recipient_name"]
        product.recipient_phone_number=request.data["recipient_phone_number"]
        product.proposed_price=proposed_price
        product.price=price
        product.space=space
        product.weight=weight
        product.product_category=category
        product.terms_conditions=request.data["terms_conditions"].capitalize()
        product.user_agreement=request.data["user_agreement"].capitalize()
        product.save()
        if len(pictures) > 0:
            for item in pictures:
                img = ProductImage(image=item, product=product)
                img.save()
        serializer = BookingRequestSerializer(booking_request)
        return Response(serializer.data,
                        status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        booking_request = self.get_object(pk)
        booking_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class NotifDetail(APIView):
    """
    Retrieve, update or delete a booking_request instance.
    """
    def get_object(self, pk):
        try:
            return Notif.objects.get(pk=pk)
        except Notif.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        notif = self.get_object(pk)
        serializer = NotifSerializer(notif)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        notif = self.get_object(pk)
        serializer = NotifSerializer(notif, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        notif = self.get_object(pk)
        notif.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BookingRequestSearchView(generics.ListAPIView):
    serializer_class = BookingRequestSerializer
    model = serializer_class.Meta.model
    pagination_class = SearchResultsSetPagination

    def get_queryset(self):
        product_category = self.request.query_params.getlist('product_category[]', [])
        product_size = self.request.query_params.getlist('product_size[]', [])
        proposed_price = self.request.query_params.getlist('proposed_price[]', [])
        weight = self.request.query_params.getlist('weight[]', [])
        user_id = self.request.query_params.get('user_id', '')
        departure_location = self.request.query_params.get('departure_location', '')
        destination_location = self.request.query_params.get('destination_location', '')
        arrDate = self.request.query_params.get('travel_date', '')
        products = Product.objects.all()
        if user_id != '':
            user_profile = User.objects.get(pk=int(user_id)).profile
            products = products.exclude(created_by=user_profile)
        start_date = None
        arrival_date = None
        if arrDate != "":
            start_date = datetime.datetime.strptime(arrDate, "%Y-%m-%dT%H:%M:%S.%fZ").date()
            arrival_date = start_date.strftime('%Y-%m-%d')
        if arrival_date:
            products = products.filter(arrival_date=arrival_date)
        if departure_location:
            # departure_location_obj = City.objects.filter(pk=departure_location)
            products = products.filter(departure_location__pk=departure_location)
        if destination_location:
            # destination_location_obj = City.objects.get(pk=destination_location)
            products = products.filter(destination_location__pk=destination_location)
        if len(weight) > 0:
            q_objects = Q()
            for item in weight:
                q_objects |= Q(weight=item)
            products = products.filter(q_objects)
        if len(product_category) > 0:
            q_objects = Q()
            for item in product_category:
                q_objects |= Q(product_category=item)
            products = products.filter(q_objects)
        if len(proposed_price) > 0:
            q_objects = Q()
            for item in proposed_price:
                q_objects |= Q(price=item)
            products = products.filter(q_objects)
        if len(product_size) > 0:
            q_objects = Q()
            for item in product_size:
                q_objects |= Q(space=item)
            products = products.filter(q_objects)
        queryset = self.model.objects.filter(product__in=products)
        return queryset.order_by('-product')


class BookingRequestsTotalPrice(APIView):
    """
    Retrieve, update or delete a booking_request instance.
    """

    def post(self, request, format=None):

        booking_requests = BookingRequest.objects.filter(pk__in=request.data['booking_ids'])
        booking_requests_price = booking_requests.aggregate(Sum('product__proposed_price'))
        result = {"total_price": booking_requests_price}
        return Response(result, status=status.HTTP_200_OK)

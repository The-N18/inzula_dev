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
from .models import BookingRequest, Product, ProductImage
from .serializers import ProductSerializer, BookingRequestSerializer, ProductImageSerializer
from userprofile.models import Location, UserProfile, Price, Weight, Space
from django.db.models import Q
from django.core.serializers import serialize
from utils.pagination import SearchResultsSetPagination
from django.http import Http404
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
        depart_location = Location.objects.create(city=request.data["product_location"])
        pickup_address = Location.objects.create(city=request.data["pickup_address"])
        userprofile = UserProfile.objects.get(user=request.data["created_by"])
        price = request.data["product_value"]
        space = request.data["product_size"]
        weight = request.data["product_weight"]
        tripId = request.data["tripId"]
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
        terms_conditions=request.data["terms_conditions"].capitalize(),
        user_agreement=request.data["user_agreement"].capitalize(),
        created_by=userprofile)
        trip = None
        if tripId != None and tripId != 'null':
            trip = Trip.objects.get(pk=tripId)
        booking_request = BookingRequest.objects.create(product=product, request_by=userprofile, trip=trip)
        if len(pictures) > 0:
            for item in pictures:
                img = ProductImage(image=item, product=product)
                img.save()
        serializer = self.get_serializer(booking_request)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,
                        status=status.HTTP_201_CREATED,
                        headers=headers)


# class DelBookingRequestView(CreateAPIView):
#     permission_classes = register_permission_classes()
#
#     def dispatch(self, *args, **kwargs):
#         return super(DelBookingRequestView, self).dispatch(*args, **kwargs)
#
#     def get_response_data(self, user):
#         if getattr(settings, 'REST_USE_JWT', False):
#             data = {
#                 'user': user,
#                 'token': self.token
#             }
#             return JWTSerializer(data).data
#         else:
#             return TokenSerializer(user.auth_token).data
#
#     def create(self, request, *args, **kwargs):
#         booking_id = request.data["booking_id"]
#         BookingRequest.objects.get(pk=booking_id).delete()
#         return Response(status=status.HTTP_200_OK)


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
        serializer = BookingRequestSerializer(booking_request, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        booking_request = self.get_object(pk)
        booking_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BookingRequestSearchView(generics.ListAPIView):
    serializer_class = BookingRequestSerializer
    model = serializer_class.Meta.model
    pagination_class = SearchResultsSetPagination

    def get_queryset(self):
        departure_location = self.request.query_params.get('departure_location', '')
        product_category = self.request.query_params.getlist('product_category[]', [])
        product_size = self.request.query_params.getlist('product_size[]', [])
        proposed_price = self.request.query_params.getlist('proposed_price[]', [])
        weight = self.request.query_params.getlist('weight[]', [])
        departure_locations = Location.objects.filter(city__startswith=departure_location)
        destination_location = self.request.query_params.get('destination_location', '')
        destination_locations = Location.objects.filter(city__startswith=destination_location)
        arrival_date = self.request.query_params.get('delivery_date', '')
        products = Product.objects.all()
        if departure_location:
            products = products.filter(departure_location__city__contains=departure_location)
        if destination_location:
            products = products.filter(pickup_location__city__contains=destination_location)
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

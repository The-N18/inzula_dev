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
from rest_framework.pagination import PageNumberPagination
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
        print("request.FILES")
        print("-------------------")
        print(request.FILES)
        print("-------------------")
        # print(request.POST.get('pictures', None))
        # print(request.POST['pictures'])
        # pictures=request.POST["pictures"]
        pictures = request.FILES.getlist('pictures')
        print("-------------------0")
        depart_location = Location.objects.create(city=request.data["product_location"])
        pickup_address = Location.objects.create(city=request.data["pickup_address"])
        userprofile = UserProfile.objects.get(user=request.data["created_by"])
        price = Price.objects.create(amount=request.data["product_value"])
        print("-------------------1")
        space = request.data["product_size"]
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
        terms_conditions=request.data["terms_conditions"].capitalize(),
        user_agreement=request.data["user_agreement"].capitalize(),
        created_by=userprofile)
        print("-------------------2")
        booking_request = BookingRequest.objects.create(product=product, request_by=userprofile)
        print("pictures")
        print(pictures)
        print("-------------------3")
        if len(pictures) > 0:
            for item in pictures:
                print(item)
                print("++++++++++++++")
                img = ProductImage(image=item, product=product)
                img.save()
                # product_images = ProductImage.objects.create(product=product, image=item)
        print("-------------------4")
        serializer = self.get_serializer(booking_request)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,
                        status=status.HTTP_201_CREATED,
                        headers=headers)


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 2



class BookingRequestListView(generics.ListAPIView):
    serializer_class = BookingRequestSerializer
    model = serializer_class.Meta.model
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
        departure_location = self.request.query_params.get('departure_location', '')
        departure_locations = Location.objects.filter(city__startswith=departure_location)
        destination_location = self.request.query_params.get('destination_location', '')
        destination_locations = Location.objects.filter(city__startswith=destination_location)
        arrival_date = self.request.query_params.get('delivery_date', '')
        products = Product.objects.filter(departure_location__city__contains=departure_location, pickup_location__city__contains=destination_location)
        queryset = self.model.objects.filter(product__in=products)
        return queryset.order_by('-product')

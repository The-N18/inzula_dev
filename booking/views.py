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
from .models import BookingRequest, Codes, Product, ProductImage, Notif, PriceProposal
from .serializers import ProductSerializer, CodeListSerializer, NotifListSerializer, PriceProposalListSerializer, NotifSerializer, BookingRequestSerializer, ProductImageSerializer
from userprofile.models import UserProfile, City
from django.db.models import Q
from django.core.serializers import serialize
from utils.pagination import SearchResultsSetPagination
from django.http import Http404
import datetime
from django.contrib.auth.models import User
from django.db.models import Sum
from django.utils import timezone
import os
import logging
from django.conf import settings
from django.http import HttpResponse
from django.utils.crypto import get_random_string
from pay_process.views import deliverPaymentToCarrier, refund_charges
import string
from django.db import transaction


# Create your views here.
debug_index_file_path = os.path.join(settings.BASE_DIR, 'public/index.html')
prod_index_file_path = os.path.join(settings.BASE_DIR, 'build/index.html')
index_file_path = debug_index_file_path if settings.MANUAL_DEBUG == True else prod_index_file_path

def index(request):
    try:
        with open(index_file_path) as f:
            return HttpResponse(f.read())
            # return render(request, 'index.html')
    except FileNotFoundError:
        logging.exception('Production build of app not found')
        return HttpResponse("Hello, world. You're at the polls index.")

def indexr(request, uidb64, token):
    try:
        with open(index_file_path) as f:
            return HttpResponse(f.read())
            # return render(request, 'index.html')
    except FileNotFoundError:
        logging.exception('Production build of app not found')
        return HttpResponse("Hello, world. You're at the polls index.")

def indexk(request, key):
    try:
        with open(index_file_path) as f:
            return HttpResponse(f.read())
            # return render(request, 'index.html')
    except FileNotFoundError:
        logging.exception('Production build of app not found')
        return HttpResponse("Hello, world. You're at the polls index.")


# def react(request):
#     try:
#         with open(index_file_path) as f:
#             # return HttpResponse(f.read())
#             return render(request, 'index.html')
#     except FileNotFoundError:
#         logging.exception('Production build of app not found')

def calculate_min_price(weight, size, category, value):
    size_coefficients = {
    's': 1,
    'm': 2,
    'l': 5,
    'xl': 10,
    }
    weight_coefficients = {
        '500g': 0.5,
        '1kg': 1,
        '5kg': 5,
        '10kg': 10,
        '20kg': 20,
        '30kg': 30,
      }
    value_coefficients = {
        'low': 0.1,
        'mid': 0.3,
        'high': 0.5,
        'lux': 0.7,
        'exc': 1,
      }
    category_coefficients = {
        'food': 0.7,
        'elec': 0.3,
        'dress': 0.5,
        'shoe': 0.3,
        'doc': 0.2,
        'uts': 0.4,
        'app': 0.4,
        'skin': 0.3,
        'jel': 1,
        'misc': 0.4
      }
    min_price = 0
    w = weight_coefficients[weight] if weight else 0
    s = size_coefficients[size] if size else  0
    v = value_coefficients[value] if value else  0
    c = category_coefficients[category] if category else  0
    min_price = w*(10*((0.95*s) + (0.05*v)))
    min_price = round(min_price, 1)
    return min_price


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


class SelectableUserBookingsRequestListView(generics.ListAPIView):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    serializer_class = BookingRequestSerializer
    model = serializer_class.Meta.model
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        products = Product.objects.all()
        user_id = self.request.query_params.get('user_id', None)
        trip_id = self.request.query_params.get('trip_id', None)
        if trip_id is not None:
            trip = Trip.objects.get(pk=trip_id)
            date_range_start = trip.depart_date - datetime.timedelta(days=14)
            date_range_end = trip.depart_date + datetime.timedelta(days=14)
            products = products.filter(arrival_date__range=[date_range_start, date_range_end], departure_location=trip.departure_location, destination_location=trip.destination_location)
        queryset = self.model.objects.filter(confirmed_by_sender=False, product__in=products)
        if user_id is not None:
            queryset = queryset.filter(Q(request_by=user_id) & ~Q(status="awa") & ~Q(status="boo"))
        return queryset.order_by('-made_on')


class UserBookedListRequestListView(generics.ListAPIView):
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
        trips = Trip.objects.filter(created_by=user_id)
        if user_id is not None:
            queryset = queryset.filter(trip__in=trips)
            queryset = queryset.filter(Q(status="boo") | Q(status="awa") | Q(status="del"))
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
        queryset = self.model.objects.all()
        bookings_by_user = BookingRequest.objects.filter(request_by=user_id)
        # trips_by_user = Trip.objects.filter(created_by=user_id)
        if user_id is not None:
            # queryset = queryset.exclude(Q(created_by=user_id) & Q(type="payment_for_booking"))
            queryset = queryset.exclude(Q(created_by=user_id) & Q(type="payment_for_delivery"))
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
        queryset = self.model.objects.all()
        # bookings_by_user = BookingRequest.objects.filter(request_by=user_id)
        trips_by_user = Trip.objects.filter(created_by=user_id)
        if user_id is not None:
            queryset = queryset.exclude(created_by=user_id)
            queryset = queryset.exclude(status="seen")
            queryset = queryset.exclude(Q(type="product_delivered"))
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
        with transaction.atomic():
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
        with transaction.atomic():
            booking_request = BookingRequest.objects.get(pk=request.data["booking_id"])
            request_by = UserProfile.objects.get(user=request.data["user_id"])
            date_range_start = booking_request.product.arrival_date - datetime.timedelta(days=14)
            date_range_end = booking_request.product.arrival_date + datetime.timedelta(days=14)
            trips = Trip.objects.filter(departure_location=booking_request.product.departure_location,
                                        destination_location=booking_request.product.destination_location,
                                        depart_date__range=[date_range_start, date_range_end])
            if request_by.pk == booking_request.product.created_by.pk:
                return Response({"info": "CANNOT_MAKE_OFFER_ON_YOUR_OWN_REQUEST"}, status=status.HTTP_200_OK)
            if booking_request.status == "boo":
                return Response({"info": "CANNOT_MAKE_OFFER_ON_BOOKED_REQUEST"}, status=status.HTTP_200_OK)
            if booking_request.status == "awa":
                return Response({"info": "CANNOT_MAKE_OFFER_ON_VALIDATED_REQUEST"}, status=status.HTTP_200_OK)
            if booking_request.status == "del":
                return Response({"info": "CANNOT_MAKE_OFFER_ON_DELIVERED_REQUEST"}, status=status.HTTP_200_OK)
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


class SubmitDeliveryCode(CreateAPIView):
    serializer_class = CodeListSerializer
    permission_classes = register_permission_classes()

    def dispatch(self, *args, **kwargs):
        return super(SubmitDeliveryCode, self).dispatch(*args, **kwargs)

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
        with transaction.atomic():
            code = request.data["code"]
            user_id = request.data["user_id"]
            result = {"info": ""}
            if Codes.objects.filter(code=code).exists():
                code_obj = Codes.objects.get(code=code)
                if code_obj.validation_attempts >= settings.MAX_VALIDATION_ATTEMPTS:
                    result["info"] = "MAX_VALIDATION_ATTEMPTS_REACHED"
                    return Response(result, status=status.HTTP_200_OK)
                else:
                    if code_obj.status == "obsolete":
                        code_obj.validation_attempts = code_obj.validation_attempts + 1
                        code_obj.save()
                        result["info"] = "CODE_IS_OBSOLETE"
                        return Response(result, status=status.HTTP_200_OK)
                    if code_obj.status == "validated_by_carrier":
                        code_obj.validation_attempts = code_obj.validation_attempts + 1
                        code_obj.save()
                        result["info"] = "CODE_ALREADY_VALIDATED"
                        return Response(result, status=status.HTTP_200_OK)
                    if code_obj.status == "sent_to_sender":
                        code_obj.validation_attempts = code_obj.validation_attempts + 1
                        code_obj.validated_on = timezone.now()
                        code_obj.status = "validated_by_carrier"
                        code_obj.save()
                        result["info"] = "CODE_VALIDATED_SUCCESSFULLY"
                        # deliver payment
                        deliverPaymentToCarrier(code_obj.booking.pk)
                        # create notification
                        created_by = UserProfile.objects.get(user=user_id)
                        Notif.objects.create(trip=code_obj.trip,
                                            booking_request=code_obj.booking,
                                            created_by=created_by,
                                            price_proposal=None,
                                            type="delivered",
                                            status="unseen")
                        # Pay the carrier
                        ## @TODO Complete pay carrier method
                        return Response(result, status=status.HTTP_200_OK)
            else:
                result["info"] = "INVALID_CODE"
                return Response(result, status=status.HTTP_200_OK)
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
        with transaction.atomic():
            pictures = request.FILES.getlist('pictures')
            data = request.data
            departure_location = City.objects.get(pk=data["departure_location"])
            destination_location = City.objects.get(pk=data["destination_location"])
            userprofile = UserProfile.objects.get(user=data["created_by"])
            price = data["product_value"]
            space = data["product_size"]
            weight = data["product_weight"]
            tripId = data["tripId"]
            depDate = data["delivery_date"]
            category = data["product_category"]
            proposed_price = data["proposed_price"]
            start_date = datetime.datetime.strptime(depDate, "%Y-%m-%dT%H:%M:%S.%fZ").date()
            depDate2 = start_date.strftime('%Y-%m-%d')
            min_price = calculate_min_price(weight, space, category, price)
            if float(proposed_price) < min_price:
                return Response({"detail": "Sorry, the price must be at least {}".format(min_price)},
                                status=status.HTTP_400_BAD_REQUEST,
                                headers=headers)
            product = Product.objects.create(arrival_date=depDate2,
            departure_location=departure_location,
            destination_location=destination_location,
            name=data["product_name"],
            description=data["product_description"],
            recipient_name=data["recipient_name"],
            recipient_phone_number=data["recipient_phone_number"],
            proposed_price=proposed_price,
            price=price,
            space=space,
            weight=weight,
            product_category=category,
            terms_conditions=data["terms_conditions"].capitalize(),
            user_agreement=data["user_agreement"].capitalize(),
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
        with transaction.atomic():
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

    def delete(self, request, pk, format=None):
        booking_request = self.get_object(pk)
        if booking_request.confirmed_by_sender or booking_request.status in ['boo', 'con', 'awa', 'col', 'del']:
            return Response({'detail': 'You cannot delete a booking at this stage.'}, status=status.HTTP_200_OK)
        booking_request.delete()
        return Response({'detail': 'ok'}, status=status.HTTP_200_OK)


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
        if arrDate != "":
            start_date = datetime.datetime.strptime(arrDate, "%Y-%m-%dT%H:%M:%S.%fZ").date()
            date_range_start = start_date - datetime.timedelta(days=14)
            date_range_end = start_date + datetime.timedelta(days=14)
            products = products.filter(arrival_date__range=[date_range_start, date_range_end])
        if departure_location:
            products = products.filter(departure_location__pk=departure_location)
        if destination_location:
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


def generateRandomCode(trip_id, booking_id):
    trip = Trip.objects.get(pk=trip_id)
    booking = BookingRequest.objects.get(pk=booking_id)
    code = get_random_string(5, allowed_chars=string.ascii_uppercase + string.digits)
    if Codes.objects.filter(code=code).exists():
        generateRandomCode(trip_id, booking_id)
    else:
        Codes.objects.create(trip=trip, booking=booking, status="sent_to_sender", code=code, created_on=timezone.now())


def renderCodeObsolete(trip, booking_id):
    trip_ = None
    if trip is not None:
        trip_ = Trip.objects.get(pk=trip.pk)
    booking = BookingRequest.objects.get(pk=booking_id)
    if Codes.objects.filter(Q(trip=trip_) & Q(booking=booking) & ~Q(status="obsolete")):
        for item in Codes.objects.filter(Q(trip=trip_) & Q(booking=booking) & ~Q(status="obsolete")):
            item.status = "obsolete"
            item.save()
    # refund charges
    refund_charges(booking)

class ValidateBooking(APIView):
    """
    Validate a booking
    """

    def post(self, request, format=None):
        with transaction.atomic():
            booking_request = BookingRequest.objects.get(pk=request.data['bookingId'])
            booking_request.confirmed_by_sender = True
            booking_request.status = 'awa'
            booking_request.save()
            # create notification
            Notif.objects.create(trip=booking_request.trip,
            booking_request=booking_request,
            created_by=booking_request.trip.created_by,
            price_proposal=None,
            type='request_validated',
            created_on=timezone.now(),
            status='unseen')
            generateRandomCode(booking_request.trip.pk, booking_request.pk)
            result = {"detail": 'ok'}
            return Response(result, status=status.HTTP_200_OK)

class DeclineBooking(APIView):
    """
    Decline a booking
    """

    def post(self, request, format=None):
        with transaction.atomic():
            booking_request = BookingRequest.objects.get(pk=request.data['bookingId'])
            booking_request.confirmed_by_sender = False
            booking_request.status = 'cre'
            # create notification
            Notif.objects.create(trip=booking_request.trip,
            booking_request=booking_request,
            created_by=booking_request.trip.created_by,
            price_proposal=None,
            type='request_declined',
            created_on=timezone.now(),
            status='unseen')
            renderCodeObsolete(booking_request.trip, booking_request.pk)
            result = {"detail": 'ok'}
            booking_request.trip = None
            booking_request.save()
            return Response(result, status=status.HTTP_200_OK)


class CancelBooking(APIView):
    """
    Cancel a booking
    """

    def post(self, request, format=None):
        with transaction.atomic():
            booking_request = BookingRequest.objects.get(pk=request.data['bookingId'])
            result = {"detail": 'ok'}
            if booking_request.status == "del":
                result["detail"] = "BOOKING_ALREADY_DELIVERED"
                return Response(result, status=status.HTTP_200_OK)
            today = datetime.datetime.now().date()
            booking_date = booking_request.product.arrival_date
            delta = booking_date - today
            if delta.days <= 1:
                result["detail"] = "TOO_LATE_TO_CANCEL"
                return Response(result, status=status.HTTP_200_OK)
            booking_request.confirmed_by_sender = False
            booking_request.status = 'cre'
            # create notification
            Notif.objects.create(trip=booking_request.trip,
            booking_request=booking_request,
            created_by=booking_request.request_by,
            price_proposal=None,
            type='request_cancelled',
            created_on=timezone.now(),
            status='unseen')
            renderCodeObsolete(booking_request.trip, booking_request.pk)
            booking_request.trip = None
            booking_request.save()
            return Response(result, status=status.HTTP_200_OK)
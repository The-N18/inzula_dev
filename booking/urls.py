from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookingRequestView, UserBookingsRequestListView, ProductsViewSet, ProductImagesViewSet, BookingRequestViewSet, BookingRequestListView

router = DefaultRouter()
router.register(r'bookings', BookingRequestViewSet)
router.register(r'products', ProductsViewSet)
router.register(r'productimages', ProductImagesViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('add_request', BookingRequestView.as_view()),
    path('search_bookings', BookingRequestListView.as_view()),
    path('bookings_list', UserBookingsRequestListView.as_view()),
]

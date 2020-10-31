from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookingRequestView, BookingRequestViewSet, BookingRequestListView

router = DefaultRouter()
router.register(r'', BookingRequestViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('add_request', BookingRequestView.as_view()),
    path('search_bookings', BookingRequestListView.as_view()),
]

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import trip_search, TripView, TripDetail, TripsListView, TripSearchView, AddBookingsToTripView, CarrierProposalTripListView

# Create a router and register our viewsets with it.
# router = DefaultRouter()
# router.register(r'', TripViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    # path('', include(router.urls)),
    path('trip_search/', trip_search),
    path('add_trip', TripView.as_view()),
    path('add_bookings', AddBookingsToTripView.as_view()),
    path('trip/<int:pk>/', TripDetail.as_view()),
    path('trips_list', TripsListView.as_view()),
    path('proposal_trips_list', CarrierProposalTripListView.as_view()),
    path('search_trips', TripSearchView.as_view()),
]

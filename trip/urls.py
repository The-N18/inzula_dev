from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import trip_search, TripView, TripsListView

# Create a router and register our viewsets with it.
# router = DefaultRouter()
# router.register(r'', TripViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    # path('', include(router.urls)),
    path('trip_search/', trip_search),
    path('add_trip', TripView.as_view()),
    path('trips_list', TripsListView.as_view()),
]

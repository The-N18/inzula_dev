from django.db import models
from userprofile.models import Location, UserProfile, Space, Weight, Price
from trip.models import Trip

# Create your models here.

class Booking(models.Model):
    departure_date = models.DateTimeField()
    arrival_date = models.DateTimeField()
    departure_location = models.ForeignKey(Location, on_delete=models.PROTECT, related_name='+')
    destination_location = models.ForeignKey(Location, on_delete=models.PROTECT, related_name='+')
    space_booked = models.ForeignKey(Space, on_delete=models.PROTECT, related_name='+')
    weight_booked = models.ForeignKey(Weight, on_delete=models.PROTECT, related_name='+')
    price = models.ForeignKey(Price, on_delete=models.PROTECT, related_name='+')
    is_request = models.BooleanField(default=False)
    trip = models.ForeignKey(Trip, on_delete=models.PROTECT, related_name='+')
    created_by = models.ForeignKey(UserProfile, on_delete=models.PROTECT, related_name='+')
    creation_date = models.DateTimeField()


class BookingRequest(models.Model):
    request_by = models.ForeignKey(UserProfile, on_delete=models.PROTECT, related_name='+')
    trip = models.ForeignKey(Trip, on_delete=models.PROTECT, related_name='+')
    booking = models.ForeignKey(Booking, on_delete=models.PROTECT, related_name='+')
    confirmed_by_sender = models.BooleanField(default=False)
    made_on = models.DateTimeField()
    collector_id = models.FileField(upload_to='uploads/')

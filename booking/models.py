from django.db import models
from userprofile.models import Location, UserProfile, Space, Weight, Price
from trip.models import Trip

# Create your models here.

class Booking(models.Model):
    departure_date = models.DateTimeField()
    arrival_date = models.DateTimeField()
    departure_location = models.ForeignKey(Location, on_delete=models.CASCADE)
    destination_location = models.ForeignKey(Location, on_delete=models.CASCADE)
    space_booked = models.ForeignKey(Space, on_delete=models.CASCADE)
    weight_booked = models.ForeignKey(Weight, on_delete=models.CASCADE)
    price = models.ForeignKey(Price, on_delete=models.CASCADE)
    is_request = models.BooleanField(default=False)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    created_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    creation_date = models.DateTimeField()


class BookingRequest(models.Model):
    request_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    confirmed_by_sender = models.BooleanField(default=False)
    made_on = models.DateTimeField()
    collector_id = models.FileField(upload_to='uploads/')

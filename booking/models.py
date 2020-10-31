from django.db import models
from userprofile.models import Location, UserProfile, Space, Weight, Price
from trip.models import Trip

# Create your models here.

class Product(models.Model):
    departure_date = models.DateField(null=True, blank=True)
    arrival_date = models.DateField()
    departure_location = models.ForeignKey(Location, on_delete=models.PROTECT, related_name='+')
    pickup_location = models.ForeignKey(Location, on_delete=models.PROTECT, related_name='+')
    destination_location = models.ForeignKey(Location, on_delete=models.PROTECT, related_name='+', null=True, blank=True)
    space = models.ForeignKey(Space, on_delete=models.PROTECT, related_name='+')
    weight = models.ForeignKey(Weight, on_delete=models.PROTECT, related_name='+')
    price = models.ForeignKey(Price, on_delete=models.PROTECT, related_name='+')
    created_by = models.ForeignKey(UserProfile, on_delete=models.PROTECT, related_name='+')
    creation_date = models.DateField(null=True, blank=True)
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=250)
    recipient_name = models.CharField(max_length=250)
    recipient_phone_number = models.CharField(max_length=250)
    product_category = models.CharField(max_length=250)
    proposed_price = models.CharField(max_length=250)
    terms_conditions = models.BooleanField(default=False)
    user_agreement = models.BooleanField(default=False)


class ProductImage(models.Model):
    product = models.ForeignKey(Product, default=None, on_delete=models.CASCADE)
    images = models.FileField(upload_to = 'uploads/')

    def __str__(self):
        return self.product.name


class BookingRequest(models.Model):
    request_by = models.ForeignKey(UserProfile, on_delete=models.PROTECT, related_name='+')
    trip = models.ForeignKey(Trip, on_delete=models.PROTECT, related_name='+', null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='+')
    confirmed_by_sender = models.BooleanField(default=False)
    made_on = models.DateField(null=True, blank=True)
    collector_id = models.FileField(upload_to='uploads/', null=True, blank=True)

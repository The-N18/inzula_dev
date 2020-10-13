from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Price(models.Model):
    amount = models.IntegerField(default=0)
    currency = models.CharField(max_length=50)

class ParcelType(models.Model):
    type = models.CharField(max_length=50)

class Space(models.Model):
    volume = models.IntegerField(default=0)
    units = models.CharField(max_length=50)

class Location(models.Model):
    latitude = models.IntegerField(default=0)
    longitude = models.IntegerField(default=0)
    long_address = models.CharField(max_length=250)
    city = models.CharField(max_length=250)
    country = models.CharField(max_length=250)

class Weight(models.Model):
    weight = models.IntegerField(default=0)
    units = models.CharField(max_length=50)

class UserSettings(models.Model):
    keep_me_logged_in = models.BooleanField(default=True)
    can_take_parcel = models.BooleanField(default=True)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    settings = models.ForeignKey(UserSettings, on_delete=models.CASCADE)
    phone_number = models.IntegerField(default=0)
    pay_mode = models.CharField(max_length=50)
    user_type = models.CharField(max_length=50)
    id_document = models.FileField(upload_to='uploads/')

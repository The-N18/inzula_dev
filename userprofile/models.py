from django.db import models
from django.contrib.auth.models import User

# Create your models here.

USER_TYPE_OPTIONS = [
    ('Sender', 'Sender'),
    ('Carrier', 'Carrier')
]

class Price(models.Model):
    amount = models.CharField(max_length=50)
    currency = models.CharField(max_length=50)

class ParcelType(models.Model):
    type = models.CharField(max_length=50)

class Space(models.Model):
    volume = models.IntegerField(default=0)
    units = models.CharField(max_length=50, default="m3")

    def __str__(self):
        return "{0} - {1}".format(self.volume, self.units)

class Location(models.Model):
    latitude = models.IntegerField(default=0)
    longitude = models.IntegerField(default=0)
    long_address = models.CharField(max_length=250, null=True, blank=True)
    city = models.CharField(max_length=250)
    country = models.CharField(max_length=250, null=True, blank=True)

    def __str__(self):
        return self.city

class Weight(models.Model):
    weight = models.IntegerField(default=0)
    units = models.CharField(max_length=50, default="kg")

    def __str__(self):
        return "{0} - {1}".format(self.weight, self.units)

class UserSettings(models.Model):
    keep_me_logged_in = models.BooleanField(default=True)
    can_take_parcel = models.BooleanField(default=True)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.PROTECT, primary_key=True, related_name='profile')
    settings = models.ForeignKey(UserSettings, on_delete=models.PROTECT, related_name='+', null=True, blank=True)
    phone_number = models.IntegerField(default=0, null=True, blank=True)
    pay_mode = models.CharField(max_length=50, null=True, blank=True)
    user_type = models.CharField(max_length=50, choices=USER_TYPE_OPTIONS, null=True, blank=True)
    id_document = models.FileField(upload_to='uploads/id_documents/', null=True, blank=True)
    profile_pic = models.ImageField(upload_to='uploads/profile_images/', blank=True, null=True)
    terms_conditions = models.BooleanField(default=False)

    def __str__(self):
        return "{0}: {1} - {2}".format(self.user.username, self.user.first_name, self.user.last_name)

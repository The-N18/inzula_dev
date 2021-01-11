from django.db import models
from django.contrib.auth.models import User

# Create your models here.

USER_TYPE_OPTIONS = [
    ('sender', 'Sender'),
    ('carrier', 'Carrier')
]

SEX_OPTIONS = [
    ('m', 'Male'),
    ('f', 'Female')
]

class City(models.Model):
    value = models.CharField(max_length=50)
    label = models.CharField(max_length=150)

    def __str__(self):
        return '{}'.format(self.label)

class Price(models.Model):
    amount = models.CharField(max_length=50)
    currency = models.CharField(max_length=50)

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
    phone_number = models.CharField(max_length=250, null=True, blank=True, default=000000)
    pay_mode = models.CharField(max_length=50, null=True, blank=True)
    passport_number = models.CharField(max_length=50, null=True, blank=True, default="000000")
    country = models.CharField(max_length=50, null=True, blank=True, default="FR")
    user_type = models.CharField(max_length=100, choices=USER_TYPE_OPTIONS, null=True, blank=True)
    sex = models.CharField(max_length=100, choices=SEX_OPTIONS, null=True, blank=True)
    id_document = models.FileField(upload_to='uploads/id_documents/', null=True, blank=True)
    profile_pic = models.ImageField(upload_to='uploads/profile_images/', blank=True, null=True, default='default.jpg')
    terms_conditions = models.BooleanField(default=False)
    nat_user_id = models.CharField(max_length=50, null=True, blank=True, default=None)
    wallet_id = models.CharField(max_length=50, null=True, blank=True, default=None)

    def __str__(self):
        return "{0}: {1} - {2}".format(self.user.username, self.user.first_name, self.user.last_name)

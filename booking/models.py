from django.db import models
from userprofile.models import Location, UserProfile, Space, Weight, Price, City
from trip.models import Trip

# Create your models here.

PRODUCT_SIZE_OPTIONS = [
    ('s', 'Small'),
    ('m', 'Medium'),
    ('l', 'Large'),
    ('xl', 'Extra Large'),
]

PRODUCT_CATEGORY_OPTIONS = [
    ('food', 'Food'),
    ('elec', 'Electronics'),
    ('dress', 'Dresses'),
    ('shoe', 'Shoes'),
    ('doc', 'Documents'),
    ('uts', 'Kitchen utensils'),
    ('app', 'Electrical appliances'),
    ('skin', 'Skin care'),
    ('jel', 'Jewelry'),
    ('misc', 'Miscellaneous')
]

PRODUCT_WEIGHT_OPTIONS = [
    ('500g', '0.1 - 500g'),
    ('1kg', '500g - 1kg'),
    ('5kg', '1.1kg - 5kg'),
    ('10kg', '5.1kg - 10kg'),
    ('20kg', '10.1kg - 20kg'),
    ('30kg', '20.1kg - 30kg'),
]

PRODUCT_VALUE_OPTIONS = [
    ('low', 'Low value'),
    ('mid', 'Medium value'),
    ('high', 'High value'),
    ('lux', 'Luxury items'),
    ('exc', 'Exclusive'),
]

REQUEST_STATUS = [
    ('cre', 'Created'),
    ('rec', 'Offers recieved'),
    ('boo', 'Booked'),
    ('con', 'Offer confirmed'),
    ('awa', 'Awaiting collection'),
    ('col', 'Collected'),
    ('del', 'Delivered'),
]

ALERT_STATUS = [
    ('unseen', 'Unseen'),
    ('seen', 'Seen'),
]

ALERT_TYPE = [
    ('offer_rec', 'Offer recieved'),
    ('trip_booked', 'Trip Booked'),
    ('offer_conf', 'Offer confirmed'),
    ('request_validated', 'Booking request validated'),
    ('request_declined', 'Booking request declined'),
    ('payment_for_booking', 'You have paid for your booking'),
]

class Product(models.Model):
    departure_date = models.DateField(null=True, blank=True)
    arrival_date = models.DateField()
    departure_location = models.ForeignKey(City, on_delete=models.PROTECT, related_name='+')
    destination_location = models.ForeignKey(City, on_delete=models.PROTECT, related_name='+', null=True, blank=True)
    weight = models.CharField(max_length=50, choices=PRODUCT_WEIGHT_OPTIONS)
    space = models.CharField(max_length=50, choices=PRODUCT_SIZE_OPTIONS)
    price = models.CharField(max_length=50, choices=PRODUCT_VALUE_OPTIONS)
    product_category = models.CharField(max_length=50, choices=PRODUCT_CATEGORY_OPTIONS)
    created_by = models.ForeignKey(UserProfile, on_delete=models.PROTECT, related_name='+')
    creation_date = models.DateField(null=True, blank=True)
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=250)
    recipient_name = models.CharField(max_length=250)
    recipient_phone_number = models.CharField(max_length=250)
    proposed_price = models.CharField(max_length=250)
    terms_conditions = models.BooleanField(default=False)
    user_agreement = models.BooleanField(default=False)


class ProductImage(models.Model):
    product = models.ForeignKey(Product, default=None, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='uploads/', blank=True, null=True)

    def __str__(self):
        return self.product.name


class BookingRequest(models.Model):
    request_by = models.ForeignKey(UserProfile, on_delete=models.PROTECT, related_name='+')
    trip = models.ForeignKey(Trip, on_delete=models.PROTECT, related_name='+', null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='+')
    confirmed_by_sender = models.BooleanField(default=False)
    made_on = models.DateField(null=True, blank=True)
    collector_id = models.FileField(upload_to='uploads/', null=True, blank=True)
    status = models.CharField(max_length=50, choices=REQUEST_STATUS)


class PriceProposal(models.Model):
    price = models.CharField(max_length=50, null=False, blank=False)
    request_by = models.ForeignKey(UserProfile, on_delete=models.PROTECT, related_name='+')
    booking_request = models.ForeignKey(BookingRequest, on_delete=models.CASCADE, related_name='+')
    def __str__(self):
        return self.price


class Notif(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='+', null=True, blank=True)
    booking_request = models.ForeignKey(BookingRequest, on_delete=models.CASCADE, related_name='+', null=True, blank=True)
    price_proposal = models.ForeignKey(PriceProposal, on_delete=models.CASCADE, related_name='+', null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    created_by = models.ForeignKey(UserProfile, on_delete=models.PROTECT, related_name='+')
    status = models.CharField(max_length=50, choices=ALERT_STATUS)
    type = models.CharField(max_length=50, choices=ALERT_TYPE)

import os
from twilio.rest import Client
from django.db import models
from userprofile.models import UserProfile, City
from trip.models import Trip
from django.db.models.signals import post_save
from django.core.mail import send_mail
from django.conf import settings
from datetime import datetime

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

CODE_STATUS = [
    ('sent_to_sender', 'Sent to sender'),
    ('validated_by_carrier', 'Validated by carrier'),
    ('obsolete', 'Obsolete'),
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
    ('request_cancelled', 'Booking request cancelled'),
    ('payment_for_booking', 'You have paid for your booking'),
    ('delivered', 'Product delivered'),
]

def send_sms(msg, dest):
    account_sid = settings.TWILIO_ACCOUNT_SID
    auth_token = settings.TWILIO_AUTH_TOKEN
    client = Client(account_sid, auth_token)
    message = client.messages.create(
                        body=msg,
                        from_=settings.PHONE_NUMBER,
                        to=dest
                    )
    return message.sid

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

    def __str__(self):
        return '{}: {} - {}'.format(self.name, self.departure_location, self.destination_location)


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

    def __str__(self):
        return '{}'.format(self.product)


class PriceProposal(models.Model):
    price = models.CharField(max_length=50, null=False, blank=False)
    request_by = models.ForeignKey(UserProfile, on_delete=models.PROTECT, related_name='+')
    booking_request = models.ForeignKey(BookingRequest, on_delete=models.CASCADE, related_name='+')

    def __str__(self):
        return self.price


class Codes(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='+', null=True, blank=True)
    booking = models.ForeignKey(BookingRequest, on_delete=models.CASCADE, related_name='+', null=False, blank=False)
    created_on = models.DateTimeField(null=True, blank=True)
    validated_on = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=CODE_STATUS)
    code = models.CharField(max_length=250, unique=True, null=False)
    validation_attempts = models.IntegerField(default=0, null=False, blank=False)

    def __str__(self):
        return '{}: {}'.format(self.booking, self.code)


def get_short_booking_detail(booking, lang):
    user = ""
    date = ""
    product_name = ""
    product_departure_location = ""
    product_destination_location = ""
    product_arrival_date = ""
    if booking is not None:
        user = get_creator(booking.request_by)
        date = get_date(booking.made_on)
        if booking.product is not None:
            product_name = booking.product.name
            product_departure_location = booking.product.departure_location.label
            product_destination_location = booking.product.destination_location.label
            product_arrival_date = get_date(booking.product.arrival_date)
            if lang == "en":
                return """\nBooking: \nUser: """ + user + """\n Creation Date: """ + date + """\n Name: """ + product_name + """\n Departure location: """ + product_departure_location + """\n Destination location: """ + product_destination_location + """\n Arrival date: """ + product_arrival_date
            if lang == "fr":
                return """\nRequette: \nUtilisateur: """ + user + """\n Date de creation: """ + date + """\n Nom: """ + product_name + """\n Lieu de depart: """ + product_departure_location + """\n Lieu d'arrivee: """ + product_destination_location + """\n Date d'arrivee: """ + product_arrival_date
    return ""


class Notif(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='+', null=True, blank=True)
    booking_request = models.ForeignKey(BookingRequest, on_delete=models.CASCADE, related_name='+', null=True, blank=True)
    price_proposal = models.ForeignKey(PriceProposal, on_delete=models.CASCADE, related_name='+', null=True, blank=True)
    created_on = models.DateTimeField(null=True, blank=True)
    created_by = models.ForeignKey(UserProfile, on_delete=models.PROTECT, related_name='+')
    status = models.CharField(max_length=50, choices=ALERT_STATUS)
    type = models.CharField(max_length=50, choices=ALERT_TYPE)
    
    def __str__(self):
        return '{}: {} {}'.format(self.type, self.booking_request, self.trip)

def get_alert_detail(alert_type):
    alert_types = {
        "offer_rec": ["Offer received on Booking", "Offre recue sur une reservation"],
        "trip_booked": ["Trip is booked", "Voyage reserve"],
        "offer_conf": ["Offer confirmed", "Offre confirmee"],
        "request_validated": ["Request validated", "Requette validee"],
        "request_declined": ["Request declined", "Requette declinee"],
        "request_cancelled": ["Request cancelled", "Requette anulee"],
        "payment_for_booking": ["Payment made on booking", "Paiement effectue sur la reservation"],
        "delivered": ["Product delivered.", "Produit livre."],
    }
    return alert_types[alert_type]

def get_creator(userprofile):
    if userprofile is not None:
        return " ".join([userprofile.user.first_name, userprofile.user.last_name])
    return ""

def get_date(date):
    if date is not None and date != "":
        # start_date = datetime.strptime(date, "%Y-%m-%d").date()
        # depDate2 = start_date.strftime('%Y-%m-%d')
        # cr_date = datetime.strptime(date, '%Y-%m-%d')
        if isinstance(date, str):
            return date
        return date.strftime('%Y-%m-%d')
    return ""

def get_booking_detail(booking, lang):
    user = ""
    date = ""
    product_name = ""
    product_departure_location = ""
    product_destination_location = ""
    product_arrival_date = ""
    if booking is not None:
        user = get_creator(booking.request_by)
        date = get_date(booking.made_on)
        if booking.product is not None:
            product_name = booking.product.name
            product_departure_location = booking.product.departure_location.label
            product_destination_location = booking.product.destination_location.label
            product_arrival_date = get_date(booking.product.arrival_date)
            if lang == "en":
                return """\nBooking: \nUser: """ + user + """\n Creation Date: """ + date + """\n Name: """ + product_name + """\n Departure location: """ + product_departure_location + """\n Destination location: """ + product_destination_location + """\n Arrival date: """ + product_arrival_date
            if lang == "fr":
                return """\nRequette: \nUtilisateur: """ + user + """\n Date de creation: """ + date + """\n Nom: """ + product_name + """\n Lieu de depart: """ + product_departure_location + """\n Lieu d'arrivee: """ + product_destination_location + """\n Date d'arrivee: """ + product_arrival_date
    return ""

def get_trip_detail(trip, lang):
    user = ""
    date = ""
    trip_departure_location = ""
    trip_destination_location = ""
    trip_depart_date = ""
    if trip is not None:
        user = get_creator(trip.created_by)
        date = get_date(trip.creation_date)
        trip_departure_location = trip.departure_location.label
        trip_destination_location = trip.destination_location.label
        trip_depart_date = get_date(trip.depart_date)
        if lang == "en":
            return """\nTrip: \nUser: """ + user + """\n Depart Date: """ + trip_depart_date + """\n Departure location: """ + trip_departure_location + """\n Destination location: """ + trip_destination_location + """\n Creation date: """ + date
        if lang == "fr":
            return """\nVoyage: \nUtilisateur: """ + user + """\n Date de depart: """ + trip_depart_date + """\n Lieu de depart: """ + trip_departure_location + """\n Lieu d'arrivee: """ + trip_destination_location + """\n Date de creation: """ + date
    return ""

def get_price(price_proposal, lang):
    if price_proposal is not None:
        if lang == "en":
            return "\nPrice: {}".format(" ".join([price_proposal.price, "EUR"]))
        if lang == "fr":
            return "\nPrix: {}".format(" ".join([price_proposal.price, "EUR"]))
    return ""

def get_recipients(new_notif):
    lst = []
    if new_notif.booking_request is not None:
        if new_notif.booking_request.request_by is not None and new_notif.booking_request.request_by.pk != new_notif.created_by.pk:
            lst.append(new_notif.booking_request.request_by.user.email)
    if new_notif.trip is not None:
        if new_notif.trip.created_by is not None and new_notif.trip.created_by.pk != new_notif.created_by.pk:
            lst.append(new_notif.trip.created_by.user.email)
    return lst


def email_notification(sender, **kwargs):
    if kwargs["created"]:
        new_notif = kwargs["instance"]
        # send email
        subject_en = """Inzula: [Notification]: """ + get_alert_detail(new_notif.type)[0]
        msg_en = """ User: """ + get_creator(new_notif.created_by) + """\n Date: """ + get_date(new_notif.created_on)  + """\n""" + get_alert_detail(new_notif.type)[0] + """\n""" + get_booking_detail(new_notif.booking_request, "en") + get_price(new_notif.price_proposal, "en") + """\n""" + get_trip_detail(new_notif.trip, "en")
        msg_fr = """ Utilisateur: """ + get_creator(new_notif.created_by) + """\n Date: """ + get_date(new_notif.created_on)  + """\n""" + get_alert_detail(new_notif.type)[1] + """\n""" + get_booking_detail(new_notif.booking_request, "fr") + get_price(new_notif.price_proposal, "fr") + """\n""" + get_trip_detail(new_notif.trip, "fr")
        if new_notif.type == "payment_for_booking":
            send_mail(
            subject_en,
            msg_en + """\n=======================================\n""" + msg_fr,
            settings.DEFAULT_FROM_EMAIL,
            [new_notif.created_by.user.email],
            fail_silently=False,
            )
        send_mail(
            subject_en,
            msg_en + """\n=======================================\n""" + msg_fr,
            settings.DEFAULT_FROM_EMAIL,
            get_recipients(new_notif),
            fail_silently=False,
            )
def send_code_by_email(text, email_recipient):
    subject_en = """Inzula: [Notification]: Delivery code."""
    send_mail(
            subject_en,
            text,
            settings.DEFAULT_FROM_EMAIL,
            [email_recipient],
            fail_silently=False,
            )


def sms_notification(sender, **kwargs):
    if kwargs["created"]:
        new_code = kwargs["instance"]
        # send sms to sender
        text = """Inzula: Request: """ + get_short_booking_detail(new_code.booking, "en") + """Code: """ + new_code.code + """.\n Communicate this code to recipient. Recipient should give this code to carrier after reception of the product."""
        text_recipient = new_code.booking.request_by.phone_number
        email_recipient = new_code.booking.request_by.user.email
        package_recipient = new_code.booking.recipient_phone_number
        send_sms(text, text_recipient)
        send_sms(text, package_recipient)
        send_code_by_email(text, email_recipient)


post_save.connect(email_notification, sender=Notif)
post_save.connect(sms_notification, sender=Codes)
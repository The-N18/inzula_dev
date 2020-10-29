from django.db import models
from userprofile.models import Location, UserProfile, Space

# Create your models here.

TRIP_TYPE_OPTIONS = [
    ('round_trip', 'Round trip'),
    ('one_way_trip', 'One way trip')
]

class Trip(models.Model):
    depart_date = models.DateTimeField()
    comeback_date = models.DateTimeField(null=True, blank=True)
    departure_location = models.CharField(max_length=250)
    destination_location = models.CharField(max_length=250)
    # departure_location = models.ForeignKey(Location, on_delete=models.PROTECT, related_name='+')
    # destination_location = models.ForeignKey(Location, on_delete=models.PROTECT, related_name='+')
    proof = models.FileField(upload_to='uploads/', null=True, blank=True)
    space_available = models.ForeignKey(Space, on_delete=models.PROTECT, related_name='+', null=True, blank=True)
    created_by = models.ForeignKey(UserProfile, on_delete=models.PROTECT, related_name='+', null=True, blank=True)
    estimated_amount = models.CharField(max_length=50, null=True, blank=True)
    parcel_collection_point = models.CharField(max_length=50, null=True, blank=True)
    accepted_parcel_types = models.CharField(max_length=50, null=True, blank=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    trip_type = models.CharField(max_length=50, choices=TRIP_TYPE_OPTIONS)

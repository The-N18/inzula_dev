from django.db import models
from userprofile.models import Location, UserProfile, Space

# Create your models here.

TRIP_TYPE_OPTIONS = [
    ('round_trip', 'Round trip'),
    ('one_way_trip', 'One way trip')
]

class Trip(models.Model):
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    departure_location = models.ForeignKey(Location, on_delete=models.PROTECT, related_name='+')
    destination_location = models.ForeignKey(Location, on_delete=models.PROTECT, related_name='+')
    proof = models.FileField(upload_to='uploads/')
    space_available = models.ForeignKey(Space, on_delete=models.PROTECT, related_name='+')
    created_by = models.ForeignKey(UserProfile, on_delete=models.PROTECT, related_name='+')
    estimated_amount = models.CharField(max_length=50)
    parcel_collection_point = models.CharField(max_length=50)
    accepted_parcel_types = models.CharField(max_length=50)
    creation_date = models.DateTimeField()
    trip_type = models.CharField(max_length=50, choices=TRIP_TYPE_OPTIONS)

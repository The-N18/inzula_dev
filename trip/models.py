from django.db import models
from userprofile.models import Location, UserProfile, Space

# Create your models here.


class Trip(models.Model):
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    departure_location = models.ForeignKey(Location, on_delete=models.CASCADE)
    destination_location = models.ForeignKey(Location, on_delete=models.CASCADE)
    proof = models.FileField(upload_to='uploads/')
    space_available = models.ForeignKey(Space, on_delete=models.CASCADE)
    created_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    estimated_amount = models.CharField(max_length=50)
    parcel_collection_point = models.CharField(max_length=50)
    accepted_parcel_types = models.CharField(max_length=50)
    creation_date = models.DateTimeField()

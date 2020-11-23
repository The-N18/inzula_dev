from django.contrib import admin
from .models import Price, ParcelType, Space, Location, Weight, UserSettings, UserProfile, City

# Register your models here.

admin.site.register(Price)
admin.site.register(ParcelType)
admin.site.register(Space)
admin.site.register(Location)
admin.site.register(Weight)
admin.site.register(UserSettings)
admin.site.register(UserProfile)
admin.site.register(City)

from django.contrib import admin
from .models import Price, Weight, UserSettings, UserProfile, City

# Register your models here.

admin.site.register(Price)
admin.site.register(Weight)
admin.site.register(UserSettings)
admin.site.register(UserProfile)
admin.site.register(City)

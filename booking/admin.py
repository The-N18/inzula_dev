from django.contrib import admin
from .models import Product, ProductImage, BookingRequest, Notif

# Register your models here.

admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(BookingRequest)
admin.site.register(Notif)

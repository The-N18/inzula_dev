from django.contrib import admin
from .models import Product, Codes, ProductImage, BookingRequest, Notif, PriceProposal

# Register your models here.

admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(BookingRequest)
admin.site.register(Notif)
admin.site.register(Codes)
admin.site.register(PriceProposal)

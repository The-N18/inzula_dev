"""inzulaweb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls import url
from trip.urls import urlpatterns as trip_urls
from booking.urls import urlpatterns as booking_urls
from pay_process.urls import urlpatterns as payment_urls
from userprofile.urls import urlpatterns as userprofile_urls
from django.views.static import serve
from django.conf.urls.static import static


urlpatterns = [
    # path('api-auth/', include('rest_framework.urls')),
    # path(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('trips/', include(trip_urls)),
    path('bookings/', include(booking_urls)),
    path('pay/', include(payment_urls)),
    path('user/', include(userprofile_urls)),
    path('admin/', admin.site.urls),
]

urlpatterns += [
    url(r'^media/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT,
    }),
    url(r'^static/(?P<path>.*)$', serve, {
        'document_root': settings.STATIC_ROOT,
    }),
    url(r'^', TemplateView.as_view(template_name="index.html")),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# urlpatterns += [settings.STATIC_URL, settings.MEDIA_URL]

"""inzula URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.urls import path
from booking.views import index
from trip.urls import urlpatterns as trip_urls
from booking.urls import urlpatterns as booking_urls
from pay_process.urls import urlpatterns as payment_urls
from userprofile.urls import urlpatterns as userprofile_urls
from userprofile.views import FacebookLogin, TwitterLogin, GoogleLogin, SocialAccountListView, SocialAccountDisconnectView
from rest_auth.registration.views import VerifyEmailView
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('trips/', include(trip_urls)),
    path('bookings/', include(booking_urls)),
    path('pay/', include(payment_urls)),
    path('user/', include(userprofile_urls)),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/facebook/connect', FacebookLogin.as_view(), name='fb_login'),
    path('rest-auth/twitter/connect', TwitterLogin.as_view(), name='twitter_login'),
    path('rest-auth/google/connect', GoogleLogin.as_view(), name='google_connect'),
    path('socialaccounts/', SocialAccountListView.as_view(),name='social_account_list'),
    path('socialaccounts/(?P<pk>\d+)/disconnect/', SocialAccountDisconnectView.as_view(), name='social_account_disconnect'),
    path('rest-auth/', include('rest_auth.urls')),
    path('account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    path('account-confirm-email/(?P<key>[-:\w]+)/', VerifyEmailView.as_view(), name='account_confirm_email'),
    path('', index, name='index'),
    path('transport/', index, name='index'),
    path('dispatch/', index, name='index'),
    path('faqs/', index, name='index'),
    path('insurance/', index, name='index'),
    path('legal/', index, name='index'),
    path('transparency/', index, name='index'),
    path('verify/(?P<key>[-:\w]+)/', index, name='index'),
    path('terms/', index, name='index'),
    path('useragreement/', index, name='index'),
    path('signupdiscount/', index, name='index'),
    path('profile/', index, name='index'),
    path('search_bookings/', index, name='index'),
    path('', include('django.contrib.auth.urls')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

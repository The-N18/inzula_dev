from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UpdateProfileView, UserProfileViewSet, CityView, DeleteProfileView, CompleteProfileView

router = DefaultRouter()
router.register(r'userprofiles', UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('update_profile', UpdateProfileView.as_view()),
    path('complete_profile', CompleteProfileView.as_view()),
    path('user_account/<int:pk>/', DeleteProfileView.as_view()),
    path('city', CityView.as_view()),
]

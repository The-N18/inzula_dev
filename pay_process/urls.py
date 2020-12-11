from django.urls import path, include
from .views import PayIn, InitCardInfo, PayForBooking, UpdateCardInfo, CreateNaturalUser, UserTransactions


urlpatterns = [
    path('PayForBooking', PayForBooking.as_view()),
    path('payToWallet', PayIn.as_view()),
    path('userTransactions', UserTransactions.as_view()),
    path('initCardInfo', InitCardInfo.as_view()),
    path('updateCardInfo', UpdateCardInfo.as_view()),
    path('createUser', CreateNaturalUser.as_view()),
]

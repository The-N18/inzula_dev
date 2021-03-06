from django.urls import path, include
from .views import PayIn, InitCardInfo, RefundAmount, Cashout, DepositUserTransactions, WithdrawalUserTransactions, MaxPayOutAmount, PayForBookingCardId, PayForBookingPaypal, UserCards, PayForBookingWithWallet, UserWalletFunds, PayForBooking, UpdateCardInfo, CreateNaturalUser, FailedUserTransactions, OutgoingUserTransactions, IncomingUserTransactions


urlpatterns = [
    path('PayForBooking', PayForBooking.as_view()),
    path('PayForBookingWithCardId', PayForBookingCardId.as_view()),
    path('PayForBookingWithPaypal', PayForBookingPaypal.as_view()),
    path('PayForBookingWithWalletFunds', PayForBookingWithWallet.as_view()),
    path('getFunds', UserWalletFunds.as_view()),
    path('getMaxPayoutAmount', MaxPayOutAmount.as_view()),
    path('getRefundAmt', RefundAmount.as_view()),
    path('cashout', Cashout.as_view()),
    path('getCards', UserCards.as_view()),
    path('payToWallet', PayIn.as_view()),
    path('incomingUserTransactions', IncomingUserTransactions.as_view()),
    path('outgoingUserTransactions', OutgoingUserTransactions.as_view()),
    path('withdrawalUserTransactions', WithdrawalUserTransactions.as_view()),
    path('depositUserTransactions', DepositUserTransactions.as_view()),
    path('failedUserTransactions', FailedUserTransactions.as_view()),
    path('initCardInfo', InitCardInfo.as_view()),
    path('updateCardInfo', UpdateCardInfo.as_view()),
    path('createUser', CreateNaturalUser.as_view()),
]

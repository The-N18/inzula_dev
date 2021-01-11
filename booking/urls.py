from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookingRequestView, CancelBooking, SubmitDeliveryCode, SelectableUserBookingsRequestListView, ValidateBooking, DeclineBooking, BookingRequestsTotalPrice, UserBookedListRequestListView, SenderNotifsListView, CarrierNotifsListView, PriceProposalCreateView, UserNotifsListView, NotifDetail, NotifCreateView, BookingRequestDetail, UserBookingsRequestListView, ProductsViewSet, ProductImagesViewSet, BookingRequestViewSet, BookingRequestSearchView

router = DefaultRouter()
router.register(r'bookings', BookingRequestViewSet)
router.register(r'products', ProductsViewSet)
router.register(r'productimages', ProductImagesViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('add_request', BookingRequestView.as_view()),
    path('add_notif', NotifCreateView.as_view()),
    path('get_total_price', BookingRequestsTotalPrice.as_view()),
    path('validate_booking', ValidateBooking.as_view()),
    path('decline_booking', DeclineBooking.as_view()),
    path('cancel_booking', CancelBooking.as_view()),
    path('propose_price', PriceProposalCreateView.as_view()),
    path('submit_delivery_code', SubmitDeliveryCode.as_view()),
    path('notif/<int:pk>/', NotifDetail.as_view()),
    # path('del_request', DelBookingRequestView.as_view()),
    path('booking_request/<int:pk>/', BookingRequestDetail.as_view()),
    path('search_bookings', BookingRequestSearchView.as_view()),
    path('bookings_list', UserBookingsRequestListView.as_view()),
    path('selectable_bookings_list', SelectableUserBookingsRequestListView.as_view()),
    path('booked_list', UserBookedListRequestListView.as_view()),
    path('notifs_list', UserNotifsListView.as_view()),
    path('sender_notifs_list', SenderNotifsListView.as_view()),
    path('carrier_notifs_list', CarrierNotifsListView.as_view()),
]

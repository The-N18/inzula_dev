import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';
import {checkAuthTimeout} from "./auth";
import {getInitialReservations} from "./userReservations";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openCancelBooking = () => {
  return {
    type: actionTypes.CANCEL_BOOKING_OPEN_MODAL
  };
};

export const setBookingCancelBooking = (bookingId) => {
  return {
    type: actionTypes.CANCEL_BOOKING_SET_BOOKING,
    bookingId: bookingId,
  };
};

export const setRefundAmtCancelBooking = (refundAmt) => {
  return {
    type: actionTypes.CANCEL_BOOKING_SET_REFUND_AMOUNT,
    refundAmt: refundAmt,
  };
};

export const closeCancelBooking = () => {
  return {
    type: actionTypes.CANCEL_BOOKING_CLOSE_MODAL,
  };
};

export const getRefundAmt = (bookingId) => {
  return dispatch => {
    axios
      .post(api_url() + "/pay/getRefundAmt",
            {bookingId: bookingId}
          )
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(setRefundAmtCancelBooking(res.data["amt"]));
      })
      .catch(err => {
        dispatch(createNotification({
          message: "Failed to get your funds",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

export const cancelBooking = (booking_id, user_id) => {
  const userProfileId = localStorage.getItem("userProfileId");
  return dispatch => {
    axios
      .post(api_url() + "/bookings/cancel_booking", {bookingId: booking_id})
      .then(res => {
        if(res && res['data'] && res['data']['info']) {
          if(res['data']['detail'] === "BOOKING_ALREADY_DELIVERED") {
            dispatch(createNotification({
              message: 'Sorry, your booking has already been delivered. You cannot cancel it.',
              type: NOTIFICATION_TYPE_WARNING,
              duration: 30000,
              canDismiss: true,
            }));
          }
          if(res['data']['detail'] === "TOO_LATE_TO_CANCEL") {
            dispatch(createNotification({
              message: 'Sorry, your booking cannot be cancelled 1 day before delivery.',
              type: NOTIFICATION_TYPE_WARNING,
              duration: 30000,
              canDismiss: true,
            }));
          }
        }
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(setBookingCancelBooking(0));
        dispatch(createNotification({
          message: 'The booking request has been cancelled.',
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
        dispatch(getInitialReservations(userProfileId));
      })
      .catch(err => {
        dispatch(createNotification({
          message: 'Failed to cancel the booking.',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
        dispatch(setBookingCancelBooking(0));
      });
  };
}

import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';
import {checkAuthTimeout} from "./auth";
import {getInitialReservations} from "./userBookings";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openDeclineBooking = () => {
  return {
    type: actionTypes.DECLINE_BOOKING_OPEN_MODAL
  };
};

export const setBookingDeclineBooking = (bookingId) => {
  return {
    type: actionTypes.DECLINE_BOOKING_SET_BOOKING,
    bookingId: bookingId,
  };
};

export const closeDeclineBooking = () => {
  return {
    type: actionTypes.DECLINE_BOOKING_CLOSE_MODAL,
  };
};

export const declineBooking = (booking_id, user_id) => {
  return dispatch => {
    axios
      .post(api_url() + "/bookings/decline_booking", {bookingId: booking_id})
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(createNotification({
          message: 'The booking request has been declined.',
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
        dispatch(getInitialReservations(user_id));
      })
      .catch(err => {
        dispatch(createNotification({
          message: 'Failed to decline the booking.',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url } from "../../configurations";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';
import {checkAuthTimeout} from "./auth";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openValidateBooking = () => {
  return {
    type: actionTypes.VALIDATE_BOOKING_OPEN_MODAL
  };
};

export const setBookingValidateBooking = (bookingId) => {
  return {
    type: actionTypes.VALIDATE_BOOKING_SET_BOOKING,
    bookingId: bookingId,
  };
};

export const closeValidateBooking = () => {
  return {
    type: actionTypes.VALIDATE_BOOKING_CLOSE_MODAL,
  };
};

export const validateBooking = (booking_id) => {
  const userProfileId = localStorage.getItem("userProfileId");
  const config = {
            headers: { 'content-type': 'multipart/form-data' }
          };
  return dispatch => {
    axios
      .post(api_url() + "/bookings/validate_booking", {booking_id: booking_id}, config)
      .then(res => {
        console.log(res.data)
        dispatch(checkAuthTimeout(3600));
        dispatch(createNotification({
          message: 'The booking request has been validated.',
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
      })
      .catch(err => {
        dispatch(createNotification({
          message: 'Failed to validate the booking.',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

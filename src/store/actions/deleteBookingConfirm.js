import axios from "axios";
import * as actionTypes from "./actionTypes";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openDeleteBookingConfirm = () => {
  return {
    type: actionTypes.DELETE_BOOKING_CONFIRM_OPEN_MODAL
  };
};

export const setBookingDeleteBookingConfirm = (bookingId) => {
  return {
    type: actionTypes.DELETE_BOOKING_CONFIRM_SET_BOOKING,
    bookingId: bookingId,
  };
};

export const closeDeleteBookingConfirm = () => {
  return {
    type: actionTypes.DELETE_BOOKING_CONFIRM_CLOSE_MODAL,
  };
};

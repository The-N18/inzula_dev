import axios from "axios";
import * as actionTypes from "./actionTypes";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const updateBookingOpenModal = (bookingInfo, pk) => {
  return {
    type: actionTypes.UPDATE_BOOKING_OPEN_MODAL,
    bookingInfo: bookingInfo,
    pk: pk
  };
};

export const updateBookingCloseModal = () => {
  return {
    type: actionTypes.UPDATE_BOOKING_CLOSE_MODAL,
    bookingInfo: {},
    pk: null
  };
};

export const updateBookingStart = () => {
  return {
    type: actionTypes.UPDATE_BOOKING_START
  };
};

export const updateBookingSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_BOOKING_SUCCESS,
  };
};

export const updateBookingFail = error => {
  return {
    type: actionTypes.UPDATE_BOOKING_FAIL,
    error: error
  };
};

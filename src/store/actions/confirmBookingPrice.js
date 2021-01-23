import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {setNaturalUserId} from "./paymentFormModal";
import {createNotification, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openConfirmBookingPrice = () => {
  return {
    type: actionTypes.CONFIRM_BOOKING_PRICE_OPEN_MODAL
  };
};

export const setBookingRequestInfo = (bookingId, tripId, userId, price, paymentAmountConfirmed) => {
  return {
    type: actionTypes.CONFIRM_BOOKING_PRICE_SET_INFO,
    bookingId: bookingId,
    tripId: tripId,
    price: price,
    userId: userId,
    paymentAmountConfirmed: paymentAmountConfirmed
  };
};

export const setPrice = (price) => {
  return {
    type: actionTypes.CONFIRM_BOOKING_PRICE_SET_PRICE,
    price: price,
  };
};

export const closeConfirmBookingPrice = () => {
  return {
    type: actionTypes.CONFIRM_BOOKING_PRICE_CLOSE_MODAL,
  };
};

export const getBookingTotalPrice = (selectedBookings, userId) => {
  return dispatch => {
    axios
      .post(api_url() + "/bookings/get_total_price", {
        booking_ids: selectedBookings,
        userId: userId
      })
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(setPrice(res['data']['total_price']['product__proposed_price__sum']))
      })
      .catch(err => {
        dispatch(createNotification({
          message: 'Failed to get the price to pay.',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

export const createWalletUser = (userId) => {
  return dispatch => {
    axios
      .post(api_url() + "/pay/createUser", {
        userId: userId,
      })
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(setNaturalUserId(res['data']['naturalUserId']))
      })
      .catch(err => {
        dispatch(createNotification({
          message: 'Failed to create user.',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

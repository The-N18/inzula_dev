import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openProposePriceOnBooking = () => {
  return {
    type: actionTypes.PROPOSE_PRICE_ON_BOOKING_OPEN_MODAL
  };
};

export const setBookingRequestId = (bookingId) => {
  return {
    type: actionTypes.PROPOSE_PRICE_ON_BOOKING_SET_ID,
    bookingId: bookingId,
  };
};

export const closeProposePriceOnBooking = () => {
  return {
    type: actionTypes.PROPOSE_PRICE_ON_BOOKING_CLOSE_MODAL,
  };
};

export const proposePriceOnBooking = (bookingId, userId, price) => {
  return dispatch => {
    axios
      .post(api_url() + "/bookings/propose_price", {
        booking_id: bookingId,
        user_id: userId,
        price: price,
      })
      .then(res => {
        dispatch(checkAuthTimeout(3600));
        dispatch(closeProposePriceOnBooking());
        dispatch(createNotification({
          message: 'Your price proposition has been added. The corresponding user is notified.',
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
      })
      .catch(err => {
        dispatch(createNotification({
          message: 'Failed to add your proposition of price.',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

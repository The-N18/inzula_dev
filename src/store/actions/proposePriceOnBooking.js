import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';

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
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        if(res && res['data'] && res['data']['info']) {
          if(res['data']['info'] === "NO_CORRESPONDING_TRIP") {
            dispatch(createNotification({
              message: 'Sorry, you do not have a corresponding trip to be able to make an offer on this request.',
              type: NOTIFICATION_TYPE_WARNING,
              duration: 30000,
              canDismiss: true,
            }));
          }
          if(res['data']['info'] === "CANNOT_MAKE_OFFER_ON_YOUR_OWN_REQUEST") {
            dispatch(createNotification({
              message: 'Sorry, you cannot make an offer on your own request',
              type: NOTIFICATION_TYPE_WARNING,
              duration: 30000,
              canDismiss: true,
            }));
          }
          if(res['data']['info'] === "CANNOT_MAKE_OFFER_ON_BOOKED_REQUEST") {
            dispatch(createNotification({
              message: 'Sorry, you cannot make an offer on a booked request.',
              type: NOTIFICATION_TYPE_WARNING,
              duration: 30000,
              canDismiss: true,
            }));
          }
          if(res['data']['info'] === "CANNOT_MAKE_OFFER_ON_VALIDATED_REQUEST") {
            dispatch(createNotification({
              message: 'Sorry, you cannot make an offer on a validated request.',
              type: NOTIFICATION_TYPE_WARNING,
              duration: 30000,
              canDismiss: true,
            }));
          }
          if(res['data']['info'] === "CANNOT_MAKE_OFFER_ON_DELIVERED_REQUEST") {
            dispatch(createNotification({
              message: 'Sorry, you cannot make an offer on a delivered request.',
              type: NOTIFICATION_TYPE_WARNING,
              duration: 30000,
              canDismiss: true,
            }));
          }

        } else {
          dispatch(createNotification({
            message: 'Your price proposition has been added. The corresponding user is notified.',
            type: NOTIFICATION_TYPE_SUCCESS,
            duration: 10000,
            canDismiss: true,
          }));
        }
        dispatch(closeProposePriceOnBooking());
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

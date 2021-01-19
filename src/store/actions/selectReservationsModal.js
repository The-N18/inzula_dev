import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';
import {checkAuthTimeout} from "./auth";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openModal = () => {
  return {
    type: actionTypes.SELECT_RESERVATIONS_OPEN_MODAL
  };
};

export const selectBooking = (selected) => {
  return {
    type: actionTypes.MODAL_SELECT_RESERVATION,
    selected: selected,
  };
};

export const openModalSelectReservations = (tripId) => {
  return {
    type: actionTypes.SELECT_RESERVATIONS_OPEN_MODAL_FOR_TRIP,
    tripId: tripId,
  };
};

export const closeModal = () => {
  return {
    type: actionTypes.SELECT_RESERVATIONS_CLOSE_MODAL,
  };
};

export const bookTrip = (tripId, selectedBookings, userId) => {
  return dispatch => {
    axios
      .post(api_url() + "/bookings/add_notif", {
        trip: tripId,
        bookings: selectedBookings,
        type: "trip_booked",
        status: "unseen",
        created_by: userId
      })
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(createNotification({
          message: "You have successfully booked this trip",
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
      })
      .catch(err => {
        dispatch(createNotification({
          message: "Failed to book this trip",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
};

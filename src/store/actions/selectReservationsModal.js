import axios from "axios";
import * as actionTypes from "./actionTypes";
import { backend_url } from "../../configurations";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';
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

export const bookTrip = (tripId, selectedBookings) => {
  return dispatch => {
    axios
      .post(backend_url() + "/trips/add_bookings", {
        tripId: tripId,
        selectedBookings: selectedBookings
      })
      .then(res => {
        console.log(res.data);
        dispatch(checkAuthTimeout(3600));
        dispatch(createNotification({
          message: "You have successfully booked this trip",
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
      })
      .catch(err => {
        console.log(err.response.data)
        dispatch(createNotification({
          message: "Failed to book this trip",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
};

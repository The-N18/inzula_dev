import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const getReservationsStart = () => {
  return {
    type: actionTypes.GET_SELECTABLE_RESERVATIONS_START
  };
};

export const getReservationsSuccess = (reservations, next, count) => {
  return {
    type: actionTypes.GET_SELECTABLE_RESERVATIONS_SUCCESS,
    reservations: reservations,
    loading: false,
    next_url: next,
    count: count
  };
};

export const getInitialReservationsSuccess = (reservations, next, count) => {
  return {
    type: actionTypes.GET_INITIAL_SELECTABLE_RESERVATIONS_SUCCESS,
    reservations: reservations,
    loading: false,
    next_url: next,
    count: count
  };
};

export const getReservationsFail = error => {
  return {
    type: actionTypes.GET_SELECTABLE_RESERVATIONS_FAIL,
    error: error
  };
};

export const getInitialSelectableReservations = (user_id, tripId) => {
  return dispatch => {
    dispatch(getReservationsStart());
    axios
      .get(api_url() + "/bookings/selectable_bookings_list", {
            params: {user_id: user_id, trip_id: tripId}
          })
      .then(res => {
        console.log(res.data)
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(getInitialReservationsSuccess(res.data["results"], res.data["next"], res.data["count"]));
      })
      .catch(err => {
        dispatch(getReservationsFail(err));
        dispatch(createNotification({
          message: "Failed to get your reservations",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}


export const getSelectableReservations = (user_id, tripId, next_url, page_count) => {
  console.log("in search Reservations");
  console.log(next_url);
  if(next_url !== "" && next_url !== null) {
    return dispatch => {
      dispatch(getReservationsStart());
      axios
        .get(next_url)
        .then(res => {
          console.log(res.data)
          dispatch(checkAuthTimeout(AUTH_TIMEOUT));
          dispatch(getReservationsSuccess(res.data["results"], res.data["next"], res.data["count"]));
        })
        .catch(err => {
          dispatch(getReservationsFail(err));
          dispatch(createNotification({
            message: "Failed to get your reservations",
            type: NOTIFICATION_TYPE_ERROR,
            duration: 10000,
            canDismiss: true,
          }));
        });
    };
  } else {
    return dispatch => {
      dispatch(getReservationsStart());
      axios
        .get(api_url() + "/bookings/selectable_bookings_list", {
              params: {user_id: user_id, trip_id: tripId}
            })
        .then(res => {
          console.log(res.data)
          dispatch(checkAuthTimeout(AUTH_TIMEOUT));
          dispatch(getReservationsSuccess(res.data["results"], res.data["next"], res.data["count"]));
        })
        .catch(err => {
          dispatch(getReservationsFail(err));
          dispatch(createNotification({
            message: "Failed to get your reservations",
            type: NOTIFICATION_TYPE_ERROR,
            duration: 10000,
            canDismiss: true,
          }));
        });
    };
  }
}

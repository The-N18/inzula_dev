import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT, parseNextUrl } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const getReservationsStart = () => {
  return {
    type: actionTypes.GET_RESERVATIONS_START
  };
};

export const getReservationsSuccess = (reservations, next, count) => {
  return {
    type: actionTypes.GET_RESERVATIONS_SUCCESS,
    reservations: reservations,
    loading: false,
    next_url: next,
    count: count
  };
};

export const getInitialReservationsSuccess = (reservations, next, count) => {
  return {
    type: actionTypes.GET_INITIAL_RESERVATIONS_SUCCESS,
    reservations: reservations,
    loading: false,
    next_url: next,
    count: count
  };
};

export const getReservationsFail = error => {
  return {
    type: actionTypes.GET_RESERVATIONS_FAIL,
    error: error
  };
};

export const getInitialReservations = (user_id) => {
  return dispatch => {
    dispatch(getReservationsStart());
    axios
      .get(api_url() + "/bookings/bookings_list", {
            params: {user_id: user_id}
          })
      .then(res => {
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


export const getReservations = (user_id, next_url, page_count) => {
  if(next_url !== "" && next_url !== null) {
    return dispatch => {
      dispatch(getReservationsStart());
      axios
        .get(parseNextUrl(next_url))
        .then(res => {
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
        .get(api_url() + "/bookings/bookings_list", {
              params: {user_id: user_id}
            })
        .then(res => {
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

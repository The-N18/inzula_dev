import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT, parseNextUrl } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const getTripsStart = () => {
  return {
    type: actionTypes.GET_TRIPS_START
  };
};

export const getTripsSuccess = (trips, next, count) => {
  return {
    type: actionTypes.GET_TRIPS_SUCCESS,
    trips: trips,
    loading: false,
    next_url: next,
    count: count
  };
};

export const getInitialTripsSuccess = (trips, next, count) => {
  return {
    type: actionTypes.GET_INITIAL_TRIPS_SUCCESS,
    trips: trips,
    loading: false,
    next_url: next,
    count: count
  };
};

export const getTripsFail = error => {
  return {
    type: actionTypes.GET_TRIPS_FAIL,
    error: error
  };
};

export const getInitialTrips = (user_id) => {
  return dispatch => {
    dispatch(getTripsStart());
    axios
      .get(api_url() + "/trips/trips_list", {
            params: {user_id: user_id}
          })
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(getInitialTripsSuccess(res.data["results"], res.data["next"], res.data["count"]));
      })
      .catch(err => {
        dispatch(getTripsFail(err));
        dispatch(createNotification({
          message: "Failed to get your trips",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}


export const getTrips = (user_id, next_url, page_count) => {
  if(next_url !== "" && next_url !== null) {
    return dispatch => {
      dispatch(getTripsStart());
      axios
        .get(parseNextUrl(next_url))
        .then(res => {
          dispatch(checkAuthTimeout(AUTH_TIMEOUT));
          dispatch(getTripsSuccess(res.data["results"], res.data["next"], res.data["count"]));
        })
        .catch(err => {
          dispatch(getTripsFail(err));
          dispatch(createNotification({
            message: "Failed to get your trips",
            type: NOTIFICATION_TYPE_ERROR,
            duration: 10000,
            canDismiss: true,
          }));
        });
    };
  } else {
    return dispatch => {
      dispatch(getTripsStart());
      axios
        .get(api_url() + "/trips/trips_list", {
              params: {user_id: user_id}
            })
        .then(res => {
          dispatch(checkAuthTimeout(AUTH_TIMEOUT));
          dispatch(getTripsSuccess(res.data["results"], res.data["next"], res.data["count"]));
        })
        .catch(err => {
          dispatch(getTripsFail(err));
          dispatch(createNotification({
            message: "Failed to get your trips",
            type: NOTIFICATION_TYPE_ERROR,
            duration: 10000,
            canDismiss: true,
          }));
        });
    };
  }
}

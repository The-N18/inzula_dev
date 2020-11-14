import axios from "axios";
import * as actionTypes from "./actionTypes";
import { backend_url } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const getTripsStart = () => {
  return {
    type: actionTypes.GET_TRIPS_START
  };
};

export const getTripsSuccess = (trips, next, count) => {
  console.log("getTripsSuccess")
  console.log(next)
  return {
    type: actionTypes.GET_TRIPS_SUCCESS,
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

export const getTrips = (user_id, next_url, page_count) => {
  console.log("in searchTrips");
  console.log(next_url);
  if(next_url !== "" && next_url !== null) {
    return dispatch => {
      dispatch(getTripsStart());
      axios
        .get(next_url)
        .then(res => {
          console.log(res.data)
          dispatch(checkAuthTimeout(3600));
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
        .get(backend_url() + "/trips/trips_list", {
              params: {user_id: user_id}
            })
        .then(res => {
          console.log(res.data)
          dispatch(checkAuthTimeout(3600));
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

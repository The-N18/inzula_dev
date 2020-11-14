import axios from "axios";
import * as actionTypes from "./actionTypes";
import { backend_url } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export const addTripStart = () => {
  return {
    type: actionTypes.ADD_TRIP_START
  };
};

export const addTripSuccess = (data) => {
  return {
    type: actionTypes.ADD_TRIP_SUCCESS,
  };
};

export const addTripFail = error => {
  return {
    type: actionTypes.ADD_TRIP_FAIL,
    error: error
  };
};


export const tripAddition = (created_by, departure_location, destination_location, depart_date, comeback_date, trip_type) => {
  console.log("in tripAddition");
  return dispatch => {
    dispatch(addTripStart());
    axios
      .post(backend_url() + "/trips/add_trip", {
        created_by: created_by,
        departure_location: departure_location,
        destination_location: destination_location,
        depart_date: depart_date,
        comeback_date: comeback_date,
        trip_type: trip_type
      })
      .then(res => {
        console.log(res.data)
        dispatch(checkAuthTimeout(3600));
        dispatch(addTripSuccess(res.data));
      })
      .catch(err => {
        dispatch(addTripFail(err));
      });
  };
}

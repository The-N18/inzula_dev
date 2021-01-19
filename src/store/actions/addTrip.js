import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';
import {getInitialTrips} from "./userTrips";
import {closeAddTripModal} from "./addTripModal";

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

export const toggleCheck = (trip_type_check) => {
  return {
    type: actionTypes.ADD_TRIP_TOGGLE_CHECK,
    trip_type_check: trip_type_check === "one_way_trip" ? "round_trip" : "one_way_trip",
  };
}


export const tripAddition = (created_by, departure_location, destination_location, depart_date, comeback_date, trip_type) => {
  const userProfileId = localStorage.getItem("userProfileId");
  return dispatch => {
    dispatch(addTripStart());
    axios
      .post(api_url() + "/trips/add_trip", {
        created_by: created_by,
        departure_location: departure_location,
        destination_location: destination_location,
        depart_date: depart_date,
        comeback_date: comeback_date,
        trip_type: trip_type
      })
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(addTripSuccess(res.data));
        dispatch(closeAddTripModal());
        dispatch(getInitialTrips(userProfileId));
        dispatch(createNotification({
          message: 'Your trip has been added',
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
      })
      .catch(err => {
        dispatch(addTripFail(err));
        dispatch(createNotification({
          message: 'Failed to add your trip',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}


export const updateTrip = (dta) => {
  const userProfileId = localStorage.getItem("userProfileId");
  return dispatch => {
    axios
      .put(api_url() + "/trips/trip/"+dta["pk"]+"/", dta)
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(createNotification({
          message: 'Your trip has been updated',
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
        dispatch(getInitialTrips(userProfileId));
      })
      .catch(err => {
        dispatch(createNotification({
          message: 'Failed to update your trip',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

export const deleteTrip = (tripId) => {
  const userProfileId = localStorage.getItem("userProfileId");
  const config = {
            headers: { 'content-type': 'multipart/form-data' }
          };
  return dispatch => {
    axios
      .delete(api_url() + "/trips/trip/"+tripId+"/", {}, config)
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(createNotification({
          message: 'Your trip has been deleted',
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
        dispatch(getInitialTrips(userProfileId));
      })
      .catch(err => {
        dispatch(createNotification({
          message: 'Failed to delete your trip',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

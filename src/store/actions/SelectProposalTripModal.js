import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export const openSelectProposalTrip = () => {
  return {
    type: actionTypes.SELECT_PROPOSAL_TRIP_MODAL_OPEN_MODAL
  };
};

export const closeSelectProposalTrip = () => {
  return {
    type: actionTypes.SELECT_PROPOSAL_TRIP_MODAL_CLOSE_MODAL,
  };
};

export const getTripsStart = () => {
  return {
    type: actionTypes.SELECT_PROPOSAL_TRIP_MODAL_GET_TRIPS_START
  };
};

export const selectSingleTrip = (proposedTripId) => {
  return {
    type: actionTypes.SELECT_PROPOSAL_TRIP_MODAL_SELECT_TRIP,
    proposedTripId: proposedTripId,
  };
};

export const getTripsSuccess = (proposalTrips) => {
  return {
    type: actionTypes.SELECT_PROPOSAL_TRIP_MODAL_GET_TRIPS_SUCCESS,
    proposalTrips: proposalTrips,
    loading: false,
  };
};

export const getTripsFail = error => {
  return {
    type: actionTypes.SELECT_PROPOSAL_TRIP_MODAL_GET_TRIPS_FAIL,
    error: error
  };
};


export const getProposalTrips = (user_id, booking_id) => {
  return dispatch => {
    dispatch(getTripsStart());
    axios
      .get(api_url() + "/trips/proposal_trips_list", {
            params: {
              user_id: user_id,
              booking_id: booking_id
            }
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

import axios from "axios";
import * as actionTypes from "./actionTypes";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const updateTripOpenModal = (tripInfo, pk) => {
  return {
    type: actionTypes.UPDATE_TRIP_OPEN_MODAL,
    tripInfo: tripInfo,
    pk: pk
  };
};

export const updateTripCloseModal = () => {
  return {
    type: actionTypes.UPDATE_TRIP_CLOSE_MODAL,
    tripInfo: {},
    pk: null
  };
};

export const updateTripStart = () => {
  return {
    type: actionTypes.UPDATE_TRIP_START
  };
};

export const updateTripSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_TRIP_SUCCESS,
  };
};

export const updateTripFail = error => {
  return {
    type: actionTypes.UPDATE_TRIP_FAIL,
    error: error
  };
};

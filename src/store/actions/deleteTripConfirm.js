import axios from "axios";
import * as actionTypes from "./actionTypes";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openDeleteTripConfirm = () => {
  return {
    type: actionTypes.DELETE_TRIP_CONFIRM_OPEN_MODAL
  };
};

export const setTripDeleteTripConfirm = (tripId) => {
  return {
    type: actionTypes.DELETE_TRIP_CONFIRM_SET_TRIP,
    tripId: tripId,
  };
};

export const closeDeleteTripConfirm = () => {
  return {
    type: actionTypes.DELETE_TRIP_CONFIRM_CLOSE_MODAL,
  };
};

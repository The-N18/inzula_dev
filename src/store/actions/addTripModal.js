import axios from "axios";
import * as actionTypes from "./actionTypes";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openAddTripModal = () => {
  return {
    type: actionTypes.ADD_TRIP_OPEN_MODAL
  };
};

export const closeAddTripModal = () => {
  return {
    type: actionTypes.ADD_TRIP_CLOSE_MODAL,
  };
};

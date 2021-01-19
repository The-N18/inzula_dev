import axios from "axios";
import * as actionTypes from "./actionTypes";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openModal = () => {
  return {
    type: actionTypes.SEND_PACKAGE_OPEN_MODAL
  };
};

export const openModalForTrip = (tripId) => {
  return {
    type: actionTypes.SEND_PACKAGE_OPEN_MODAL_FOR_TRIP,
    tripId: tripId,
  };
};

export const closeModal = () => {
  return {
    type: actionTypes.SEND_PACKAGE_CLOSE_MODAL,
  };
};

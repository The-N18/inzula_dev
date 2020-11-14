import axios from "axios";
import * as actionTypes from "./actionTypes";
import { backend_url } from "../../configurations";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openModal = () => {
  return {
    type: actionTypes.SELECT_RESERVATIONS_OPEN_MODAL
  };
};

export const openModalSelectReservations = (tripId) => {
  return {
    type: actionTypes.SELECT_RESERVATIONS_OPEN_MODAL_FOR_TRIP,
    tripId: tripId,
  };
};

export const closeModal = () => {
  return {
    type: actionTypes.SELECT_RESERVATIONS_CLOSE_MODAL,
  };
};

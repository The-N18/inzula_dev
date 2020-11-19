import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url } from "../../configurations";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openProposePriceOnBooking = () => {
  return {
    type: actionTypes.PROPOSE_PRICE_ON_BOOKING_OPEN_MODAL
  };
};

export const setBookingRequestId = (bookingId) => {
  return {
    type: actionTypes.PROPOSE_PRICE_ON_BOOKING_SET_ID,
    bookingId: bookingId,
  };
};

export const closeProposePriceOnBooking = () => {
  return {
    type: actionTypes.PROPOSE_PRICE_ON_BOOKING_CLOSE_MODAL,
  };
};

import axios from "axios";
import * as actionTypes from "./actionTypes";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openPaymentOptions = () => {
  return {
    type: actionTypes.PAYMENT_OPTIONS_OPEN_MODAL
  };
};

export const closePaymentOptions = () => {
  return {
    type: actionTypes.PAYMENT_OPTIONS_CLOSE_MODAL,
  };
};

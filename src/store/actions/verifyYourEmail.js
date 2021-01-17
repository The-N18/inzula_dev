import axios from "axios";
import * as actionTypes from "./actionTypes";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openVerifyYourEmail = () => {
  return {
    type: actionTypes.VERIFY_EMAIL_OPEN_MODAL
  };
};

export const closeVerifyYourEmail = () => {
  return {
    type: actionTypes.VERIFY_EMAIL_CLOSE_MODAL,
  };
};

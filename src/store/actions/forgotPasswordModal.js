import axios from "axios";
import * as actionTypes from "./actionTypes";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openForgotPasswordModal = () => {
  return {
    type: actionTypes.FORGOT_PASSWORD_OPEN_MODAL
  };
};

export const closeForgotPasswordModal = () => {
  return {
    type: actionTypes.FORGOT_PASSWORD_CLOSE_MODAL,
  };
};

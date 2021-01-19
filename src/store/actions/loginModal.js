import axios from "axios";
import * as actionTypes from "./actionTypes";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openLoginModal = () => {
  return {
    type: actionTypes.LOGIN_OPEN_MODAL
  };
};

export const closeLoginModal = () => {
  return {
    type: actionTypes.LOGIN_CLOSE_MODAL,
  };
};

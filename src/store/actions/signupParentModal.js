import axios from "axios";
import * as actionTypes from "./actionTypes";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openSignupParentModal = () => {
  return {
    type: actionTypes.SIGNUP_PARENT_OPEN_MODAL
  };
};

export const closeSignupParentModal = () => {
  return {
    type: actionTypes.SIGNUP_PARENT_CLOSE_MODAL,
  };
};

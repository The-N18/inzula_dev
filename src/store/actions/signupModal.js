import axios from "axios";
import * as actionTypes from "./actionTypes";
import { backend_url } from "../../configurations";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openSignupModal = () => {
  return {
    type: actionTypes.SIGNUP_OPEN_MODAL
  };
};

export const closeSignupModal = () => {
  return {
    type: actionTypes.SIGNUP_CLOSE_MODAL,
  };
};

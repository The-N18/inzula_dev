import axios from "axios";
import * as actionTypes from "./actionTypes";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openDeleteAccount = () => {
  return {
    type: actionTypes.DELETE_ACCOUNT_OPEN_MODAL
  };
};

export const closeDeleteAccount = () => {
  return {
    type: actionTypes.DELETE_ACCOUNT_CLOSE_MODAL,
  };
};

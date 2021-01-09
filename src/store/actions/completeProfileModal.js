import axios from "axios";
import * as actionTypes from "./actionTypes";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openCompleteProfileModal = () => {
  return {
    type: actionTypes.COMPLETE_PROFILE_OPEN_MODAL
  };
};

export const closeCompleteProfileModal = () => {
  return {
    type: actionTypes.COMPLETE_PROFILE_CLOSE_MODAL,
  };
};

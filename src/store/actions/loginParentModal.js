import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url } from "../../configurations";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openLoginParentModal = () => {
  return {
    type: actionTypes.LOGIN_PARENT_OPEN_MODAL
  };
};

export const closeLoginParentModal = () => {
  return {
    type: actionTypes.LOGIN_PARENT_CLOSE_MODAL,
  };
};

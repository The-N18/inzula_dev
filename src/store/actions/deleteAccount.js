import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';
import {checkAuthTimeout} from "./auth";

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

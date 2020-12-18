import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {setNaturalUserId} from "./paymentFormModal";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';

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

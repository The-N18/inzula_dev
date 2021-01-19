import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const getFundsStart = () => {
  return {
    type: actionTypes.GET_FUNDS_START
  };
};


export const getFundsSuccess = (funds) => {
  return {
    type: actionTypes.GET_FUNDS_SUCCESS,
    funds: funds,
    loading: false,
  };
};

export const getFundsFail = error => {
  return {
    type: actionTypes.GET_FUNDS_FAIL,
    error: error
  };
};

export const getFunds = (user_id) => {
  return dispatch => {
    dispatch(getFundsStart());
    axios
      .post(api_url() + "/pay/getFunds",
            {user_id: user_id}
          )
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(getFundsSuccess(res.data["funds"]));
      })
      .catch(err => {
        dispatch(getFundsFail(err));
        dispatch(createNotification({
          message: "Failed to get your funds",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

export const cashout = (user_id) => {
  return dispatch => {
    axios
      .post(api_url() + "/pay/cashout",
            {user_id: user_id}
          )
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(getFunds(user_id));
      })
      .catch(err => {
        dispatch(createNotification({
          message: "Failed to cashout",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

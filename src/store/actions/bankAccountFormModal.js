import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openBankAccountFormModal = () => {
  return {
    type: actionTypes.BANK_ACCOUNT_FORM_OPEN_MODAL
  };
};

export const closeBankAccountFormModal = () => {
  return {
    type: actionTypes.BANK_ACCOUNT_FORM_CLOSE_MODAL,
  };
};

export const getMaxPayoutStart = () => {
  return {
    type: actionTypes.BANK_ACCOUNT_FORM_GET_MAX_FUNDS_START
  };
};


export const getMaxPayoutSuccess = (max_amt) => {
  return {
    type: actionTypes.BANK_ACCOUNT_FORM_GET_MAX_FUNDS_SUCCESS,
    max_amt: max_amt,
    loading: false,
  };
};

export const getMaxPayoutFail = error => {
  return {
    type: actionTypes.BANK_ACCOUNT_FORM_GET_MAX_FUNDS_FAIL,
    error: error
  };
};

export const getCashoutStart = () => {
  return {
    type: actionTypes.BANK_ACCOUNT_FORM_GET_CASHOUT_START
  };
};


export const getCashoutSuccess = () => {
  return {
    type: actionTypes.BANK_ACCOUNT_FORM_GET_CASHOUT_SUCCESS,
    cashout_loading: false,
  };
};

export const getCashoutFail = error => {
  return {
    type: actionTypes.BANK_ACCOUNT_FORM_GET_CASHOUT_FAIL,
    cashout_error: error
  };
};

export const getMaxPayoutAmount = (user_id) => {
  return dispatch => {
    dispatch(getMaxPayoutStart());
    axios
      .post(api_url() + "/pay/getMaxPayoutAmount",
            {user_id: user_id}
          )
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(getMaxPayoutSuccess(res.data["max_amt"]));
      })
      .catch(err => {
        dispatch(getMaxPayoutFail(err));
        dispatch(createNotification({
          message: "Failed to get your funds",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

export const cashout = (values) => {
  return dispatch => {
    dispatch(getCashoutStart());
    axios
      .post(api_url() + "/pay/cashout",
            values
          )
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(getCashoutSuccess());
      })
      .catch(err => {
        dispatch(getCashoutFail(err));
        dispatch(createNotification({
          message: "Failed to cashout your funds",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

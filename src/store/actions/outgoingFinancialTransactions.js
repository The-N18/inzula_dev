import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const getTransactionsStart = () => {
  return {
    type: actionTypes.GET_OUTGOING_TRANSACTIONS_START
  };
};

export const getTransactionsSuccess = (transactions, next, count) => {
  return {
    type: actionTypes.GET_OUTGOING_TRANSACTIONS_SUCCESS,
    transactions: transactions,
    loading: false,
    next_url: next,
    count: count
  };
};

export const getInitialTransactionsSuccess = (transactions, next, count) => {
  return {
    type: actionTypes.GET_INITIAL_OUTGOING_TRANSACTIONS_SUCCESS,
    transactions: transactions,
    loading: false,
    next_url: next,
    count: count
  };
};

export const getTransactionsFail = error => {
  return {
    type: actionTypes.GET_OUTGOING_TRANSACTIONS_FAIL,
    error: error
  };
};

export const getInitialTransactions = (user_id) => {
  return dispatch => {
    dispatch(getTransactionsStart());
    axios
      .post(api_url() + "/pay/outgoingUserTransactions",
            {user_id: user_id}
          )
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(getInitialTransactionsSuccess(res.data["transactions"], '', ''));
      })
      .catch(err => {
        dispatch(getTransactionsFail(err));
        dispatch(createNotification({
          message: "Failed to get your transactions",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}


export const getTransactions = (user_id, next_url, page_count) => {
  if(next_url !== "" && next_url !== null) {
    return dispatch => {
      dispatch(getTransactionsStart());
      axios
        .post(next_url)
        .then(res => {
          dispatch(checkAuthTimeout(AUTH_TIMEOUT));
          dispatch(getTransactionsSuccess(res.data["results"], res.data["next"], res.data["count"]));
        })
        .catch(err => {
          dispatch(getTransactionsFail(err));
          dispatch(createNotification({
            message: "Failed to get your transactions",
            type: NOTIFICATION_TYPE_ERROR,
            duration: 10000,
            canDismiss: true,
          }));
        });
    };
  } else {
    return dispatch => {
      dispatch(getTransactionsStart());
      axios
        .post(api_url() + "/pay/outgoingUserTransactions",
              {user_id: user_id}
            )
        .then(res => {
          dispatch(checkAuthTimeout(AUTH_TIMEOUT));
          dispatch(getTransactionsSuccess(res.data["results"], res.data["next"], res.data["count"]));
        })
        .catch(err => {
          dispatch(getTransactionsFail(err));
          dispatch(createNotification({
            message: "Failed to get your transactions",
            type: NOTIFICATION_TYPE_ERROR,
            duration: 10000,
            canDismiss: true,
          }));
        });
    };
  }
}

import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const getCardsStart = () => {
  return {
    type: actionTypes.GET_PAYMENT_METHODS_START
  };
};

export const getCardsSuccess = (cards) => {
  return {
    type: actionTypes.GET_PAYMENT_METHODS_SUCCESS,
    cards: cards,
    loading: false,
  };
};

export const getCardsFail = error => {
  return {
    type: actionTypes.GET_PAYMENT_METHODS_FAIL,
    error: error
  };
};

export const getCards = (user_id) => {
  return dispatch => {
    dispatch(getCardsStart());
    axios
      .post(api_url() + "/pay/getCards",
            {user_id: user_id}
          )
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(getCardsSuccess(res.data["cards"]));
      })
      .catch(err => {
        dispatch(getCardsFail(err));
        dispatch(createNotification({
          message: "Failed to get your cards",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

export const addMethod = (user_id) => {
  return dispatch => {
    axios
      .post(api_url() + "/pay/addMethod",
            {user_id: user_id}
          )
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(getCards(user_id));
      })
      .catch(err => {
        dispatch(createNotification({
          message: "Failed to add payment method",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openSelectCreditCard = () => {
  return {
    type: actionTypes.SELECT_CREDIT_CARD_MODAL_OPEN_MODAL
  };
};

export const closeSelectCreditCard = () => {
  return {
    type: actionTypes.SELECT_CREDIT_CARD_MODAL_CLOSE_MODAL,
  };
};

export const getCardsStart = () => {
  return {
    type: actionTypes.SELECT_CREDIT_CARD_MODAL_GET_CARDS_START
  };
};

export const selectSingleCard = (cardId) => {
  return {
    type: actionTypes.SELECT_CREDIT_CARD_MODAL_SELECT_CARD,
    cardId: cardId,
  };
};

export const getCardsSuccess = (cards) => {
  return {
    type: actionTypes.SELECT_CREDIT_CARD_MODAL_GET_CARDS_SUCCESS,
    cards: cards,
    loading: false,
  };
};

export const getCardsFail = error => {
  return {
    type: actionTypes.SELECT_CREDIT_CARD_MODAL_GET_CARDS_FAIL,
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

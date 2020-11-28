import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openPaymentFormModal = () => {
  return {
    type: actionTypes.PAYMENT_FORM_OPEN_MODAL
  };
};

export const closePaymentFormModal = () => {
  return {
    type: actionTypes.PAYMENT_FORM_CLOSE_MODAL,
  };
};

export const setCardRegistrationData = (cardRegistrationData) => {
  return {
    type: actionTypes.SET_CARD_REGISTRATION_DATA,
    cardRegistrationData: cardRegistrationData,
  };
};

export const setNaturalUserId = (naturalUserId) => {
  return {
    type: actionTypes.SET_NATURAL_USER_ID,
    naturalUserId: naturalUserId,
  };
};

export const payInInzulaWallet = (values) => {
  return dispatch => {
    axios
      .post(api_url() + "/pay/payin", values)
      .then(res => {
        dispatch(checkAuthTimeout(3600));
          dispatch(createNotification({
            message: 'Your payment has been processed successfully.',
            type: NOTIFICATION_TYPE_SUCCESS,
            duration: 10000,
            canDismiss: true,
          }));
      })
      .catch(err => {
        dispatch(createNotification({
          message: 'Failed to process payment.',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}


export const getInitialCardData = (values) => {
  return dispatch => {
    axios
      .post(api_url() + "/pay/initCardInfo", values)
      .then(result => {
        dispatch(checkAuthTimeout(3600));
        console.log(result);
        dispatch(getCardTokenizedData({
          'accessKeyRef': result['data']['accessKeyRef'],
          'data': result['data']['data'],
          'cardNumber': values['cardNumber'],
          'cardExpirationDate': values['cardExpirationDate'],
          'cardCvx': values['cardCvx']}, result['data']['card_id'], values['userId']));
        dispatch(setCardRegistrationData(result['data']['data']))
      })
      .catch(err => {
      });
  };
}

export const getCardTokenizedData = (values, card_id, user_id) => {
  const config = {
            headers: { 'content-type': 'x-www-form-urlencoded',
                       "Access-Control-Allow-Origin": "*" }
          };
  return dispatch => {
    axios
      .post("https://homologation-webpayment.payline.com/webpayment/getToken/", values, config)
      .then(result => {
        dispatch(checkAuthTimeout(3600));
        console.log(result);
        dispatch(updateCardData({...result, card_id, user_id}));
        dispatch(setCardRegistrationData(result['data']['data']))
      })
      .catch(err => {
      });
  };
}

export const updateCardData = (values) => {
  return dispatch => {
    axios
      .post(api_url() + "/pay/updateCardInfo", values)
      .then(result => {
        dispatch(checkAuthTimeout(3600));
        console.log(result);
        dispatch(setCardRegistrationData(result['data']))
      })
      .catch(err => {
      });
  };
}

import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';
import mangopay from 'mangopay2-nodejs-sdk';
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
        dispatch(setCardRegistrationData(result['data']['data']));
        const card_dta = result['data']['tokenized_data'];
        const card_id = result['data']['card_id'];
        const user_id = values['userId'];
        dispatch(updateCardData({data: card_dta, card_id: card_id, user_id: user_id, selectedBookingIds: values['selectedBookingIds']}));
        console.log(result);
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
        dispatch(payToWallet({card_id: result['data']['card_id'], user_id: values['user_id'], selectedBookingIds: values['selectedBookingIds']}));
      })
      .catch(err => {
      });
  };
}

export const payToWallet = (values) => {
  return dispatch => {
    axios
      .post(api_url() + "/pay/payToWallet", values)
      .then(result => {
        dispatch(checkAuthTimeout(3600));
        console.log(result);
        dispatch(setCardRegistrationData(result['data']))
      })
      .catch(err => {
      });
  };
}

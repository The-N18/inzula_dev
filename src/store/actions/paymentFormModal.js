import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';
import { closeModal } from "./selectReservationsModal";
import  { closeSelectCreditCard } from "./selectCreditCardModal";
import {closePaymentOptions} from "./paymentOptionsModal";
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


export const startPay = () => {
  return {
    type: actionTypes.PAYMENT_FORM_START_PAY
  };
};

export const endPay = () => {
  return {
    type: actionTypes.PAYMENT_FORM_END_PAY,
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
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
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
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
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
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
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
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        console.log(result);
        dispatch(setCardRegistrationData(result['data']))
      })
      .catch(err => {
      });
  };
}



export const payForBooking = (values) => {
  return dispatch => {
    dispatch(startPay());
    axios
      .post(api_url() + "/pay/PayForBooking", values)
      .then(result => {
        console.log(result);
        // close modals
        dispatch(closePaymentFormModal());
        dispatch(closeModal());
        dispatch(closeSelectCreditCard());
        dispatch(closePaymentOptions());
        dispatch(endPay());
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(createNotification({
          message: 'Your payment has been processed successfully.',
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 0,
          canDismiss: true,
        }));
      })
      .catch(err => {
        dispatch(endPay());
        dispatch(createNotification({
          message: 'Failed to process payment.',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 0,
          canDismiss: true,
        }));
      });
  };
}



export const payForBookingWithCardId = (values) => {
  return dispatch => {
    dispatch(startPay());
    axios
      .post(api_url() + "/pay/PayForBookingWithCardId", values)
      .then(result => {
        console.log(result);
        // close modals
        dispatch(closePaymentFormModal());
        dispatch(closeModal());
        dispatch(closeSelectCreditCard());
        dispatch(closePaymentOptions());
        dispatch(endPay());
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(createNotification({
          message: 'Your payment has been processed successfully.',
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 0,
          canDismiss: true,
        }));
      })
      .catch(err => {
        dispatch(endPay());
        dispatch(createNotification({
          message: 'Failed to process payment.',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 0,
          canDismiss: true,
        }));
      });
  };
}

export const payForBookingWithPaypal = (values) => {
  return dispatch => {
    dispatch(startPay());
    axios
      .post(api_url() + "/pay/PayForBookingWithPaypal", values)
      .then(result => {
        console.log(result);
        dispatch(closePaymentFormModal());
        dispatch(closeModal());
        dispatch(closePaymentOptions());
        dispatch(endPay());
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(createNotification({
          message: 'Your payment has been processed successfully.',
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 0,
          canDismiss: true,
        }));
      })
      .catch(err => {
        dispatch(endPay());
        dispatch(createNotification({
          message: 'Failed to process payment.',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 0,
          canDismiss: true,
        }));
      });
  };
}

export const payForBookingWithWalletFunds = (values) => {
  return dispatch => {
    dispatch(startPay());
    axios
      .post(api_url() + "/pay/PayForBookingWithWalletFunds", values)
      .then(result => {
        if("error" in result.data) {
          dispatch(endPay());
          dispatch(createNotification({
            message: 'You do not have enough funds in your wallet. Use another payment method.',
            type: NOTIFICATION_TYPE_ERROR,
            duration: 0,
            canDismiss: true,
          }));
        } else {
          dispatch(closePaymentFormModal());
          dispatch(closeModal());
          dispatch(closePaymentOptions());
          dispatch(endPay());
          dispatch(checkAuthTimeout(AUTH_TIMEOUT));
          dispatch(createNotification({
            message: 'Your payment has been processed successfully.',
            type: NOTIFICATION_TYPE_SUCCESS,
            duration: 0,
            canDismiss: true,
          }));
        }
      })
      .catch(err => {
        dispatch(endPay());
        dispatch(createNotification({
          message: 'Failed to process payment.',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 0,
          canDismiss: true,
        }));
      });
  };
}

import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';
import {getInitialReservations} from "./userBookings";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openProductDeliveryModal = () => {
  return {
    type: actionTypes.PRODUCT_DELIVERY_MODAL_OPEN_MODAL
  };
};

export const closeProductDeliveryModal = () => {
  return {
    type: actionTypes.PRODUCT_DELIVERY_MODAL_CLOSE_MODAL,
  };
};

export const submitDeliveryCode = (userId, code) => {
  return dispatch => {
    axios
      .post(api_url() + "/bookings/submit_delivery_code", {
        user_id: userId,
        code: code,
      })
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        if(res && res['data'] && res['data']['info']) {
          if(res['data']['info'] === "MAX_VALIDATION_ATTEMPTS_REACHED") {
            dispatch(createNotification({
              message: 'Sorry, you have tried to validate this too many times.',
              type: NOTIFICATION_TYPE_WARNING,
              duration: 30000,
              canDismiss: true,
            }));
          }
          if(res['data']['info'] === "CODE_IS_OBSOLETE") {
            dispatch(createNotification({
              message: 'Sorry, the code cannot be used anymore. It is obsolete.',
              type: NOTIFICATION_TYPE_WARNING,
              duration: 30000,
              canDismiss: true,
            }));
          }
          if(res['data']['info'] === "CODE_ALREADY_VALIDATED") {
            dispatch(createNotification({
              message: 'Sorry, the code has already been validated. Do not try to validate this again.',
              type: NOTIFICATION_TYPE_WARNING,
              duration: 30000,
              canDismiss: true,
            }));
          }
          if(res['data']['info'] === "INVALID_CODE") {
            dispatch(createNotification({
              message: 'Sorry, the code is invalid. Check that you took the correct code from the recipient.',
              type: NOTIFICATION_TYPE_WARNING,
              duration: 30000,
              canDismiss: true,
            }));
          }
          if(res['data']['info'] === "CODE_VALIDATED_SUCCESSFULLY") {
            dispatch(createNotification({
              message: 'Your code has been validated successfully. your will recieve your payment soon.',
              type: NOTIFICATION_TYPE_SUCCESS,
              duration: 30000,
              canDismiss: true,
            }));
            dispatch(getInitialReservations(userId));
          }

        }
        dispatch(closeProductDeliveryModal());
      })
      .catch(err => {
        dispatch(createNotification({
          message: 'Failed to submit your code.',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}


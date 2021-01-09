import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';

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
      .post(api_url() + "/bookings/submit_code", {
        user_id: userId,
        code: code,
      })
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        // if(res && res['data'] && res['data']['info']) {
        //   if(res['data']['info'] === "NO_CORRESPONDING_TRIP") {
        //     dispatch(createNotification({
        //       message: 'Sorry, you do not have a corresponding trip to be able to make an offer on this request.',
        //       type: NOTIFICATION_TYPE_WARNING,
        //       duration: 30000,
        //       canDismiss: true,
        //     }));
        //   }
        //   if(res['data']['info'] === "CANNOT_MAKE_OFFER_ON_YOUR_OWN_REQUEST") {
        //     dispatch(createNotification({
        //       message: 'Sorry, you cannot make an offer on your own request',
        //       type: NOTIFICATION_TYPE_WARNING,
        //       duration: 30000,
        //       canDismiss: true,
        //     }));
        //   }
        //   if(res['data']['info'] === "CANNOT_MAKE_OFFER_ON_BOOKED_REQUEST") {
        //     dispatch(createNotification({
        //       message: 'Sorry, you cannot make an offer on a booked request.',
        //       type: NOTIFICATION_TYPE_WARNING,
        //       duration: 30000,
        //       canDismiss: true,
        //     }));
        //   }
        //   if(res['data']['info'] === "CANNOT_MAKE_OFFER_ON_VALIDATED_REQUEST") {
        //     dispatch(createNotification({
        //       message: 'Sorry, you cannot make an offer on a validated request.',
        //       type: NOTIFICATION_TYPE_WARNING,
        //       duration: 30000,
        //       canDismiss: true,
        //     }));
        //   }

        // } else {
        //   dispatch(createNotification({
        //     message: 'Your price proposition has been added. The corresponding user is notified.',
        //     type: NOTIFICATION_TYPE_SUCCESS,
        //     duration: 10000,
        //     canDismiss: true,
        //   }));
        // }
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


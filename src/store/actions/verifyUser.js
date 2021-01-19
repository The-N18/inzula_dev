import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url } from "../../configurations";
import {createNotification, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const verifyUserStart = () => {
  return {
    type: actionTypes.VERIFY_USER_START
  };
};

export const verifyUserSuccess = () => {
  return {
    type: actionTypes.VERIFY_USER_SUCCESS,
  };
};

export const verifyUserFail = error => {
  return {
    type: actionTypes.VERIFY_USER_FAIL,
    error: error
  };
};

 export const verifyUser = (verificationKey) => {
   return dispatch => {
     dispatch(verifyUserStart());
     axios
       .post(api_url() + "/account-confirm-email/?key="+verificationKey, {key: verificationKey})
       .then(res => {
         dispatch(verifyUserSuccess());
       })
       .catch(err => {
         dispatch(verifyUserFail(err.response.data));
         dispatch(createNotification({
           message: "User verification failed.",
           type: NOTIFICATION_TYPE_ERROR,
           duration: 10000,
           canDismiss: true,
         }));
       });
   };
 };

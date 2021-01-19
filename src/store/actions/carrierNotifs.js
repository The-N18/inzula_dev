import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT, parseNextUrl } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const getNotifsStart = () => {
  return {
    type: actionTypes.GET_CARRIER_NOTIFS_START
  };
};

export const getNotifsSuccess = (notifs, next, count) => {
  return {
    type: actionTypes.GET_CARRIER_NOTIFS_SUCCESS,
    notifs: notifs,
    loading: false,
    next_url: next,
    count: count
  };
};

export const getInitialNotifsSuccess = (notifs, next, count) => {
  return {
    type: actionTypes.GET_INITIAL_CARRIER_NOTIFS_SUCCESS,
    notifs: notifs,
    loading: false,
    next_url: next,
    count: count
  };
};

export const getNotifsFail = error => {
  return {
    type: actionTypes.GET_CARRIER_NOTIFS_FAIL,
    error: error
  };
};

export const getInitialNotifs = (user_id) => {
  return dispatch => {
    dispatch(getNotifsStart());
    axios
      .get(api_url() + "/bookings/carrier_notifs_list", {
            params: {user_id: user_id}
          })
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(getInitialNotifsSuccess(res.data["results"], res.data["next"], res.data["count"]));
      })
      .catch(err => {
        dispatch(getNotifsFail(err));
        dispatch(createNotification({
          message: "Failed to get your notifications",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}


export const getNotifs = (user_id, next_url, page_count) => {
  if(next_url !== "" && next_url !== null) {
    return dispatch => {
      dispatch(getNotifsStart());
      axios
        .get(parseNextUrl(next_url))
        .then(res => {
          dispatch(checkAuthTimeout(AUTH_TIMEOUT));
          dispatch(getNotifsSuccess(res.data["results"], res.data["next"], res.data["count"]));
        })
        .catch(err => {
          dispatch(getNotifsFail(err));
          dispatch(createNotification({
            message: "Failed to get your notifications",
            type: NOTIFICATION_TYPE_ERROR,
            duration: 10000,
            canDismiss: true,
          }));
        });
    };
  } else {
    return dispatch => {
      dispatch(getNotifsStart());
      axios
        .get(api_url() + "/bookings/carrier_notifs_list", {
              params: {user_id: user_id}
            })
        .then(res => {
          dispatch(checkAuthTimeout(AUTH_TIMEOUT));
          dispatch(getNotifsSuccess(res.data["results"], res.data["next"], res.data["count"]));
        })
        .catch(err => {
          dispatch(getNotifsFail(err));
          dispatch(createNotification({
            message: "Failed to get your notifications",
            type: NOTIFICATION_TYPE_ERROR,
            duration: 10000,
            canDismiss: true,
          }));
        });
    };
  }
}

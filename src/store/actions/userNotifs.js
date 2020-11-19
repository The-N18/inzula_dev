import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const getNotifsStart = () => {
  return {
    type: actionTypes.GET_USER_NOTIFS_START
  };
};

export const getNotifsSuccess = (notifs, next, count) => {
  return {
    type: actionTypes.GET_USER_NOTIFS_SUCCESS,
    notifs: notifs,
    loading: false,
    next_url: next,
    count: count
  };
};

export const getInitialNotifsSuccess = (notifs, next, count) => {
  return {
    type: actionTypes.GET_INITIAL_USER_NOTIFS_SUCCESS,
    notifs: notifs,
    loading: false,
    next_url: next,
    count: count
  };
};

export const getNotifsFail = error => {
  return {
    type: actionTypes.GET_USER_NOTIFS_FAIL,
    error: error
  };
};

export const getInitialNotifs = (user_id) => {
  return dispatch => {
    dispatch(getNotifsStart());
    axios
      .get(api_url() + "/bookings/notifs_list", {
            params: {user_id: user_id}
          })
      .then(res => {
        dispatch(checkAuthTimeout(3600));
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
  console.log("in searchTrips");
  console.log(next_url);
  if(next_url !== "" && next_url !== null) {
    return dispatch => {
      dispatch(getNotifsStart());
      axios
        .get(next_url)
        .then(res => {
          console.log(res.data)
          dispatch(checkAuthTimeout(3600));
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
        .get(api_url() + "/bookings/notifs_list", {
              params: {user_id: user_id}
            })
        .then(res => {
          console.log(res.data)
          dispatch(checkAuthTimeout(3600));
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

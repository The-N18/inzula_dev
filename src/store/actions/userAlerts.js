import axios from "axios";
import * as actionTypes from "./actionTypes";
import { backend_url } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const getAlertsStart = () => {
  return {
    type: actionTypes.GET_ALERTS_START
  };
};

export const getAlertsSuccess = (alerts, next, count) => {
  console.log("getAlertsSuccess")
  console.log(next)
  return {
    type: actionTypes.GET_ALERTS_SUCCESS,
    alerts: alerts,
    loading: false,
    next_url: next,
    count: count
  };
};

export const getAlertsFail = error => {
  return {
    type: actionTypes.GET_ALERTS_FAIL,
    error: error
  };
};

export const getAlerts = (user_id, next_url, page_count) => {
  console.log("in search Reservations");
  console.log(next_url);
  // if(next_url !== "" && next_url !== null) {
  //   return dispatch => {
  //     dispatch(getAlertsStart());
  //     axios
  //       .get(next_url)
  //       .then(res => {
  //         console.log(res.data)
  //         dispatch(checkAuthTimeout(3600));
  //         dispatch(getAlertsSuccess(res.data["results"], res.data["next"], res.data["count"]));
  //       })
  //       .catch(err => {
  //         dispatch(getAlertsFail(err));
  //         dispatch(createNotification({
  //           message: "Failed to get your alerts",
  //           type: NOTIFICATION_TYPE_ERROR,
  //           duration: 10000,
  //           canDismiss: true,
  //         }));
  //       });
  //   };
  // } else {
  //   return dispatch => {
  //     dispatch(getAlertsStart());
  //     axios
  //       .get(backend_url() + "/bookings/bookings_list", {
  //             params: {user_id: user_id}
  //           })
  //       .then(res => {
  //         console.log(res.data)
  //         dispatch(checkAuthTimeout(3600));
  //         dispatch(getAlertsSuccess(res.data["results"], res.data["next"], res.data["count"]));
  //       })
  //       .catch(err => {
  //         dispatch(getAlertsFail(err));
  //         dispatch(createNotification({
  //           message: "Failed to get your alerts",
  //           type: NOTIFICATION_TYPE_ERROR,
  //           duration: 10000,
  //           canDismiss: true,
  //         }));
  //       });
  //   };
  // }
}

import axios from "axios";
import * as actionTypes from "./actionTypes";
import { backend_url } from "../../configurations";
import {checkAuthTimeout} from "./auth";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const getReservationsStart = () => {
  return {
    type: actionTypes.GET_RESERVATIONS_START
  };
};

export const getReservationsSuccess = (reservations, next, count) => {
  console.log("getReservationsSuccess")
  console.log(next)
  return {
    type: actionTypes.GET_RESERVATIONS_SUCCESS,
    reservations: reservations,
    loading: false,
    next_url: next,
    count: count
  };
};

export const getReservationsFail = error => {
  return {
    type: actionTypes.GET_RESERVATIONS_FAIL,
    error: error
  };
};

export const getReservations = (user_id, next_url, page_count) => {
  console.log("in search Reservations");
  console.log(next_url);
  if(next_url !== "" && next_url !== null) {
    return dispatch => {
      dispatch(getReservationsStart());
      axios
        .get(next_url)
        .then(res => {
          console.log(res.data)
          dispatch(checkAuthTimeout(3600));
          dispatch(getReservationsSuccess(res.data["results"], res.data["next"], res.data["count"]));
        })
        .catch(err => {
          dispatch(getReservationsFail(err));
        });
    };
  } else {
    return dispatch => {
      dispatch(getReservationsStart());
      axios
        .get(backend_url() + "/bookings/bookings_list", {
              params: {user_id: user_id}
            })
        .then(res => {
          console.log(res.data)
          dispatch(checkAuthTimeout(3600));
          dispatch(getReservationsSuccess(res.data["results"], res.data["next"], res.data["count"]));
        })
        .catch(err => {
          dispatch(getReservationsFail(err));
        });
    };
  }
}

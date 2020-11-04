import axios from "axios";
import * as actionTypes from "./actionTypes";
import { backend_url } from "../../configurations";
import {checkAuthTimeout} from "./auth";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const searchStart = () => {
  return {
    type: actionTypes.SEARCH_START
  };
};

export const searchSuccess = (bookings, next, count) => {
  console.log("get search ReservationsSuccess")
  console.log(next)
  return {
    type: actionTypes.SEARCH_SUCCESS,
    bookings: bookings,
    loading: false,
    next_url: next,
    count: count
  };
};

export const searchFail = error => {
  return {
    type: actionTypes.SEARCH_FAIL,
    error: error
  };
};

export const searchTrips = (departure_location, destination_location, travel_date, user_id, next_url, page_count) => {
  console.log("in searchTrips");
  if(next_url !== "" && next_url !== null) {
    return dispatch => {
      dispatch(searchStart());
      axios
        .get(next_url)
        .then(res => {
          console.log(res.data)
          dispatch(checkAuthTimeout(3600));
          dispatch(searchSuccess(res.data["results"], res.data["next"], res.data["count"]));
        })
        .catch(err => {
          dispatch(searchFail(err));
        });
    };
  } else {
    return dispatch => {
      dispatch(searchStart());
      axios
        .get(backend_url() + "/bookings/search_bookings", {
            params: {
              departure_location: departure_location,
              destination_location: destination_location,
              travel_date: travel_date,
            }})
        .then(res => {
          console.log(res.data)
          dispatch(searchSuccess(res.data["results"], res.data["next"], res.data["count"]));
          dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
          dispatch(searchFail(err));
        });
    };
  }
}

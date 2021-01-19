import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT, parseNextUrl } from "../../configurations";
import {checkAuthTimeout} from "./auth";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const searchStart = () => {
  return {
    type: actionTypes.SEARCH_TRIPS_START
  };
};

export const searchSuccess = (trips, next, count) => {
  return {
    type: actionTypes.SEARCH_TRIPS_SUCCESS,
    trips: trips,
    loading: false,
    next_url: next,
    count: count
  };
};

export const searchSuccessOverride = (trips, next, count) => {
  return {
    type: actionTypes.SEARCH_TRIPS_SUCCESS_OVERRIDE,
    trips: trips,
    loading: false,
    next_url: next,
    count: count
  };
};

export const searchFail = error => {
  return {
    type: actionTypes.SEARCH_TRIPS_FAIL,
    error: error
  };
};

export const searchTrips = (departure_location, destination_location, travel_date, user_id, next_url, page_count) => {
  if(next_url !== "" && next_url !== null) {
    return dispatch => {
      dispatch(searchStart());
      axios
        .get(parseNextUrl(next_url))
        .then(res => {
          dispatch(checkAuthTimeout(AUTH_TIMEOUT));
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
        .get(api_url() + "/trips/search_trips", {
            params: {
              departure_location: departure_location,
              destination_location: destination_location,
              travel_date: travel_date,
              user_id: user_id,
            }})
        .then(res => {
          dispatch(searchSuccessOverride(res.data["results"], res.data["next"], res.data["count"]));
          dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        })
        .catch(err => {
          dispatch(searchFail(err));
        });
    };
  }
}

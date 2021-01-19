import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT, parseNextUrl } from "../../configurations";
import {checkAuthTimeout} from "./auth";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const searchStart = () => {
  return {
    type: actionTypes.SEARCH_BOOKINGS_START
  };
};

export const searchSuccess = (bookings, next, count) => {
  return {
    type: actionTypes.SEARCH_BOOKINGS_SUCCESS,
    bookings: bookings,
    loading: false,
    next_url: next,
    count: count
  };
};

export const searchSuccessOverride = (bookings, next, count) => {
  return {
    type: actionTypes.SEARCH_BOOKINGS_SUCCESS_OVERRIDE,
    bookings: bookings,
    loading: false,
    next_url: next,
    count: count
  };
};

export const searchFail = error => {
  return {
    type: actionTypes.SEARCH_BOOKINGS_FAIL,
    error: error
  };
};

export const searchBookings = (departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, page_count) => {
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
        .get(api_url() + "/bookings/search_bookings", {
            params: {
              departure_location: departure_location,
              destination_location: destination_location,
              travel_date: travel_date,
              product_category: product_category,
              product_size: product_size,
              proposed_price: proposed_price,
              weight: weight,
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

export const filterBookings = (departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, page_count) => {
  return dispatch => {
    dispatch(searchStart());
    axios
      .get(api_url() + "/bookings/search_bookings", {
          params: {
            departure_location: departure_location,
            destination_location: destination_location,
            travel_date: travel_date,
            product_category: product_category,
            product_size: product_size,
            proposed_price_min: proposed_price[0],
            proposed_price_max: proposed_price[1],
            weight_min: weight[0],
            weight_max: weight[1],
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

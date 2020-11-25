import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url } from "../../configurations";
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
  console.log("in searchBookings");
  if(next_url !== "" && next_url !== null) {
    console.log("in if");
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
    console.log("in else");
    console.log(user_id);
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
          console.log(res.data)
          dispatch(searchSuccessOverride(res.data["results"], res.data["next"], res.data["count"]));
          dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
          dispatch(searchFail(err));
        });
    };
  }
}

export const filterBookings = (departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, page_count) => {
  console.log("in filterBookings");
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
        console.log(res.data)
        dispatch(searchSuccessOverride(res.data["results"], res.data["next"], res.data["count"]));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(searchFail(err));
      });
  };
}

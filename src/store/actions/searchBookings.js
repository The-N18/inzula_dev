import axios from "axios";
import * as actionTypes from "./actionTypes";
import { backend_url } from "../../configurations";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const searchStart = () => {
  return {
    type: actionTypes.SEARCH_START
  };
};

export const searchSuccess = (bookings) => {
  return {
    type: actionTypes.SEARCH_SUCCESS,
    bookings: bookings,
    loading: false,
  };
};

export const searchFail = error => {
  return {
    type: actionTypes.SEARCH_FAIL,
    error: error
  };
};

export const searchTrips = (departure_location, destination_location, travel_date) => {
  console.log("in searchTrips");
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
        dispatch(searchSuccess(res.data["results"]));
      })
      .catch(err => {
        dispatch(searchFail(err));
      });
  };
}

import axios from "axios";
import * as actionTypes from "./actionTypes";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export const setInitialValues = (departure_location, destination_location, travel_date) => {
  return {
    type: actionTypes.SEARCH_BOOKINGS_PAGE_SET_INITIAL,
    departure_location: departure_location,
    destination_location: destination_location,
    travel_date: travel_date,
  };
};

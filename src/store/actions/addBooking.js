import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const addBookingStart = () => {
  return {
    type: actionTypes.ADD_BOOKING_START
  };
};

export const addBookingSuccess = (data) => {
  return {
    type: actionTypes.ADD_BOOKING_SUCCESS,
  };
};

export const addBookingFail = error => {
  return {
    type: actionTypes.ADD_BOOKING_FAIL,
    error: error
  };
};


export const bookingAddition = (tripId, created_by, pictures, product_location, product_description,
  product_name, product_category, product_weight, product_size, product_value, proposed_price,
  delivery_date, pickup_address, recipient_name,
recipient_phone_number, terms_conditions, user_agreement) => {
  console.log("in bookingAddition");
  console.log(pictures);
  const config = {
            headers: { 'content-type': 'multipart/form-data' }
          };
  const data2 = {
    tripId: tripId,
    created_by: created_by["user"],
    product_location: product_location,
    product_description: product_description,
    product_name: product_name,
    product_category: product_category,
    product_weight: product_weight,
    product_size: product_size,
    product_value: product_value,
    proposed_price: proposed_price,
    delivery_date: delivery_date,
    pickup_address: pickup_address,
    recipient_name: recipient_name,
    recipient_phone_number: recipient_phone_number,
    terms_conditions: terms_conditions,
    user_agreement: user_agreement
  };
  let data = new FormData();
  for( let key in data2 ) {
    data.append(key, data2[key]);
  }
  Array.from(pictures).forEach(image => {
    data.append('pictures', image, image['name']);
  });
  return dispatch => {
    dispatch(addBookingStart());
    axios
      .post(api_url() + "/bookings/add_request", data, config)
      .then(res => {
        console.log(res.data)
        dispatch(checkAuthTimeout(3600));
        dispatch(addBookingSuccess(res.data));
        dispatch(createNotification({
          message: 'Your request has been added',
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
      })
      .catch(err => {
        dispatch(addBookingFail(err));
        dispatch(createNotification({
          message: 'Failed to add your request',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

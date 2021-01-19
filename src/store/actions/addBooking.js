import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {getInitialReservations} from "./userReservations";
import { updateBookingCloseModal } from "./updateBookingModal";
import {closeModal} from "./sendPackageModal";
import {getInitialSelectableReservations} from "./selectableUserReservations";
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


export const bookingAddition = (tripId, created_by, pictures, departure_location, product_description,
  product_name, product_category, product_weight, product_size, product_value, proposed_price,
  delivery_date, destination_location, recipient_name,
recipient_phone_number, terms_conditions, user_agreement) => {
  const userProfileId = localStorage.getItem("userProfileId");
  const userId = localStorage.getItem("userId");
  const config = {
            headers: { 'content-type': 'multipart/form-data' }
          };
  const data2 = {
    tripId: tripId,
    created_by: created_by ? created_by["user"] : null,
    departure_location: departure_location,
    product_description: product_description,
    product_name: product_name,
    product_category: product_category,
    product_weight: product_weight,
    product_size: product_size,
    product_value: product_value,
    proposed_price: proposed_price,
    delivery_date: delivery_date,
    destination_location: destination_location,
    recipient_name: recipient_name,
    recipient_phone_number: recipient_phone_number,
    terms_conditions: terms_conditions,
    user_agreement: user_agreement
  };
  let data = new FormData();
  for( let key in data2 ) {
    data.append(key, data2[key]);
  }
  if(pictures) {
    Array.from(pictures).forEach(image => {
      data.append('pictures', image, image['name']);
    });
  }
  return dispatch => {
    dispatch(addBookingStart());
    axios
      .post(api_url() + "/bookings/add_request", data, config)
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(addBookingSuccess(res.data));
        dispatch(closeModal());
        dispatch(getInitialReservations(userProfileId));
        dispatch(getInitialSelectableReservations(userId, tripId));
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

export const updateBooking = (dta) => {
  const userProfileId = localStorage.getItem("userProfileId");
  const data2 = {...dta};
  let data = new FormData();
  for( let key in data2 ) {
    data.append(key, data2[key]);
  }
  if(dta['pictures']) {
    Array.from(dta['pictures']).forEach(image => {
      data.append('pictures', image, image['name']);
    });
  }
  return dispatch => {
    axios
      .put(api_url() + "/bookings/booking_request/"+dta["pk"]+"/", data)
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(createNotification({
          message: 'Your booking has been updated',
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
        dispatch(getInitialReservations(userProfileId));
        dispatch(updateBookingCloseModal());
      })
      .catch(err => {
        dispatch(createNotification({
          message: 'Failed to update your booking',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

export const bookingAdditionRedux = (tripId, created_by, pictures, departure_location, product_description,
  product_name, product_category, product_weight, product_size, product_value, proposed_price,
  delivery_date, destination_location, recipient_name,
recipient_phone_number, terms_conditions, user_agreement) => {
  const userProfileId = localStorage.getItem("userProfileId");
  const config = {
            headers: { 'content-type': 'multipart/form-data' }
          };
  const data2 = {
    tripId: tripId,
    created_by: created_by ? created_by["user"] : null,
    departure_location: departure_location,
    product_description: product_description,
    product_name: product_name,
    product_category: product_category,
    product_weight: product_weight,
    product_size: product_size,
    product_value: product_value,
    proposed_price: proposed_price,
    delivery_date: delivery_date,
    destination_location: destination_location,
    recipient_name: recipient_name,
    recipient_phone_number: recipient_phone_number,
    terms_conditions: terms_conditions,
    user_agreement: user_agreement
  };
  let data = new FormData();
  for( let key in data2 ) {
    data.append(key, data2[key]);
  }
  if(pictures) {
    Array.from(pictures).forEach(image => {
      data.append('pictures', image, image['name']);
    });
  }
  return dispatch => {
    dispatch(addBookingStart());
    axios
      .post(api_url() + "/bookings/add_request", data, config)
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(addBookingSuccess(res.data));
        dispatch(createNotification({
          message: 'Your request has been added',
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
        dispatch(getInitialReservations(userProfileId));
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


export const deleteBooking = (booking_id) => {
  const userProfileId = localStorage.getItem("userProfileId");
  const config = {
            headers: { 'content-type': 'multipart/form-data' }
          };
  return dispatch => {
    axios
      .delete(api_url() + "/bookings/booking_request/"+booking_id+"/", {}, config)
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(createNotification({
          message: 'Your request has been deleted',
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
        dispatch(getInitialReservations(userProfileId));
      })
      .catch(err => {
        dispatch(createNotification({
          message: 'Failed to delete your request',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

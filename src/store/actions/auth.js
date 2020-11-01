import axios from "axios";
import * as actionTypes from "./actionTypes";
import { backend_url } from "../../configurations";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const addTripStart = () => {
  return {
    type: actionTypes.ADD_TRIP_START
  };
};

export const addTripSuccess = (data) => {
  return {
    type: actionTypes.ADD_TRIP_SUCCESS,
  };
};

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

export const authSuccess = (token, userId, username, userProfileId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
    userProfileId: userProfileId,
    username: username
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("userProfileId");
  localStorage.removeItem("username");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(backend_url() + "/rest-auth/login/", {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res);
        console.log(res.headers);
        const token = res.data.key;
        const userId = res.data.user_id;
        const userProfileId = res.data.user_profile_id;
        const username = res.data.username;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("userProfileId", userProfileId);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token, userId, username, userProfileId));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const searchTrips = (departure_location, destination_location, travel_date) => {
  console.log("in searchTrips");
  return dispatch => {
    dispatch(authStart());
    axios
      .get(backend_url() + "/bookings/search_bookings", {
          params: {
            departure_location: departure_location,
            destination_location: destination_location,
            travel_date: travel_date,
          }})
      .then(res => {
        console.log(res.data)
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
}

export const tripAddition = (created_by, departure_location, destination_location, depart_date, comeback_date, trip_type) => {
  console.log("in tripAddition");
  return dispatch => {
    dispatch(addTripStart());
    axios
      .post(backend_url() + "/trips/add_trip", {
        created_by: created_by,
        departure_location: departure_location,
        destination_location: destination_location,
        depart_date: depart_date,
        comeback_date: comeback_date,
        trip_type: trip_type
      })
      .then(res => {
        console.log(res.data)
        dispatch(checkAuthTimeout(3600));
        dispatch(addTripSuccess(res.data));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
}

export const bookingAddition = (created_by, pictures, product_location, product_description,
  product_name, product_category, product_weight, product_size, product_value, proposed_price,
  delivery_date, pickup_address, recipient_name,
recipient_phone_number, terms_conditions, user_agreement) => {
  console.log("in bookingAddition");
  console.log(pictures);
  const config = {
            headers: { 'content-type': 'multipart/form-data' }
          };
  const data2 = {
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
      .post(backend_url() + "/bookings/add_request", data, config)
      .then(res => {
        console.log(res.data)
        dispatch(checkAuthTimeout(3600));
        dispatch(addBookingSuccess(res.data));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
}

export const authSignup = (first_name, last_name, username, email, password1, password2, terms_conditions) => {
  console.log("in authSignup");
  return dispatch => {
    dispatch(authStart());
    axios
      .post(backend_url() + "/rest-auth/registration/", {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password1: password1,
        password2: password2,
        terms_conditions: terms_conditions
      })
      .then(res => {
        const token = res.data.key;
        const userId = res.data.user_id;
        const username = res.data.username;
        const userProfileId = res.data.user_profile_id;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userProfileId", userProfileId);
        localStorage.setItem("username", username);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token, userId, username, userProfileId));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  console.log("in authCheckState");
  return dispatch => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userProfileId = localStorage.getItem("userProfileId");
    const username = localStorage.getItem("username");
    if (token === undefined) {
      dispatch(logout());
      const userId = localStorage.setItem("userId", null);
      const userProfileId = localStorage.setItem("userProfileId", null);
      const username = localStorage.setItem("username", null);
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
        const userId = localStorage.setItem("userId", null);
        const userProfileId = localStorage.setItem("userProfileId", null);
        const username = localStorage.setItem("username", null);
      } else {
        dispatch(authSuccess(token, userId, username, userProfileId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

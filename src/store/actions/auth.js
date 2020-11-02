import axios from "axios";
import * as actionTypes from "./actionTypes";
import { backend_url } from "../../configurations";
import {clearUserInfo, setUserInfo} from "./userInfo";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logoutAction = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("userProfileId");
  localStorage.removeItem("username");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const logout = expirationTime => {
  return dispatch => {
      dispatch(logoutAction());
      dispatch(clearUserInfo());
    };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
      dispatch(clearUserInfo());
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
        console.log(res.data);
        console.log(res.headers);
        const token = res.data.key;
        const userId = res.data.user_id;
        const userProfileId = res.data.user_profile_id;
        const username = res.data.username;
        const first_name = res.data.first_name;
        const last_name = res.data.last_name;
        const email = res.data.email;
        const date_joined = res.data.date_joined;
        const phone_number = res.data.phone_number;
        const profile_pic = res.data.profile_pic;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("userProfileId", userProfileId);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(setUserInfo(userId, username, userProfileId, first_name, last_name, email, date_joined, phone_number, profile_pic));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};


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
        const first_name = res.data.first_name;
        const last_name = res.data.last_name;
        const email = res.data.email;
        const date_joined = res.data.date_joined;
        const phone_number = res.data.phone_number;
        const profile_pic = res.data.profile_pic;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userProfileId", userProfileId);
        localStorage.setItem("username", username);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token, userId, username, userProfileId));
        dispatch(setUserInfo(userId, username, userProfileId, first_name, last_name, email, date_joined, phone_number, profile_pic));
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
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

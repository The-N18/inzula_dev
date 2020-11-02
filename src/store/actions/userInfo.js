import axios from "axios";
import * as actionTypes from "./actionTypes";
import { backend_url } from "../../configurations";

export const clearUserInfo = () => {
  return {
    type: actionTypes.CLEAR_USER_INFO,
    userId: null,
    userProfileId: null,
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    date_joined: null,
    phone_number: null,
    profile_pic: null
  };
};

export const setUserInfo = (userId, username, userProfileId, first_name, last_name, email, date_joined, phone_number, profile_pic) => {
  return {
    type: actionTypes.SET_USER_INFO,
    userId: userId,
    userProfileId: userProfileId,
    username: username,
    first_name: first_name,
    last_name: last_name,
    email: email,
    date_joined: date_joined,
    phone_number: phone_number,
    profile_pic: profile_pic
  };
};

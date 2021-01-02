import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url } from "../../configurations";

export const clearUserInfo = () => {
  console.log("Clear user info");
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
    profile_pic: null,
    passport_number: null,
    country: null,
    user_type: null,
    profileType: "sender",
  };
};

export const setUserInfo = (userId, username, userProfileId, first_name, last_name, email, date_joined, phone_number, profile_pic, passport_number, country, user_type) => {
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
    profile_pic: profile_pic,
    passport_number: passport_number,
    country: country,
    user_type: user_type,
    profileType: user_type,
    profileData: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      passport_number: passport_number,
      country: country,
      user_type: user_type,
      userProfileId: userProfileId,
    }
  };
};

export const toggleProfileType = (profileType) => {
  console.log("in toggleProfileType");
  return {
    type: actionTypes.TOGGLE_PROFILE_TYPE,
    profileType: profileType,
  };
};

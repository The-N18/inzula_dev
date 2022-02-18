import * as actionTypes from "./actionTypes";

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
    profile_pic: null,
    id_document: null,
    passport_number: null,
    country: null,
    user_type: null,
    sex: null,
    profileType: null,
  };
};

export const setUserInfo = (userId, username, userProfileId, first_name, last_name, email, date_joined, phone_number, profile_pic, passport_number, country, user_type, sex, id_document) => {
  // localStorage.setItem('profile_type',user_type)
  // if(updateProfile){
  //   localStorage.setItem('profile_type',user_type)
  // }

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
    id_document: id_document,
    passport_number: passport_number,
    country: country,
    user_type: user_type,
    sex: sex,
    profileType: localStorage.getItem("profile_type")?localStorage.getItem("profile_type"):user_type,
    profileData: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      passport_number: passport_number,
      id_document: id_document,
      country: country,
      user_type: user_type,
      sex: sex,
      userProfileId: userProfileId,
    }
  };
};

export const toggleProfileType = (profileType) => {
  profileType === "sender" ? localStorage.setItem("profile_type","sender"): localStorage.setItem("profile_type","carrier");
  return {
    type: actionTypes.TOGGLE_PROFILE_TYPE,
    profileType: profileType,
  };
};

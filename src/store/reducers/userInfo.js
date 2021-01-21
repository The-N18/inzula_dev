import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
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
  profileType: "sender",
  user_type: null,
  sex: null,
  profileData: {}
};

const setUserInfo = (state, action) => {
  return updateObject(state, {
    userId: action.userId,
    userProfileId: action.userProfileId,
    username: action.username,
    first_name: action.first_name,
    last_name: action.last_name,
    email: action.email,
    date_joined: action.date_joined,
    phone_number: action.phone_number,
    profile_pic: action.profile_pic,
    id_document: action.id_document,
    passport_number: action.passport_number,
    country: action.country,
    user_type: action.user_type,
    sex: action.sex,
    profileType: action.user_type,
    profileData: {
      first_name: action.first_name,
      last_name: action.last_name,
      email: action.email,
      phone_number: action.phone_number,
      id_document: action.id_document,
      passport_number: action.passport_number,
      country: action.country,
      userProfileId: action.userProfileId,
      user_type: action.user_type,
      sex: action.sex,
    }
  });
};

const toggleProfileType = (state, action) => {
  return updateObject(state, {
    profileType: action.profileType,
  });
};

const clearUserInfo = (state, action) => {
  return updateObject(state, {
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
    profileType: "sender",
    user_type: null,
    sex: null,
    profileData: {}
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return setUserInfo(state, action);
    case actionTypes.CLEAR_USER_INFO:
      return clearUserInfo(state, action);
    case actionTypes.TOGGLE_PROFILE_TYPE:
      return toggleProfileType(state, action);
    default:
      return state;
  }
};

export default reducer;

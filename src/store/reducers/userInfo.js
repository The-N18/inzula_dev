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
    profile_pic: action.profile_pic
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
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return setUserInfo(state, action);
    case actionTypes.CLEAR_USER_INFO:
      return clearUserInfo(state, action);
    default:
      return state;
  }
};

export default reducer;

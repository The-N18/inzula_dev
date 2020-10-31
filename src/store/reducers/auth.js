import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  error: null,
  loading: false,
  userId: null,
  userProfileId: null,
  username: null,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  console.log(action);
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    userProfileId: action.userProfileId,
    username: action.username,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const addTripStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const addTripSuccess = (state, action) => {
  console.log(action);
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const addBookingStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const addBookingSuccess = (state, action) => {
  console.log(action);
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.ADD_TRIP_SUCCESS:
      return addTripSuccess(state, action);
    case actionTypes.ADD_TRIP_START:
      return addTripStart(state, action);
    default:
      return state;
  }
};

export default reducer;

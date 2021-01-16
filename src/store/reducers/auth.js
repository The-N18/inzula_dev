import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  error: null,
  deleteError: null,
  loading: false,
  deleteLoading: false,
  discountText: null
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const deleteStart = (state, action) => {
  return updateObject(state, {
    deleteError: null,
    deleteLoading: true
  });
};

const authSetDiscountText = (state, action) => {
  return updateObject(state, {
    discountText: action.discountText,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false
  });
};

const signupSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const deleteSuccess = (state, action) => {
  return updateObject(state, {
    deleteError: null,
    deleteLoading: false
  });
};

const authTokenSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
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

const deleteFail = (state, action) => {
  return updateObject(state, {
    deleteError: action.error,
    deleteLoading: false
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
    case actionTypes.SIGNUP_SUCCESS:
      return signupSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.DELETE_ACCOUNT_START:
      return deleteStart(state, action);
    case actionTypes.DELETE_ACCOUNT_SUCCESS:
      return deleteSuccess(state, action);
    case actionTypes.DELETE_ACCOUNT_FAIL:
      return deleteFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_TOKEN_SUCCESS:
      return authTokenSuccess(state, action);
    case actionTypes.AUTH_SET_DISCOUNT_TEXT:
      return authSetDiscountText(state, action);
    default:
      return state;
  }
};

export default reducer;

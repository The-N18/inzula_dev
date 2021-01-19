import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
};

const verifyUserStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const verifyUserSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const verifyUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VERIFY_USER_START:
      return verifyUserStart(state, action);
    case actionTypes.VERIFY_USER_SUCCESS:
      return verifyUserSuccess(state, action);
    case actionTypes.VERIFY_USER_FAIL:
      return verifyUserFail(state, action);
    default:
      return state;
  }
};

export default reducer;

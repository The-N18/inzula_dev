import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
};

const openSignupModal = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};


const closeSignupModal = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_OPEN_MODAL:
      return openSignupModal(state, action);
    case actionTypes.SIGNUP_CLOSE_MODAL:
      return closeSignupModal(state, action);
    default:
      return state;
  }
};

export default reducer;

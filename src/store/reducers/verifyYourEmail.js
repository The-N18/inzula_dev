import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
};

const openVerifyYourEmail = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};


const closeVerifyYourEmail = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VERIFY_EMAIL_CLOSE_MODAL:
      return closeVerifyYourEmail(state, action);
    case actionTypes.VERIFY_EMAIL_OPEN_MODAL:
      return openVerifyYourEmail(state, action);
    default:
      return state;
  }
};

export default reducer;

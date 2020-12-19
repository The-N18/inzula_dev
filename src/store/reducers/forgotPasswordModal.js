import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
};

const openForgotPasswordModal = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};


const closeForgotPasswordModal = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FORGOT_PASSWORD_OPEN_MODAL:
      return openForgotPasswordModal(state, action);
    case actionTypes.FORGOT_PASSWORD_CLOSE_MODAL:
      return closeForgotPasswordModal(state, action);
    default:
      return state;
  }
};

export default reducer;

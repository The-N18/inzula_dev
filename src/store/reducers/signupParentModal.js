import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
};

const openSignupParentModal = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};


const closeSignupParentModal = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_PARENT_OPEN_MODAL:
      return openSignupParentModal(state, action);
    case actionTypes.SIGNUP_PARENT_CLOSE_MODAL:
      return closeSignupParentModal(state, action);
    default:
      return state;
  }
};

export default reducer;

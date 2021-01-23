import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  with_discount: false,
};

const openSignupModal = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const openSignupModalWithDiscount = (state, action) => {
  return updateObject(state, {
    open: true,
    with_discount: true,
  });
};


const closeSignupModal = (state, action) => {
  return updateObject(state, {
    open: false,
    with_discount: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_OPEN_MODAL:
      return openSignupModal(state, action);
    case actionTypes.SIGNUP_WITH_DISCOUNT_OPEN_MODAL:
      return openSignupModalWithDiscount(state, action);
    case actionTypes.SIGNUP_CLOSE_MODAL:
      return closeSignupModal(state, action);
    default:
      return state;
  }
};

export default reducer;

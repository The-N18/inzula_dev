import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
};

const openPaymentOptions = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const closePaymentOptions = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PAYMENT_OPTIONS_CLOSE_MODAL:
      return closePaymentOptions(state, action);
    case actionTypes.PAYMENT_OPTIONS_OPEN_MODAL:
      return openPaymentOptions(state, action);
    default:
      return state;
  }
};

export default reducer;

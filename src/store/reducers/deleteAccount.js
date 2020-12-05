import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
};

const openDeleteAccount = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};


const closeDeleteAccount = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_ACCOUNT_CLOSE_MODAL:
      return closeDeleteAccount(state, action);
    case actionTypes.DELETE_ACCOUNT_OPEN_MODAL:
      return openDeleteAccount(state, action);
    default:
      return state;
  }
};

export default reducer;

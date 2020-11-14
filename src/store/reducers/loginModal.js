import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
};

const openLoginModal = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};


const closeLoginModal = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_OPEN_MODAL:
      return openLoginModal(state, action);
    case actionTypes.LOGIN_CLOSE_MODAL:
      return closeLoginModal(state, action);
    default:
      return state;
  }
};

export default reducer;

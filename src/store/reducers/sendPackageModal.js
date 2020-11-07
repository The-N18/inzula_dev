import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
};

const openModal = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const closeModal = (state, action) => {
  return updateObject(state, {
    open: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_PACKAGE_OPEN_MODAL:
      return openModal(state, action);
    case actionTypes.SEND_PACKAGE_CLOSE_MODAL:
      return closeModal(state, action);
    default:
      return state;
  }
};

export default reducer;

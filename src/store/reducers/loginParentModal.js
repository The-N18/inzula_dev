import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
};

const openLoginParentModal = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};


const closeLoginParentModal = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_PARENT_OPEN_MODAL:
      return openLoginParentModal(state, action);
    case actionTypes.LOGIN_PARENT_CLOSE_MODAL:
      return closeLoginParentModal(state, action);
    default:
      return state;
  }
};

export default reducer;

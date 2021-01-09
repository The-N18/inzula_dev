import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
};

const openCompleteProfileModal = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const closeCompleteProfileModal = (state, action) => {
  return updateObject(state, {
    open: false,
    tripId: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COMPLETE_PROFILE_OPEN_MODAL:
      return openCompleteProfileModal(state, action);
    case actionTypes.COMPLETE_PROFILE_CLOSE_MODAL:
      return closeCompleteProfileModal(state, action);
    default:
      return state;
  }
};

export default reducer;

import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  completeProfile: false,
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

const setCompleteProfileTrue = (state, action) => {
  return updateObject(state, {
    completeProfile: true,
  });
};

const setCompleteProfileFalse = (state, action) => {
  return updateObject(state, {
    completeProfile: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COMPLETE_PROFILE_OPEN_MODAL:
      return openCompleteProfileModal(state, action);
    case actionTypes.COMPLETE_PROFILE_CLOSE_MODAL:
      return closeCompleteProfileModal(state, action);
    case actionTypes.COMPLETE_PROFILE_TRUE:
      return setCompleteProfileTrue(state, action);
    case actionTypes.COMPLETE_PROFILE_FALSE:
      return setCompleteProfileFalse(state, action);
    default:
      return state;
  }
};


export default reducer;

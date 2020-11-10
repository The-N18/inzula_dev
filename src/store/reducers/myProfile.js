import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  activeIndex: 1
};

const setActiveIndex = (state, action) => {
  return updateObject(state, {
    activeIndex: action.activeIndex,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MYPROFILE_SET_ACTIVE_INDEX:
      return setActiveIndex(state, action);
    default:
      return state;
  }
};

export default reducer;

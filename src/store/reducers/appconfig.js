import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  bookings: [],
};

const searchStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const searchSuccess = (state, action) => {
  console.log(action);
  return updateObject(state, {
    bookings: action.bookings,
    error: null,
    loading: false
  });
};

const searchFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_START:
      return searchStart(state, action);
    case actionTypes.SEARCH_SUCCESS:
      return searchSuccess(state, action);
    case actionTypes.SEARCH_FAIL:
      return searchFail(state, action);
    default:
      return state;
  }
};

export default reducer;

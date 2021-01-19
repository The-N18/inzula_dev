import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  api_been_called: false,
  bookings: [],
  next_url: null,
  count: null,
};

const searchStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const searchSuccess = (state, action) => {
  return updateObject(state, {
    bookings: state.bookings.concat(action.bookings),
    api_been_called: true,
    error: null,
    loading: false,
    next_url: action.next_url,
    count: action.count
  });
};

const searchSuccessOverride = (state, action) => {
  return updateObject(state, {
    bookings: action.bookings,
    api_been_called: true,
    error: null,
    loading: false,
    next_url: action.next_url,
    count: action.count
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
    case actionTypes.SEARCH_BOOKINGS_START:
      return searchStart(state, action);
    case actionTypes.SEARCH_BOOKINGS_SUCCESS:
      return searchSuccess(state, action);
    case actionTypes.SEARCH_BOOKINGS_SUCCESS_OVERRIDE:
      return searchSuccessOverride(state, action);
    case actionTypes.SEARCH_BOOKINGS_FAIL:
      return searchFail(state, action);
    default:
      return state;
  }
};

export default reducer;

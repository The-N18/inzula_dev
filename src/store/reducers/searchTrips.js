import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  trips: [],
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
  console.log(action);
  return updateObject(state, {
    trips: state.trips.concat(action.trips),
    error: null,
    loading: false,
    next_url: action.next_url,
    count: action.count
  });
};

const searchSuccessOverride = (state, action) => {
  console.log(action);
  return updateObject(state, {
    trips: action.trips,
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
    case actionTypes.SEARCH_TRIPS_START:
      return searchStart(state, action);
    case actionTypes.SEARCH_TRIPS_SUCCESS:
      return searchSuccess(state, action);
    case actionTypes.SEARCH_TRIPS_SUCCESS_OVERRIDE:
      return searchSuccessOverride(state, action);
    case actionTypes.SEARCH_TRIPS_FAIL:
      return searchFail(state, action);
    default:
      return state;
  }
};

export default reducer;

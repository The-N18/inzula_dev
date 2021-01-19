import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  trips: [],
  next_url: null,
  count: null,
};

const getTripsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getTripsSuccess = (state, action) => {
  return updateObject(state, {
    trips: state.trips.concat(action.trips),
    error: null,
    loading: false,
    next_url: action.next_url,
    count: action.count
  });
};

const getInitialTripsSuccess = (state, action) => {
  return updateObject(state, {
    trips: action.trips,
    error: null,
    loading: false,
    next_url: action.next_url,
    count: action.count
  });
};

const getTripsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TRIPS_START:
      return getTripsStart(state, action);
    case actionTypes.GET_TRIPS_SUCCESS:
      return getTripsSuccess(state, action);
    case actionTypes.GET_INITIAL_TRIPS_SUCCESS:
      return getInitialTripsSuccess(state, action);
    case actionTypes.GET_TRIPS_FAIL:
      return getTripsFail(state, action);
    default:
      return state;
  }
};

export default reducer;

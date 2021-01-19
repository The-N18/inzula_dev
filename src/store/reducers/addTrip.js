import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  trip_type_check: "one_way_trip",
};

const addTripStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const addTripSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const addTripFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const toggleCheck = (state, action) => {
  return updateObject(state, {
    trip_type_check: action.trip_type_check
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TRIP_SUCCESS:
      return addTripSuccess(state, action);
    case actionTypes.ADD_TRIP_START:
      return addTripStart(state, action);
    case actionTypes.ADD_TRIP_FAIL:
      return addTripFail(state, action);
    case actionTypes.ADD_TRIP_TOGGLE_CHECK:
      return toggleCheck(state, action);
    default:
      return state;
  }
};

export default reducer;

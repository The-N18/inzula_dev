import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
};

const addTripStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const addTripSuccess = (state, action) => {
  console.log(action);
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


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TRIP_SUCCESS:
      return addTripSuccess(state, action);
    case actionTypes.ADD_TRIP_START:
      return addTripStart(state, action);
    case actionTypes.ADD_TRIP_FAIL:
      return addTripFail(state, action);
    default:
      return state;
  }
};

export default reducer;

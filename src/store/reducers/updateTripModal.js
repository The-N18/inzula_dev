import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  error: null,
  loading: false,
  tripInfo: {},
  pk: null
};

const updateTripOpenModal = (state, action) => {
  return updateObject(state, {
    open: true,
    tripInfo: action.tripInfo,
    pk: action.pk
  });
};


const updateTripCloseModal = (state, action) => {
  return updateObject(state, {
    open: false,
    pk: null,
    tripInfo: {}
  });
};

const updateTripStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const updateTripSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const updateTripFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TRIP_SUCCESS:
      return updateTripSuccess(state, action);
    case actionTypes.UPDATE_TRIP_START:
      return updateTripStart(state, action);
    case actionTypes.UPDATE_TRIP_FAIL:
      return updateTripFail(state, action);
    case actionTypes.UPDATE_TRIP_OPEN_MODAL:
      return updateTripOpenModal(state, action);
    case actionTypes.UPDATE_TRIP_CLOSE_MODAL:
      return updateTripCloseModal(state, action);
    default:
      return state;
  }
};

export default reducer;

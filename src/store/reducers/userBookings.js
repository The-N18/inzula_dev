import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  reservations: [],
  next_url: null,
  count: null,
};

const getReservationsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getReservationsSuccess = (state, action) => {
  return updateObject(state, {
    reservations: state.reservations.concat(action.reservations),
    error: null,
    loading: false,
    next_url: action.next_url,
    count: action.count
  });
};

const getInitialReservationsSuccess = (state, action) => {
  return updateObject(state, {
    reservations: action.reservations,
    error: null,
    loading: false,
    next_url: action.next_url,
    count: action.count
  });
};

const getReservationsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_BOOKINGS_START:
      return getReservationsStart(state, action);
    case actionTypes.GET_USER_BOOKINGS_SUCCESS:
      return getReservationsSuccess(state, action);
    case actionTypes.GET_INITIAL_USER_BOOKINGS_SUCCESS:
      return getInitialReservationsSuccess(state, action);
    case actionTypes.GET_USER_BOOKINGS_FAIL:
      return getReservationsFail(state, action);
    default:
      return state;
  }
};

export default reducer;

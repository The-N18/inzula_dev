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
  console.log(action);
  return updateObject(state, {
    reservations: state.reservations.concat(action.reservations),
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
    case actionTypes.GET_RESERVATIONS_START:
      return getReservationsStart(state, action);
    case actionTypes.GET_RESERVATIONS_SUCCESS:
      return getReservationsSuccess(state, action);
    case actionTypes.GET_RESERVATIONS_FAIL:
      return getReservationsFail(state, action);
    default:
      return state;
  }
};

export default reducer;

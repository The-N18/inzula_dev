import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  error: null,
  loading: false,
  bookingInfo: {},
  pk: null
};

const updateBookingOpenModal = (state, action) => {
  return updateObject(state, {
    open: true,
    bookingInfo: action.bookingInfo,
    pk: action.pk
  });
};


const updateBookingCloseModal = (state, action) => {
  return updateObject(state, {
    open: false,
    pk: null,
    bookingInfo: {}
  });
};

const updateBookingStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const updateBookingSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const updateBookingFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_BOOKING_SUCCESS:
      return updateBookingSuccess(state, action);
    case actionTypes.UPDATE_BOOKING_START:
      return updateBookingStart(state, action);
    case actionTypes.UPDATE_BOOKING_FAIL:
      return updateBookingFail(state, action);
    case actionTypes.UPDATE_BOOKING_OPEN_MODAL:
      return updateBookingOpenModal(state, action);
    case actionTypes.UPDATE_BOOKING_CLOSE_MODAL:
      return updateBookingCloseModal(state, action);
    default:
      return state;
  }
};

export default reducer;

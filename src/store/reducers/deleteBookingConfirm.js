import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  bookingId: 0
};

const openDeleteBookingConfirm = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const setBookingDeleteBookingConfirm = (state, action) => {
  return updateObject(state, {
    bookingId: action.bookingId,
  });
};


const closeDeleteBookingConfirm = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_BOOKING_CONFIRM_SET_BOOKING:
      return setBookingDeleteBookingConfirm(state, action);
    case actionTypes.DELETE_BOOKING_CONFIRM_CLOSE_MODAL:
      return closeDeleteBookingConfirm(state, action);
    case actionTypes.DELETE_BOOKING_CONFIRM_OPEN_MODAL:
      return openDeleteBookingConfirm(state, action);
    default:
      return state;
  }
};

export default reducer;

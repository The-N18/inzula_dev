import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  bookingId: 0
};

const openValidateBooking = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const setBookingValidateBooking = (state, action) => {
  return updateObject(state, {
    bookingId: action.bookingId,
  });
};


const closeValidateBooking = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VALIDATE_BOOKING_SET_BOOKING:
      return setBookingValidateBooking(state, action);
    case actionTypes.VALIDATE_BOOKING_CLOSE_MODAL:
      return closeValidateBooking(state, action);
    case actionTypes.VALIDATE_BOOKING_OPEN_MODAL:
      return openValidateBooking(state, action);
    default:
      return state;
  }
};

export default reducer;

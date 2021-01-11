import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  bookingId: 0
};

const openCancelBooking = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const setBookingCancelBooking = (state, action) => {
  return updateObject(state, {
    bookingId: action.bookingId,
  });
};


const closeCancelBooking = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CANCEL_BOOKING_SET_BOOKING:
      return setBookingCancelBooking(state, action);
    case actionTypes.CANCEL_BOOKING_CLOSE_MODAL:
      return closeCancelBooking(state, action);
    case actionTypes.CANCEL_BOOKING_OPEN_MODAL:
      return openCancelBooking(state, action);
    default:
      return state;
  }
};

export default reducer;

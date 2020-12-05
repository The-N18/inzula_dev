import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  bookingId: 0
};

const openDeclineBooking = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const setBookingDeclineBooking = (state, action) => {
  return updateObject(state, {
    bookingId: action.bookingId,
  });
};


const closeDeclineBooking = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DECLINE_BOOKING_SET_BOOKING:
      return setBookingDeclineBooking(state, action);
    case actionTypes.DECLINE_BOOKING_CLOSE_MODAL:
      return closeDeclineBooking(state, action);
    case actionTypes.DECLINE_BOOKING_OPEN_MODAL:
      return openDeclineBooking(state, action);
    default:
      return state;
  }
};

export default reducer;

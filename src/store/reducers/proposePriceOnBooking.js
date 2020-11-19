import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  bookingId: 0
};

const openProposePriceOnBooking = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const setBookingRequestId = (state, action) => {
  return updateObject(state, {
    bookingId: action.bookingId,
  });
};


const closeProposePriceOnBooking = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROPOSE_PRICE_ON_BOOKING_SET_ID:
      return setBookingRequestId(state, action);
    case actionTypes.PROPOSE_PRICE_ON_BOOKING_CLOSE_MODAL:
      return closeProposePriceOnBooking(state, action);
    case actionTypes.PROPOSE_PRICE_ON_BOOKING_OPEN_MODAL:
      return openProposePriceOnBooking(state, action);
    default:
      return state;
  }
};

export default reducer;

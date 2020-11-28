import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  bookingId: null,
  tripId: null,
  userId: null,
  price: null,
  paymentAmountConfirmed: false
};

const openConfirmBookingPrice = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const setBookingRequestInfo = (state, action) => {
  return updateObject(state, {
    bookingId: action.bookingId,
    tripId: action.tripId,
    price: action.price,
    userId: action.userId,
    paymentAmountConfirmed: action.paymentAmountConfirmed
  });
};

const setPrice = (state, action) => {
  return updateObject(state, {
    price: action.price,
  });
};


const closeConfirmBookingPrice = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CONFIRM_BOOKING_PRICE_SET_INFO:
      return setBookingRequestInfo(state, action);
    case actionTypes.CONFIRM_BOOKING_PRICE_SET_PRICE:
      return setPrice(state, action);
    case actionTypes.CONFIRM_BOOKING_PRICE_CLOSE_MODAL:
      return closeConfirmBookingPrice(state, action);
    case actionTypes.CONFIRM_BOOKING_PRICE_OPEN_MODAL:
      return openConfirmBookingPrice(state, action);
    default:
      return state;
  }
};

export default reducer;

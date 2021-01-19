import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  tripId: null,
  selected: [],
};

const openModal = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const selectBooking = (state, action) => {
  return updateObject(state, {
    selected: action.selected,
  });
};

const openModalSelectReservations = (state, action) => {
  return updateObject(state, {
    open: true,
    tripId: action.tripId
  });
};


const closeModal = (state, action) => {
  return updateObject(state, {
    open: false,
    tripId: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_RESERVATIONS_OPEN_MODAL:
      return openModal(state, action);
    case actionTypes.SELECT_RESERVATIONS_CLOSE_MODAL:
      return closeModal(state, action);
    case actionTypes.SELECT_RESERVATIONS_OPEN_MODAL_FOR_TRIP:
      return openModalSelectReservations(state, action);
    case actionTypes.MODAL_SELECT_RESERVATION:
      return selectBooking(state, action);
    default:
      return state;
  }
};

export default reducer;

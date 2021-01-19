import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  tripId: null,
};

const openModal = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const openModalForTrip = (state, action) => {
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
    case actionTypes.SEND_PACKAGE_OPEN_MODAL:
      return openModal(state, action);
    case actionTypes.SEND_PACKAGE_CLOSE_MODAL:
      return closeModal(state, action);
    case actionTypes.SEND_PACKAGE_OPEN_MODAL_FOR_TRIP:
      return openModalForTrip(state, action);
    default:
      return state;
  }
};

export default reducer;

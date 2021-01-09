import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
};

const openAddTripModal = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const closeAddTripModal = (state, action) => {
  return updateObject(state, {
    open: false,
    tripId: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TRIP_OPEN_MODAL:
      return openAddTripModal(state, action);
    case actionTypes.ADD_TRIP_CLOSE_MODAL:
      return closeAddTripModal(state, action);
    default:
      return state;
  }
};

export default reducer;

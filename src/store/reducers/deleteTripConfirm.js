import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  tripId: 0
};

const openDeleteTripConfirm = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const setTripDeleteTripConfirm = (state, action) => {
  return updateObject(state, {
    tripId: action.tripId,
  });
};


const closeDeleteTripConfirm = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_TRIP_CONFIRM_SET_TRIP:
      return setTripDeleteTripConfirm(state, action);
    case actionTypes.DELETE_TRIP_CONFIRM_CLOSE_MODAL:
      return closeDeleteTripConfirm(state, action);
    case actionTypes.DELETE_TRIP_CONFIRM_OPEN_MODAL:
      return openDeleteTripConfirm(state, action);
    default:
      return state;
  }
};

export default reducer;

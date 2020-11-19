import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  initialValues: {}
};

const setInitialValues = (state, action) => {
  return updateObject(state, {
    initialValues: {
      departure_location: action.departure_location,
      destination_location: action.destination_location,
      travel_date: action.travel_date,
    }
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_BOOKINGS_PAGE_SET_INITIAL:
      return setInitialValues(state, action);
    default:
      return state;
  }
};

export default reducer;

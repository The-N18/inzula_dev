import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  error: null,
  loading: false,
  proposalTrips: [],
  proposedTripId: null
};

const openSelectProposalTrip = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const closeSelectProposalTrip = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const getTripsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getTripsSuccess = (state, action) => {
  return updateObject(state, {
    proposalTrips: action.proposalTrips,
    error: null,
    loading: false,
  });
};

const selectSingleTrip = (state, action) => {
  return updateObject(state, {
    proposedTripId: action.proposedTripId,
  });
};

const getTripsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_PROPOSAL_TRIP_MODAL_CLOSE_MODAL:
      return closeSelectProposalTrip(state, action);
    case actionTypes.SELECT_PROPOSAL_TRIP_MODAL_OPEN_MODAL:
      return openSelectProposalTrip(state, action);
    case actionTypes.SELECT_PROPOSAL_TRIP_MODAL_GET_TRIPS_START:
      return getTripsStart(state, action);
    case actionTypes.SELECT_PROPOSAL_TRIP_MODAL_GET_TRIPS_SUCCESS:
      return getTripsSuccess(state, action);
    case actionTypes.SELECT_PROPOSAL_TRIP_MODAL_GET_TRIPS_FAIL:
      return getTripsFail(state, action);
    case actionTypes.SELECT_PROPOSAL_TRIP_MODAL_SELECT_TRIP:
      return selectSingleTrip(state, action);
    default:
      return state;
  }
};


export default reducer;

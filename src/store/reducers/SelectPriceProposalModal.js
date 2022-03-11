import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  error: null,
  loading: false,
  priceProposals: [],
  selectedProposalId: null,
  bookingId: null
};

const openSelectPriceProposal = (state, action) => {
  return updateObject(state, {
    open: true,
    bookingId: action.bookingId
  });
};

const closeSelectPriceProposal = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const getProposalsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getProposalsSuccess = (state, action) => {
  return updateObject(state, {
    priceProposals: action.priceProposals,
    error: null,
    loading: false,
  });
};

const selectSingleProposal = (state, action) => {
  return updateObject(state, {
    selectedProposalId: action.selectedProposalId,
  });
};

const getProposalsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_PRICE_PROPOSAL_MODAL_CLOSE_MODAL:
      return closeSelectPriceProposal(state, action);
    case actionTypes.SELECT_PRICE_PROPOSAL_MODAL_OPEN_MODAL:
      return openSelectPriceProposal(state, action);
    case actionTypes.SELECT_PRICE_PROPOSAL_MODAL_GET_PROPOSALS_START:
      return getProposalsStart(state, action);
    case actionTypes.SELECT_PRICE_PROPOSAL_MODAL_GET_PROPOSALS_SUCCESS:
      return getProposalsSuccess(state, action);
    case actionTypes.SELECT_PRICE_PROPOSAL_MODAL_GET_PROPOSALS_FAIL:
      return getProposalsFail(state, action);
    case actionTypes.SELECT_PRICE_PROPOSAL_MODAL_SELECT_PROPOSAL:
      return selectSingleProposal(state, action);
    default:
      return state;
  }
};

export default reducer;

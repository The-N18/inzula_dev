import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  // priceProposalId: 0,
  bookingId: null,
  isCancle: false
};

const openCanclePriceProposalConfirm = (state, action) => {
  console.log("openCanclePriceProposalConfirm isCancle2",action.isCancle)
  return updateObject(state, {
    open: true,
    isCancle: action.isCancle
  });
};

// const setPriceProposalId = (state, action) => {
//   return updateObject(state, {
//     priceProposalId: action.priceProposalId,
//   });
// };

const setCancleProposalBookingId = (state, action) => {
  return updateObject(state, {
    bookingId : action.bookingId,
  });
};


const closeCanclePriceProposalConfirm = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.CANCLE_PRICE_PROPOSAL_CONFIRM_SET_PRICE_PROPOSAL_ID:
    //   return setPriceProposalId(state, action);
    case actionTypes.CANCLE_PRICE_PROPOSAL_CONFIRM_SET_BOOKING_ID:
      return setCancleProposalBookingId(state, action);
    case actionTypes.CANCLE_PRICE_PROPOSAL_CONFIRM_CLOSE_MODAL:
      return closeCanclePriceProposalConfirm(state, action);
    case actionTypes.CANCLE_PRICE_PROPOSAL_CONFIRM_OPEN_MODAL:
      return openCanclePriceProposalConfirm(state, action);
    default:
      return state;
  }
};

export default reducer;

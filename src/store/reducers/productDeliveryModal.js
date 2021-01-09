import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
};

const openProductDeliveryModal = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};


const closeProductDeliveryModal = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_DELIVERY_MODAL_CLOSE_MODAL:
      return closeProductDeliveryModal(state, action);
    case actionTypes.PRODUCT_DELIVERY_MODAL_OPEN_MODAL:
      return openProductDeliveryModal(state, action);
    default:
      return state;
  }
};

export default reducer;

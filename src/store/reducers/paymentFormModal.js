import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  loading: false,
  cardRegistrationData: null,
  naturalUserId: null
};

const openPaymentFormModal = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const startPayProcess = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const endPayProcess = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const closePaymentFormModal = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};

const setCardRegistrationData = (state, action) => {
  return updateObject(state, {
    cardRegistrationData: action.cardRegistrationData,
  });
};

const setNaturalUserId = (state, action) => {
  return updateObject(state, {
    naturalUserId: action.naturalUserId,
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PAYMENT_FORM_CLOSE_MODAL:
      return closePaymentFormModal(state, action);
    case actionTypes.PAYMENT_FORM_START_PAY:
      return startPayProcess(state, action);
    case actionTypes.PAYMENT_FORM_END_PAY:
      return endPayProcess(state, action);
    case actionTypes.PAYMENT_FORM_OPEN_MODAL:
      return openPaymentFormModal(state, action);
    case actionTypes.SET_CARD_REGISTRATION_DATA:
      return setCardRegistrationData(state, action);
    case actionTypes.SET_NATURAL_USER_ID:
      return setNaturalUserId(state, action);
    default:
      return state;
  }
};

export default reducer;

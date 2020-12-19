import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  max_amt: "",
  error: null,
  loading: false,
  cashout_error: null,
  cashout_loading: false,
};

const getMaxPayoutStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getMaxPayoutSuccess = (state, action) => {
  return updateObject(state, {
    max_amt: action.max_amt,
    error: null,
    loading: false,
  });
};

const getMaxPayoutFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getCashoutStart = (state, action) => {
  return updateObject(state, {
    cashout_error: null,
    cashout_loading: true
  });
};

const getCashoutSuccess = (state, action) => {
  return updateObject(state, {
    cashout_error: null,
    cashout_loading: false,
  });
};

const getCashoutFail = (state, action) => {
  return updateObject(state, {
    cashout_error: action.error,
    cashout_loading: false
  });
};

const openBankAccountFormModal = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const closeBankAccountFormModal = (state, action) => {
  return updateObject(state, {
    open: false,
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BANK_ACCOUNT_FORM_CLOSE_MODAL:
      return closeBankAccountFormModal(state, action);
    case actionTypes.BANK_ACCOUNT_FORM_OPEN_MODAL:
      return openBankAccountFormModal(state, action);
    case actionTypes.BANK_ACCOUNT_FORM_GET_MAX_FUNDS_START:
      return getMaxPayoutStart(state, action);
    case actionTypes.BANK_ACCOUNT_FORM_GET_MAX_FUNDS_SUCCESS:
      return getMaxPayoutSuccess(state, action);
    case actionTypes.BANK_ACCOUNT_FORM_GET_MAX_FUNDS_FAIL:
      return getMaxPayoutFail(state, action);
    case actionTypes.BANK_ACCOUNT_FORM_GET_CASHOUT_START:
      return getCashoutStart(state, action);
    case actionTypes.BANK_ACCOUNT_FORM_GET_CASHOUT_SUCCESS:
      return getCashoutSuccess(state, action);
    case actionTypes.BANK_ACCOUNT_FORM_GET_CASHOUT_FAIL:
      return getCashoutFail(state, action);
    default:
      return state;
  }
};

export default reducer;

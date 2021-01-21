import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  transactions: [],
  next_url: null,
  count: null,
};

const getTransactionsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getTransactionsSuccess = (state, action) => {
  return updateObject(state, {
    transactions: state.transactions.concat(action.transactions),
    error: null,
    loading: false,
    next_url: action.next_url,
    count: action.count
  });
};

const getInitialTransactionsSuccess = (state, action) => {
  return updateObject(state, {
    transactions: action.transactions,
    error: null,
    loading: false,
    next_url: action.next_url,
    count: action.count
  });
};

const getTransactionsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WITHDRAWAL_TRANSACTIONS_START:
      return getTransactionsStart(state, action);
    case actionTypes.GET_WITHDRAWAL_TRANSACTIONS_SUCCESS:
      return getTransactionsSuccess(state, action);
    case actionTypes.GET_INITIAL_WITHDRAWAL_TRANSACTIONS_SUCCESS:
      return getInitialTransactionsSuccess(state, action);
    case actionTypes.GET_WITHDRAWAL_TRANSACTIONS_FAIL:
      return getTransactionsFail(state, action);
    default:
      return state;
  }
};

export default reducer;

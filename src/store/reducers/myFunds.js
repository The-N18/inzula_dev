import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  funds: "",
};

const getFundsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getFundsSuccess = (state, action) => {
  return updateObject(state, {
    funds: action.funds,
    error: null,
    loading: false,
  });
};

const getFundsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FUNDS_START:
      return getFundsStart(state, action);
    case actionTypes.GET_FUNDS_SUCCESS:
      return getFundsSuccess(state, action);
    case actionTypes.GET_FUNDS_FAIL:
      return getFundsFail(state, action);
    default:
      return state;
  }
};

export default reducer;

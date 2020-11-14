import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  alerts: [],
  next_url: null,
  count: null,
};

const getAlertsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAlertsSuccess = (state, action) => {
  console.log(action);
  return updateObject(state, {
    alerts: state.alerts.concat(action.alerts),
    error: null,
    loading: false,
    next_url: action.next_url,
    count: action.count
  });
};

const getAlertsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALERTS_START:
      return getAlertsStart(state, action);
    case actionTypes.GET_ALERTS_SUCCESS:
      return getAlertsSuccess(state, action);
    case actionTypes.GET_ALERTS_FAIL:
      return getAlertsFail(state, action);
    default:
      return state;
  }
};

export default reducer;

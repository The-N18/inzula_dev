import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  notifs: [],
  next_url: null,
  count: null,
};

const getNotifsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getNotifsSuccess = (state, action) => {
  return updateObject(state, {
    notifs: state.notifs.concat(action.notifs),
    error: null,
    loading: false,
    next_url: action.next_url,
    count: action.count
  });
};

const getInitialNotifsSuccess = (state, action) => {
  return updateObject(state, {
    notifs: action.notifs,
    error: null,
    loading: false,
    next_url: action.next_url,
    count: action.count
  });
};

const getNotifsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CARRIER_NOTIFS_START:
      return getNotifsStart(state, action);
    case actionTypes.GET_CARRIER_NOTIFS_SUCCESS:
      return getNotifsSuccess(state, action);
    case actionTypes.GET_INITIAL_CARRIER_NOTIFS_SUCCESS:
      return getInitialNotifsSuccess(state, action);
    case actionTypes.GET_CARRIER_NOTIFS_FAIL:
      return getNotifsFail(state, action);
    default:
      return state;
  }
};

export default reducer;

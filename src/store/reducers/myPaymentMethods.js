import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  cards: [],
};

const getCardsStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getCardsSuccess = (state, action) => {
  return updateObject(state, {
    cards: action.cards,
    error: null,
    loading: false,
  });
};

const getCardsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PAYMENT_METHODS_START:
      return getCardsStart(state, action);
    case actionTypes.GET_PAYMENT_METHODS_SUCCESS:
      return getCardsSuccess(state, action);
    case actionTypes.GET_PAYMENT_METHODS_FAIL:
      return getCardsFail(state, action);
    default:
      return state;
  }
};

export default reducer;

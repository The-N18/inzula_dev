import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  open: false,
  error: null,
  loading: false,
  cards: [],
  cardId: null
};

const openSelectCreditCard = (state, action) => {
  return updateObject(state, {
    open: true,
  });
};

const closeSelectCreditCard = (state, action) => {
  return updateObject(state, {
    open: false,
  });
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

const selectSingleCard = (state, action) => {
  return updateObject(state, {
    cardId: action.cardId,
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
    case actionTypes.SELECT_CREDIT_CARD_MODAL_CLOSE_MODAL:
      return closeSelectCreditCard(state, action);
    case actionTypes.SELECT_CREDIT_CARD_MODAL_OPEN_MODAL:
      return openSelectCreditCard(state, action);
    case actionTypes.SELECT_CREDIT_CARD_MODAL_GET_CARDS_START:
      return getCardsStart(state, action);
    case actionTypes.SELECT_CREDIT_CARD_MODAL_GET_CARDS_SUCCESS:
      return getCardsSuccess(state, action);
    case actionTypes.SELECT_CREDIT_CARD_MODAL_GET_CARDS_FAIL:
      return getCardsFail(state, action);
    case actionTypes.SELECT_CREDIT_CARD_MODAL_SELECT_CARD:
      return selectSingleCard(state, action);
    default:
      return state;
  }
};

export default reducer;

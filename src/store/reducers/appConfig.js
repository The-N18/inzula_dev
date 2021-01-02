import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  lang: "fr"
};

const setLang = (state, action) => {
  return updateObject(state, {
    lang: action.lang,
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LANG:
      return setLang(state, action);
    default:
      return state;
  }
};

export default reducer;

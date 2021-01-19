import * as actionTypes from "./actionTypes";

export const setActiveIndex = (activeIndex) => {
  return {
    type: actionTypes.USER_FINANCE_SET_ACTIVE_INDEX,
    activeIndex: activeIndex
  };
};

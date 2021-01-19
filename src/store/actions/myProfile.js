import * as actionTypes from "./actionTypes";

export const setActiveIndex = (activeIndex) => {
  return {
    type: actionTypes.MYPROFILE_SET_ACTIVE_INDEX,
    activeIndex: activeIndex
  };
};

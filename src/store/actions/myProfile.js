import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url } from "../../configurations";

export const setActiveIndex = (activeIndex) => {
  return {
    type: actionTypes.MYPROFILE_SET_ACTIVE_INDEX,
    activeIndex: activeIndex
  };
};

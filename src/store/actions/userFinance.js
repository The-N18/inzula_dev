import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url } from "../../configurations";

export const setActiveIndex = (activeIndex) => {
  return {
    type: actionTypes.USER_FINANCE_SET_ACTIVE_INDEX,
    activeIndex: activeIndex
  };
};

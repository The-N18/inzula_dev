import React from "react";
import axios from "axios";
import * as actionTypes from "./actionTypes";
import {FormattedMessage} from 'react-intl'
import {createNotification} from 'react-redux-notify';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const setLang = (lang) => {
  return {
    type: actionTypes.SET_LANG,
    lang: lang,
  };
};

export const createNotif = (key, default_text, type) => {
  return dispatch => {
    const msg = (<FormattedMessage
      id={key}
      defaultMessage={default_text}
    />);
    dispatch(createNotification({
      message: msg,
      type: type,
      duration: 10000,
      canDismiss: true,
    }));
  };
};

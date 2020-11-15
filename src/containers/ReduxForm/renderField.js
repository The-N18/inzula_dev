import React from "react";
import PropTypes from "prop-types";
import {Field, reduxForm} from 'redux-form';

export const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    {/*<label>{label}</label>*/}
    <div>
      <input {...input} placeholder={label} type={type} className={"custom-field"}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

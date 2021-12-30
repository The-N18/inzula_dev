import React, {useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {Field, reduxForm} from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList'
import SelectList from 'react-widgets/lib/SelectList'
import Multiselect from 'react-widgets/lib/Multiselect'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment';
import momentLocalizer from "react-widgets-moment"; 
// import 'react-widgets/dist/css/react-widgets.css';
import './fields.css';
// import 'react-select/dist/react-select.css';
import Async from 'react-select/async';
import { api_url } from "../../configurations";
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
// import 'react-phone-number-input/style.css';


moment.locale('en');
momentLocalizer();

export const renderPhoneNumber = ({ input: { value, onChange }, meta: { touched, error, warning } }) => {
  return (
    <PhoneInput
      flags={flags}
      value={value.toString()}
      onChange={onChange}
      error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'} />
  )
}


export const renderField = ({ input, placeholder, type, disabled, meta: { touched, error, warning } }) => (

  <div className="form-group">
    <input {...input} type={type} placeholder={placeholder} disabled={disabled} />
    {touched && ((error && <span className={"error-on-input"}>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

export const renderFieldWithLabel = ({ input, label, type, disabled, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className={"custom-field"} disabled={disabled}/>
      {touched && ((error && <span className={"error-on-input"}>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export const colors = [ { color: 'Red', value: 'ff0000' },
  { color: 'Green', value: '00ff00' },
  { color: 'Blue', value: '0000ff' } ]

export const renderDropdownList = ({ input, data, valueField, textField, meta: { touched, error, warning } }) =>
  <div>
  <DropdownList {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange} />
  {touched && ((error && <span className={"error-on-input"}>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>

export const renderMultiselect = ({ input, data, valueField, textField, meta: { touched, error, warning } }) =>
  <div>
    <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />
  {touched && ((error && <span className={"error-on-input"}>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>

export const renderSelectList = ({ input, data }) =>
  <SelectList {...input}
    onBlur={() => input.onBlur()}
    data={data} />


  const getCities = (name) => {
    return axios
      .get(api_url() + "/user/city?label="+name)
      .then(res => {
        return res.data["results"];
      })
      .catch(err => {
        return [];
      });
  };


export const renderCitiesList = ({ input, className, data, label, meta: { touched, error, warning }}) => {
  console.log("IN RENDERCITIESLIST",input['name'],className)
  return <div>
            <Async
            clearValue
            name={input['name']}
            value={input['value']}
            className={className}
            classNamePrefix = "react-select"
            placeholder={label}
            onBlur={() => input.onBlur()}
            onChange={input.onChange}
            loadOptions={getCities}/>
            {touched && ((error && <span className={"error-on-input"}>{error}</span>) || (warning && <span>{warning}</span>))}
          </div>
}


  export const renderDateTimePicker = ({ input: { onChange, value }, label, showTime, min, meta: { touched, error, warning } }) => {
    return (<div>
      <div>
        <label>{label}</label>
        <DateTimePicker
        placeholder="Date de départ"
        dropUp={true}
      onChange={onChange}
      format="YYYY-MM-DD"
      time={showTime}
      min={min}
      value={!value ? null : value}
    />
  {touched && ((error && <span className={"error-on-input"}>{error}</span>) || (warning && <span>{warning}</span>))}
</div></div>);
  }

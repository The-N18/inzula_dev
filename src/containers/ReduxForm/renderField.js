import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {Field, reduxForm} from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList'
import SelectList from 'react-widgets/lib/SelectList'
import Multiselect from 'react-widgets/lib/Multiselect'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment';
import momentLocalizer from "react-widgets-moment";
import 'react-widgets/dist/css/react-widgets.css';
// import 'react-select/dist/react-select.css';
import Async from 'react-select/async';
import { api_url } from "../../configurations";

moment.locale('en');
momentLocalizer();


export const renderField = ({ input, label, type, disabled, meta: { touched, error, warning } }) => (
  <div>
    {/*<label>{label}</label>*/}
    <div>
      <input {...input} placeholder={label} type={type} className={"custom-field"} disabled={disabled}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export const colors = [ { color: 'Red', value: 'ff0000' },
  { color: 'Green', value: '00ff00' },
  { color: 'Blue', value: '0000ff' } ]

export const renderDropdownList = ({ input, data, valueField, textField }) =>
  <DropdownList {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange} />

export const renderMultiselect = ({ input, data, valueField, textField }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />

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


export const renderCitiesList = ({ input, data }) => {
  console.log(input['value']);
  return <Async
          name={input['name']}
          value={input['value']}
          onBlur={() => input.onBlur()}
          onChange={input.onChange}
          loadOptions={getCities}/>
}


  export const renderDateTimePicker = ({ input: { onChange, value }, showTime, min }) => {
    return (<DateTimePicker
      onChange={onChange}
      format="YYYY-MM-DD"
      time={showTime}
      min={min}
      value={!value ? null : value}
    />);
  }

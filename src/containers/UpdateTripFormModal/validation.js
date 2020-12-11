import React from 'react'
import { Field, reduxForm } from 'redux-form'

export const validate = values => {
  const errors = {}
  if (!values.departure_location) {
    errors.departure_location = 'Required*'
  }
  if (!values.destination_location) {
    errors.destination_location = 'Required*'
  }
  if (!values.depart_date) {
    errors.depart_date = 'Required*'
  }
  if (values.trip_type === "round_trip") {
    if (!values.comeback_date) {
      errors.comeback_date = 'Required*'
    }
  }
  return errors
}

export const warn = values => {
  const warnings = {}
  return warnings
}

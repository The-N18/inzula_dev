import React from 'react'
import { Field, reduxForm } from 'redux-form'

export const validate = values => {
  const errors = {}
  if (!values.price) {
    errors.price = 'Required'
  } else if (values.price.length > 5) {
    errors.price = 'Must be 5 characters or less'
  } else if (isNaN(Number(values.price))) {
    errors.age = 'Must be a number'
  }
  return errors
}

export const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}

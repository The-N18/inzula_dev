import React from 'react'
import { Field, reduxForm } from 'redux-form'

export const validate = values => {
  const errors = {}
  // if (values.username && values.username.length > 15) {
  //   errors.username = 'Must be 15 characters or less'
  // }
  // if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address'
  // }
  return errors
}

export const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}

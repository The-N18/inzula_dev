import React from 'react'
import { Field, reduxForm } from 'redux-form'

export const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required*'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.user_type) {
    errors.user_type = 'Required*'
  }
  if (!values.email) {
    errors.email = 'Required*'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.terms_conditions == true) {
    errors.terms_conditions = 'Please accept our terms to signup'
  }
  if (!values.password1) {
    errors.password1 = 'Required*'
  } else if (values.password1 !== values.password2) {
    errors.password2 = 'Passwords do not match'
    errors.password1 = 'Passwords do not match'
  } else if (values.password1.length < 8) {
    errors.password1 = 'Must be at least 8 characters long'
  }
  return errors
}

export const warn = values => {
  const warnings = {}
  return warnings
}

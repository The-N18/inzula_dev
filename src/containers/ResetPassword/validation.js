export const validate = values => {
  const errors = {}
  if (!values.new_password1) {
    errors.new_password1 = 'Required'
  } else if (values.new_password1 !== values.new_password2) {
    errors.new_password2 = 'Passwords do not match'
    errors.new_password1 = 'Passwords do not match'
  }
  if (!values.new_password2) {
    errors.new_password2 = 'Required'
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

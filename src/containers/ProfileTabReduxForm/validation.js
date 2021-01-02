export const validate = values => {
  const errors = {}
  if(!values.first_name) {
    errors.first_name = "*Required. Cannot be empty."
  }
  if(!values.last_name) {
    errors.last_name = "*Required. Cannot be empty."
  }
  return errors
}

export const warn = values => {
  const warnings = {}
  return warnings
}

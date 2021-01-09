export const validate = values => {
  const errors = {}
  if(!values.first_name) {
    errors.first_name = "*Required. Cannot be empty."
  }
  if(!values.last_name) {
    errors.last_name = "*Required. Cannot be empty."
  }
  if(!values.phone_number) {
    errors.phone_number = "*Required. Cannot be empty."
  }
  if(!values.passport_number) {
    errors.passport_number = "*Required. Cannot be empty."
  }
  if(!values.sex) {
    errors.sex = "*Required. Cannot be empty."
  }
  if(!values.country) {
    errors.country = "*Required. Cannot be empty."
  }
  return errors
}

export const warn = values => {
  const warnings = {}
  return warnings
}

export const validate = values => {
  const errors = {}
  if (!values.price) {
    errors.price = '*Required'
  } else if (values.price.length > 5) {
    errors.price = 'Must be 5 characters or less'
  } else if (isNaN(Number(values.price))) {
    errors.price = 'Must be a number'
  }
  return errors
}

export const warn = values => {
  const warnings = {};
  return warnings
}

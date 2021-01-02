export const validate = values => {
  const errors = {}
  if (!values.price) {
    errors.price = '*Required'
  } else if (values.price.length > 5) {
    errors.price = 'Must be 5 characters or less'
  } else if (isNaN(Number(values.price))) {
    errors.price = 'Must be a number'
  }

  if (!values.card_f_name) {
    errors.card_f_name = '*Required'
  }
  if (!values.card_l_name) {
    errors.card_l_name = '*Required'
  }
  if (!values.card_number) {
    errors.card_number = '*Required'
  } else if (values.card_number.length > 16 || values.card_number.length < 16) {
    errors.card_number = 'Must be 16 digits'
  } else if (isNaN(Number(values.card_number))) {
    errors.card_number = 'Must be a number'
  }
  if (!values.exp_date_mm) {
    errors.exp_date_mm = '*Required'
  } else if (values.exp_date_mm.length > 2 || values.exp_date_mm.length < 2) {
    errors.exp_date_mm = 'Must be 2 digits'
  } else if (isNaN(Number(values.exp_date_mm))) {
    errors.exp_date_mm = 'Must be a number'
  }
  if (!values.exp_date_yy) {
    errors.exp_date_yy = '*Required'
  } else if (values.exp_date_yy.length > 2 || values.exp_date_yy.length < 2) {
    errors.exp_date_yy = 'Must be 2 digits'
  } else if (isNaN(Number(values.exp_date_yy))) {
    errors.exp_date_yy = 'Must be a number'
  }
  if (!values.cvc) {
    errors.cvc = '*Required'
  } else if (values.cvc.length > 3 || values.cvc.length < 3) {
    errors.cvc = 'Must be 2 digits'
  } else if (isNaN(Number(values.cvc))) {
    errors.cvc = 'Must be a number'
  }
  return errors
}

export const warn = values => {
  const warnings = {};
  return warnings
}

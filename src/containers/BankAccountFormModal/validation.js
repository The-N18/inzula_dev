export const validate = values => {
  const errors = {}
  if (!values.amount) {
    errors.amount = '*Required'
  } else if (isNaN(Number(values.amount))) {
    errors.amount = 'Must be a number'
  }

  if (!values.account_owner_name) {
    errors.account_owner_name = '*Required'
  }
  if (!values.account_owner_address) {
    errors.account_owner_address = '*Required'
  }
  if (!values.account_owner_postal_code) {
    errors.account_owner_postal_code = '*Required'
  }
  if (!values.account_owner_country) {
    errors.account_owner_country = '*Required'
  }
  if (!values.account_IBAN) {
    errors.account_IBAN = '*Required'
  }
  if (!values.account_BIC) {
    errors.account_BIC = '*Required'
  }
  return errors
}

export const warn = values => {
  const warnings = {};
  return warnings
}

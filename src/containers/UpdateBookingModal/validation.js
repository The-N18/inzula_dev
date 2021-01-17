export const validate = values => {
  const errors = {}
  if (!values.terms_conditions) {
    errors.terms_conditions = 'Required';
  }
  if (!values.user_agreement) {
    errors.user_agreement = 'Required';
  }
  if (!values.product_name) {
    errors.product_name = 'Required';
  } else if (values.product_name.length > 20) {
    errors.product_name = 'Must be 20 characters or less';
  }
  if (!values.departure_location) {
    errors.departure_location = 'Required';
  }
  if (!values.proposed_price) {
    errors.proposed_price = 'Required';
  } else if(values.proposed_price < values.min_price) {
    errors.proposed_price = 'You must propose at least the minimum amount';
  }
  if (!values.destination_location) {
    errors.destination_location = 'Required';
  }
  if(values.destination_location !== "" && values.departure_location !== "" && values.destination_location !== undefined && values.departure_location !== undefined) {
    if (values.destination_location["value"] == values.departure_location["value"]) {
      errors.destination_location = 'Cannot be the same as the departure location';
      errors.departure_location = 'Cannot be the same as the destination location';
    }
  }
  if (!values.delivery_date) {
    errors.delivery_date = 'Required';
  }
  if (!values.product_category) {
    errors.product_category = 'Required';
  }
  if (!values.product_weight) {
    errors.product_weight = 'Required';
  }
  if (!values.product_size) {
    errors.product_size = 'Required';
  }
  if (!values.product_value) {
    errors.product_value = 'Required';
  }
  if (!values.recipient_name) {
    errors.recipient_name = 'Required';
  }
  if (!values.recipient_phone_number) {
    errors.recipient_phone_number = 'Required';
  } else if (isNaN(Number(values.recipient_phone_number))) {
    errors.recipient_phone_number = 'Must be a number';
  }
  return errors
}

export const warn = values => {
  const warnings = {};
  return warnings
}

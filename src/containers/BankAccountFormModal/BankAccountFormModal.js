import React from "react";
import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './bankaccountformmodal.css';
import { NavLink, Redirect } from "react-router-dom";
import { openBankAccountFormModal,
         closeBankAccountFormModal,
         getMaxPayoutAmount,
         cashout} from "../../store/actions/bankAccountFormModal";
import { deleteTrip } from "../../store/actions/addTrip";
import {Field, reset, reduxForm, formValueSelector} from 'redux-form';
import {renderField, renderDropdownList} from "../../containers/ReduxForm/renderField";
import { validate } from "./validation";
import CSRFToken from "../../containers/CSRFToken";
import DjangoCSRFToken from 'django-react-csrftoken';
import {countries} from "../../utils/countries";
import {FormattedMessage, FormattedDate} from 'react-intl'

class BankAccountFormModal extends React.Component {

  submitForm = (val) => {
    const {userId} = this.props;
    this.props.cashout({...val, 'userId': userId});
  }

  componentDidMount = () => {
    const {userId} = this.props;
    // this.props.getMaxPayoutAmount(userId);
  }

  componentDidUpdate(prevProps) {
    const { userId, change } = this.props;
    if (prevProps.max_amt === "" && this.props.max_amt !== "") {
      change('max_amount', this.props.max_amt);
    }
    if (prevProps.open === false && this.props.open === true) {
      this.props.getMaxPayoutAmount(userId);
    }
  }

  render() {
    const { open, handleSubmit, invalid } = this.props;
    return (
      <Modal
        centered={false}
        open={open}
        onClose={() => this.props.closeBankAccountFormModal()}
        onOpen={() => this.props.openBankAccountFormModal()}
        size='tiny'
      >
      <Modal.Header>Enter bank account to which you want to cash out</Modal.Header>
      <Modal.Content>
        <form onSubmit={handleSubmit(this.submitForm)}>
        <CSRFToken/>
        <DjangoCSRFToken/>
        <div>
          <label htmlFor="max_amount">
            <FormattedMessage
              id="profile_tab.max_amt"
              defaultMessage="Maximum Amount you can cash out"
            />
          </label>
          <div>
        <Field
          name="max_amount"
          component="input"
          type="number"
          label="Maximum Amount"
          component={renderField}
          disabled
        />
        </div>
        </div>
        <Field
          name="amount"
          component="input"
          type="number"
          label="Amount"
          component={renderField}
        />
        <Field
          name="account_owner_name"
          component="input"
          type="text"
          label="Account holder name(s)"
          component={renderField}
        />
          <Field
            name="account_owner_address"
            component="input"
            type="text"
            label="Account holder address"
            component={renderField}
          />
          <Field
            name="account_owner_postal_code"
            component="input"
            type="number"
            label="Postal code"
            component={renderField}
          />
          <div>
            <label htmlFor="country">
              <FormattedMessage
                id="profile_tab.country"
                defaultMessage="Country"
              />
            </label>
            <div>
              <Field
                name="account_owner_country"
                placeholder='Country'
                component={renderDropdownList}
                data={countries}
                valueField="value"
                textField="text" />
              </div>
            </div>
          <Field
            name="account_IBAN"
            component="input"
            type="text"
            label="IBAN"
            component={renderField}
          />
          <Field
            name="account_BIC"
            component="input"
            type="text"
            label="BIC"
            component={renderField}
          />
          <Button positive type="submit" disabled={invalid}>
            Cash out
          </Button>
        </form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closeBankAccountFormModal()}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.bankAccountFormModal.open,
    max_amt: state.bankAccountFormModal.max_amt,
    error: state.bankAccountFormModal.error,
    loading: state.bankAccountFormModal.loading,
    userId: state.userInfo.userId,
    initialValues: {
      "max_amount": 0
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openBankAccountFormModal: () => dispatch(openBankAccountFormModal()),
    closeBankAccountFormModal: () => dispatch(closeBankAccountFormModal()),
    getMaxPayoutAmount: (userId) => dispatch(getMaxPayoutAmount(userId)),
    cashout: (values) => dispatch(cashout(values)),
  };
};


let BankAccountFormModalConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccountFormModal);

const afterSubmit = (result, dispatch) => dispatch(reset('bank_account_form_modal'));

BankAccountFormModalConnected = reduxForm ({
  form: 'bank_account_form_modal',
  onSubmitSuccess: afterSubmit, enableReinitialize: true, validate
}) (BankAccountFormModalConnected);

export default BankAccountFormModalConnected;

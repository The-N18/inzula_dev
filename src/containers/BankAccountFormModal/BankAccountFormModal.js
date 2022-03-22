import React from "react";
import {
  Container,
  Button,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './bankaccountformmodal.css';
import { openBankAccountFormModal,
         closeBankAccountFormModal,
         getMaxPayoutAmount,
         cashout} from "../../store/actions/bankAccountFormModal";
import {Field, reset, reduxForm} from 'redux-form';
import {renderField, renderDropdownList} from "../../containers/ReduxForm/renderField";
import { validate } from "./validation";
import CSRFToken from "../../containers/CSRFToken";
import DjangoCSRFToken from 'django-react-csrftoken';
import {countries} from "../../utils/countries";
import {FormattedMessage} from 'react-intl';
import $ from 'jquery';

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


  handleBankAccountFormModal = () => {
    const {reset,initialize}=this.props;


    // $('#paymentForm').off('hidden.bs.modal')
    // $('#paymentForm').on('hidden.bs.modal', function () {
    //   $('#paymentOptions').modal("show");
    //   initialize();
    // });
    initialize();
    // $('#bankAccountForm').modal('hide');
    $('#bankAccountForm').modal('hide');
    this.props.closeBankAccountFormModal();

    
  }

  render() {
    const { open, handleSubmit, invalid, loading } = this.props;
    return (

      <React.Fragment>

      {/* Preloader */}
        <div id="preloader" style={{display:loading?'block':'none'}}>
          <div id="status"></div>
        </div>
      {/* Preloader Ends */}

      <div className="modal fade"  id="bankAccountForm" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static"  data-keyboard="false">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header p-4">
            <Modal.Header>
              <FormattedMessage
                id="cashout_form.title"
                defaultMessage="Maximum Amount you can cash out"
              />
            </Modal.Header>
          </div>
          <div className="modal-body p-0">
            <Container>

            <form onSubmit={handleSubmit(this.submitForm)}>
              <CSRFToken/>
              <DjangoCSRFToken/>
              <div>
              <div>
                <label htmlFor="amount">
                  <FormattedMessage
                    id="cashout_form.amt"
                    defaultMessage="Amount"
                  />
                </label>
              </div>
                <Field
                  name="amount"
                  component="input"
                  type="number"
                  component={renderField}
                />
              </div>
              <div>
              <div>
                <label htmlFor="account_owner_name">
                  <FormattedMessage
                    id="cashout_form.account_owner_name"
                    defaultMessage="Account holder name(s)"
                  />
                </label>
              </div>
              <Field
                name="account_owner_name"
                component="input"
                type="text"
                component={renderField}
              />
              </div>
              <div>
              <div>
                <label htmlFor="account_owner_address">
                  <FormattedMessage
                    id="cashout_form.account_owner_address"
                    defaultMessage="Account holder address"
                  />
                </label>
              </div>
                <Field
                  name="account_owner_address"
                  component="input"
                  type="text"
                  component={renderField}
                />
                </div>
                <div>
              <div>
                <label htmlFor="account_owner_postal_code">
                  <FormattedMessage
                    id="cashout_form.account_owner_postal_code"
                    defaultMessage="Postal code"
                  />
                </label>
              </div>
                <Field
                  name="account_owner_postal_code"
                  component="input"
                  type="number"
                  component={renderField}
                />
                </div>
                <div>
                  <label htmlFor="country">
                    <FormattedMessage
                      id="cashout_form.country"
                      defaultMessage="Country"
                    />
                  </label>
                  <div>
                    <Field
                      name="account_owner_country"
                      component={renderDropdownList}
                      data={countries}
                      valueField="value"
                      textField="text" />
                    </div>
                  </div>
                  <div>
              <div>
                <label htmlFor="account_IBAN">
                  <FormattedMessage
                    id="cashout_form.account_IBAN"
                    defaultMessage="IBAN"
                  />
                </label>
              </div>
                <Field
                  name="account_IBAN"
                  component="input"
                  type="text"
                  component={renderField}
                />
                </div>
                <div>
              <div>
                <label htmlFor="account_BIC">
                  <FormattedMessage
                    id="cashout_form.account_BIC"
                    defaultMessage="BIC"
                  />
                </label>
              </div>
                <Field
                  name="account_BIC"
                  component="input"
                  type="text"
                  component={renderField}
                />
                </div>
                <Button positive type="submit" disabled={invalid || loading}>
                  <FormattedMessage
                    id="cashout_form.cashout"
                    defaultMessage="Cash out"
                  />
                </Button>
            </form>
                    
            </Container>
          </div>
          <div class="modal-footer">
            <Button negative onClick={this.handleBankAccountFormModal.bind(this)} disabled={loading}>
              <FormattedMessage
                id="cashout_form.cancel"
                defaultMessage="Cancel"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>

    </React.Fragment>

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
  destroyOnUnmount:false,
  enableReinitialize: true,
  onSubmitSuccess: afterSubmit,
  validate
}) (BankAccountFormModalConnected);

export default BankAccountFormModalConnected;

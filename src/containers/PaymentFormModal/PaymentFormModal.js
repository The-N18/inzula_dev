import React from "react";
import {
  Button,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './paymentformmodal.css';
import { openPaymentFormModal,
         closePaymentFormModal,
         payInInzulaWallet,
         getInitialCardData,
         payForBooking} from "../../store/actions/paymentFormModal";
import {Field, reset, reduxForm} from 'redux-form';
import {renderField} from "../../containers/ReduxForm/renderField";
import { validate } from "./validation";
import CSRFToken from "../../containers/CSRFToken";
import {FormattedMessage} from 'react-intl'

class PaymentFormModal extends React.Component {

  submitForm = (val) => {
    const {userId, tripId, selectedBookingIds} = this.props;
    const values = {
      'cardNumber': val['card_number'],
      'cardExpirationDate': val['exp_date_mm'] + val['exp_date_yy'],
      'cardCvx': val['cvc'],
      'userId': userId,
      'tripId': tripId,
      'selectedBookingIds': selectedBookingIds
    }
    this.props.payForBooking(values);
    // this.props.getInitialCardData(values);
  }

  render() {
    const { open, handleSubmit, price, invalid, loading } = this.props;
    return (
      <Modal
      closeIcon
        centered={false}
        open={open}
        onClose={() => this.props.closePaymentFormModal()}
        onOpen={() => this.props.openPaymentFormModal()}
        size='tiny'
      >
      <Modal.Header><FormattedMessage
              id="payment_form.title"
              defaultMessage="Payment"
            /></Modal.Header>
      <Modal.Content>
        <p><FormattedMessage
              id="payment_form.price_msg"
              values={{ price: `${price+(price*0.25)}`}}
            /></p>

        <form onSubmit={handleSubmit(this.submitForm)}>
          <CSRFToken/>
          <div>
            <label htmlFor="card_f_name"><FormattedMessage
              id="payment_form.card_f_name"
              defaultMessage="Card holder first name(s)"
            /></label>
          <Field
            name="card_f_name"
            component="input"
            type="text"
            component={renderField}
          />
          </div>
          <div>
            <label htmlFor="card_l_name"><FormattedMessage
              id="payment_form.card_l_name"
              defaultMessage="Card holder last name(s)"
            /></label>
          <Field
            name="card_l_name"
            component="input"
            type="text"
            component={renderField}
          />
          </div>
          <div>
            <label htmlFor="card_number"><FormattedMessage
              id="payment_form.card_number"
              defaultMessage="Card number"
            /></label>
          <Field
            name="card_number"
            component="input"
            type="number"
            component={renderField}
          />
          </div>
          <div>
            <label htmlFor="exp_date_mm"><FormattedMessage
              id="payment_form.exp_date_mm"
              defaultMessage="MM(expiration)"
            /></label>
          <Field
            name="exp_date_mm"
            component="input"
            type="number"
            component={renderField}
          />
          </div>
          <div>
            <label htmlFor="exp_date_yy"><FormattedMessage
              id="payment_form.exp_date_yy"
              defaultMessage="YY"
            /></label>
          <Field
            name="exp_date_yy"
            component="input"
            type="number"
            component={renderField}
          />
          </div>
          <div>
            <label htmlFor="cvc"><FormattedMessage
              id="payment_form.cvc"
              defaultMessage="CVC"
            /></label>
          <Field
            name="cvc"
            component="input"
            type="number"
            component={renderField}
          />
          </div>
          <Button positive type="submit" disabled={invalid || loading}>
            <FormattedMessage
              id="payment_form.pay"
              defaultMessage="Pay"
            />
          </Button>
        </form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closePaymentFormModal()}>
          <FormattedMessage
              id="payment_form.cancel"
              defaultMessage="Cancel"
            />
        </Button>
      </Modal.Actions>
    </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.paymentFormModal.open,
    loading: state.paymentFormModal.loading,
    bookingId: state.confirmBookingPrice.bookingId,
    tripId: state.selectReservationsModal.tripId,
    selectedBookingIds: state.selectReservationsModal.selected,
    userId: state.userInfo.userId,
    price: state.confirmBookingPrice.price,
    naturalUserId: state.paymentFormModal.naturalUserId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPaymentFormModal: () => dispatch(openPaymentFormModal()),
    closePaymentFormModal: () => dispatch(closePaymentFormModal()),
    payInInzulaWallet: (values) => dispatch(payInInzulaWallet(values)),
    getInitialCardData: (values) => dispatch(getInitialCardData(values)),
    payForBooking: (values) => dispatch(payForBooking(values)),
  };
};


let PaymentFormModalConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentFormModal);

const afterSubmit = (result, dispatch) => dispatch(reset('payment_form_modal'));

PaymentFormModalConnected = reduxForm ({
  form: 'payment_form_modal',
  onSubmitSuccess: afterSubmit, validate
}) (PaymentFormModalConnected);

export default PaymentFormModalConnected;

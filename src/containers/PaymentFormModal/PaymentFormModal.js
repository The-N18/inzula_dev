import React from "react";
import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './paymentformmodal.css';
import { NavLink, Redirect } from "react-router-dom";
import { openPaymentFormModal,
         closePaymentFormModal,
         payInInzulaWallet,
         getInitialCardData,
         payForBooking} from "../../store/actions/paymentFormModal";
import { deleteTrip } from "../../store/actions/addTrip";
import {Field, reset, reduxForm, formValueSelector} from 'redux-form';
import {renderField} from "../../containers/ReduxForm/renderField";
import { validate } from "./validation";
import CSRFToken from "../../containers/CSRFToken";

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
    const { open, handleSubmit, price } = this.props;
    return (
      <Modal
        centered={false}
        open={open}
        onClose={() => this.props.closePaymentFormModal()}
        onOpen={() => this.props.openPaymentFormModal()}
        size='tiny'
      >
      <Modal.Header>Payment</Modal.Header>
      <Modal.Content>
        <p>You are about to pay {price+(price*0.25)} euros.</p>

        <form onSubmit={handleSubmit(this.submitForm)}>
          <CSRFToken/>
          <Field
            name="card_f_name"
            component="input"
            type="text"
            label="Card holder first name(s)"
            component={renderField}
          />
          <Field
            name="card_l_name"
            component="input"
            type="text"
            label="Card holder last name(s)"
            component={renderField}
          />
          <Field
            name="card_number"
            component="input"
            type="number"
            label="Card number"
            component={renderField}
          />
          <Field
            name="exp_date_mm"
            component="input"
            type="number"
            label="MM(expiration)"
            component={renderField}
          />
          <Field
            name="exp_date_yy"
            component="input"
            type="number"
            label="YY"
            component={renderField}
          />
          <Field
            name="cvc"
            component="input"
            type="number"
            label="CVC"
            component={renderField}
          />
          <Button positive type="submit">
            Pay
          </Button>
        </form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closePaymentFormModal()}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.paymentFormModal.open,
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

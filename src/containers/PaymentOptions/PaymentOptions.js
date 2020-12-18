import React from "react";
import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './paymentoptions.css';
import { NavLink, Redirect } from "react-router-dom";
import { openPaymentOptions,
         closePaymentOptions} from "../../store/actions/paymentOptionsModal";
import { openSelectCreditCard,
        closeSelectCreditCard} from "../../store/actions/selectCreditCardModal";
import CSRFToken from "../../containers/CSRFToken";
import PaymentMethodCard from "../../containers/PaymentMethodCard/PaymentMethodCard";


class PaymentOptions extends React.Component {

  payWithCreditCard = () => {
    console.log("Pay with credit card");
    this.props.openSelectCreditCard();
  }

  payWithPaypal = () => {
    console.log("Pay with paypal");
  }

  render() {
    const { open, price } = this.props;
    return (
      <Modal
        centered={false}
        open={open}
        onClose={() => this.props.closePaymentOptions()}
        onOpen={() => this.props.openPaymentOptions()}
        size='tiny'
      >
      <Modal.Header>Choice of Payment method</Modal.Header>
      <Modal.Content>
        <p>Select your method of payment.</p>
        <PaymentMethodCard type="credit_card" onclick={this.payWithCreditCard.bind(this)} />

      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closePaymentOptions()}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.paymentOptionsModal.open,
    bookingId: state.confirmBookingPrice.bookingId,
    tripId: state.selectReservationsModal.tripId,
    selectedBookingIds: state.selectReservationsModal.selected,
    userId: state.userInfo.userId,
    price: state.confirmBookingPrice.price,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPaymentOptions: () => dispatch(openPaymentOptions()),
    closePaymentOptions: () => dispatch(closePaymentOptions()),
    openSelectCreditCard: () => dispatch(openSelectCreditCard()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentOptions);

import React from "react";
import {
  Button,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './paymentoptions.css';
import { openPaymentOptions,
         closePaymentOptions} from "../../store/actions/paymentOptionsModal";
import { openSelectCreditCard} from "../../store/actions/selectCreditCardModal";
import PaymentMethodCard from "../../containers/PaymentMethodCard/PaymentMethodCard";
import { payForBookingWithPaypal , payForBookingWithWalletFunds} from "../../store/actions/paymentFormModal";
import {FormattedMessage} from 'react-intl'


class PaymentOptions extends React.Component {

  payWithCreditCard = () => {
    this.props.openSelectCreditCard();
  }

  payWithPaypal = () => {
    const {selectedBookingIds, tripId, userId} = this.props;
    this.props.payForBookingWithPaypal({'selectedBookingIds': selectedBookingIds, 'tripId': tripId, 'userId': userId});
  }

  payWithWalletFunds = () => {
    const {selectedBookingIds, tripId, userId, loading} = this.props;
    if(!loading) {
      this.props.payForBookingWithWalletFunds({'selectedBookingIds': selectedBookingIds, 'tripId': tripId, 'userId': userId});
    }
  }

  render() {
    const { open } = this.props;
    return (
      <Modal
      closeIcon
        centered={false}
        open={open}
        onClose={() => this.props.closePaymentOptions()}
        onOpen={() => this.props.openPaymentOptions()}
        size='tiny'
      >
      <Modal.Header>
      <FormattedMessage
                id="pay_choices.title"
                defaultMessage="Choice of Payment method"
              /></Modal.Header>
      <Modal.Content>
        <p><FormattedMessage
                id="pay_choices.select"
                defaultMessage="Select your method of payment."
              /></p>
        <PaymentMethodCard type="credit_card" onclick={this.payWithCreditCard.bind(this)} />
        {/* <PaymentMethodCard type="paypal" onclick={this.payWithPaypal.bind(this)} /> */}
        <PaymentMethodCard type="wallet" onclick={this.payWithWalletFunds.bind(this)} />

      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closePaymentOptions()}>
        <FormattedMessage
                id="pay_choices.cancel"
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
    open: state.paymentOptionsModal.open,
    bookingId: state.confirmBookingPrice.bookingId,
    tripId: state.selectReservationsModal.tripId,
    selectedBookingIds: state.selectReservationsModal.selected,
    userId: state.userInfo.userId,
    price: state.confirmBookingPrice.price,
    loading: state.paymentFormModal.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPaymentOptions: () => dispatch(openPaymentOptions()),
    closePaymentOptions: () => dispatch(closePaymentOptions()),
    openSelectCreditCard: () => dispatch(openSelectCreditCard()),
    payForBookingWithPaypal: (values) => dispatch(payForBookingWithPaypal(values)),
    payForBookingWithWalletFunds: (values) => dispatch(payForBookingWithWalletFunds(values))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentOptions);

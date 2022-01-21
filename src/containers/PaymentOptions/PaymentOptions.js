import React from "react";
import {
  Button,
  Container,
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
import $ from 'jquery';

class PaymentOptions extends React.Component {

  payWithCreditCard = () => {
    $('#paymentOptions').off('hidden.bs.modal')
    $('#paymentOptions').on('hidden.bs.modal', function () {
      $('#selectCreditCard').modal("show");
    });
    $('#paymentOptions').modal('hide');
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

  handleCanclePayment(){

    $('#paymentOptions').off('hidden.bs.modal')
    $('#paymentOptions').on('hidden.bs.modal', function () {
      $('#confirmReservationPrice').modal("show");
    });
    $('#paymentOptions').modal('hide');
    this.props.closePaymentOptions()
  }

  render() {
    const { open } = this.props;
    return (

      <div className="modal fade"  id="paymentOptions" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header p-4">
              <Modal.Header>
                <FormattedMessage
                  id="pay_choices.title"
                  defaultMessage="Choice of Payment method"
                />
              </Modal.Header>
            </div>
            <div className="modal-body p-0">
              <Container>
                <p><FormattedMessage
                  id="pay_choices.select"
                  defaultMessage="Select your method of payment."
                /></p>
                <PaymentMethodCard type="credit_card" onclick={this.payWithCreditCard.bind(this)} />
                {/* <PaymentMethodCard type="paypal" onclick={this.payWithPaypal.bind(this)} /> */}
                <PaymentMethodCard type="wallet" onclick={this.payWithWalletFunds.bind(this)} />
              </Container>
            </div>
            <div class="modal-footer">
            <Button negative onClick={this.handleCanclePayment.bind(this)}>
              <FormattedMessage
                id="pay_choices.cancel"
                defaultMessage="Cancel"
              />
            </Button>
            </div>
          </div>
        </div>
      </div>
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

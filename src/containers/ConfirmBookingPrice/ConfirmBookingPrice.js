import React from "react";
import {
  Button,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './confirmbookingprice.css';
import { openConfirmBookingPrice,
         closeConfirmBookingPrice,
         setBookingRequestInfo,
         getBookingTotalPrice,
         createWalletUser } from "../../store/actions/confirmBookingPrice";
import {reduxForm} from 'redux-form';
import { validate } from "./validation";
import { bookTrip } from "../../store/actions/selectReservationsModal";
import { openPaymentOptions } from "../../store/actions/paymentOptionsModal";
import { openPaymentFormModal } from "../../store/actions/paymentFormModal";
import {FormattedMessage} from 'react-intl'

class ConfirmBookingPrice extends React.Component {

  handleBookTripWithReservations = () => {
    const {tripId, selected, userId} = this.props;
    this.props.bookTrip(tripId, selected, userId);
  }

  confirmPaymentPrice = () => {
    const {bookingId, tripId, userId, price } = this.props;
    this.props.setBookingRequestInfo(bookingId, tripId, userId, price, true);
    this.props.closeConfirmBookingPrice();
    // this.props.openPaymentFormModal();
    this.props.createWalletUser(userId);
    this.props.openPaymentOptions();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open === false && this.props.open === true) {
      this.props.getBookingTotalPrice(this.props.selectedBookingIds,this.props.userId);
    }
  }

  render() {
    const { open, handleSubmit, price } = this.props;
    return (
      <Modal
      closeIcon
        centered={false}
        open={open}
        onClose={() => this.props.closeConfirmBookingPrice()}
        onOpen={() => this.props.openConfirmBookingPrice()}
        size='tiny'
      >
      <Modal.Header>
      <FormattedMessage
                  id="confirm_booking.title"
                  defaultMessage="Confirm price"
                />
                </Modal.Header>
      <Modal.Content>
        <span><FormattedMessage
                  id="confirm_booking.msg"
                  values={{ price: `${price}`, fees: `${0.25*price}` }}
                                  /></span>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={this.confirmPaymentPrice.bind(this)}>
        <FormattedMessage
                  id="confirm_booking.confirm"
                  defaultMessage="Confirm"
                />
        </Button>
        <Button negative onClick={() => this.props.closeConfirmBookingPrice()}>
        <FormattedMessage
                  id="confirm_booking.decline"
                  defaultMessage="Decline"
                />
        </Button>
      </Modal.Actions>
    </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.confirmBookingPrice.open,
    bookingId: state.confirmBookingPrice.bookingId,
    tripId: state.confirmBookingPrice.tripId,
    price: state.confirmBookingPrice.price,
    selectedBookingIds: state.selectReservationsModal.selected,
    paymentAmountConfirmed: state.confirmBookingPrice.paymentAmountConfirmed,
    userId: state.userInfo.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPaymentFormModal: () => dispatch(openPaymentFormModal()),
    openConfirmBookingPrice: () => dispatch(openConfirmBookingPrice()),
    closeConfirmBookingPrice: () => dispatch(closeConfirmBookingPrice()),
    setBookingRequestInfo: (bookingId, tripId, userId, price, paymentAmountConfirmed) => dispatch(setBookingRequestInfo(bookingId, tripId, userId, price, paymentAmountConfirmed)),
    bookTrip: (tripId, selected, userId) => dispatch(bookTrip(tripId, selected, userId)),
    getBookingTotalPrice: (selected, userId) => dispatch(getBookingTotalPrice(selected, userId)),
    createWalletUser: (userId) => dispatch(createWalletUser(userId)),
    openPaymentOptions: () => dispatch(openPaymentOptions()),
  };
};

let ConfirmBookingPriceConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmBookingPrice);

ConfirmBookingPriceConnected = reduxForm ({
  form: 'confirm_booking_price',
  validate
}) (ConfirmBookingPriceConnected);

export default ConfirmBookingPriceConnected;

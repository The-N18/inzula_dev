import React from "react";
import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './confirmbookingprice.css';
import { NavLink, Redirect } from "react-router-dom";
import { openConfirmBookingPrice,
         closeConfirmBookingPrice,
         setBookingRequestInfo,
         getBookingTotalPrice,
         createWalletUser } from "../../store/actions/confirmBookingPrice";
import { deleteTrip } from "../../store/actions/addTrip";
import {Field, reset, reduxForm, formValueSelector} from 'redux-form';
import {renderField} from "../../containers/ReduxForm/renderField";
import { validate } from "./validation";
import { bookTrip } from "../../store/actions/selectReservationsModal";
import { openPaymentOptions } from "../../store/actions/paymentOptionsModal";
import { openPaymentFormModal } from "../../store/actions/paymentFormModal";

class ConfirmBookingPrice extends React.Component {

  handleBookTripWithReservations = () => {
    const {tripId, selected, userId} = this.props;
    this.props.bookTrip(tripId, selected, userId);
  }

  confirmPaymentPrice = () => {
    const {bookingId, tripId, userId, price, paymentAmountConfirmed } = this.props;
    this.props.setBookingRequestInfo(bookingId, tripId, userId, price, true);
    this.props.closeConfirmBookingPrice();
    // this.props.openPaymentFormModal();
    this.props.createWalletUser(userId);
    this.props.openPaymentOptions();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open === false && this.props.open === true) {
      this.props.getBookingTotalPrice(this.props.selectedBookingIds);
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
      <Modal.Header>Confirm price</Modal.Header>
      <Modal.Content>
        <p>You are about to pay {price} euros and fees of {0.25*price} euros to book this trip for your product.</p>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={this.confirmPaymentPrice.bind(this)}>
          Confirm
        </Button>
        <Button negative onClick={() => this.props.closeConfirmBookingPrice()}>
          Decline
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
    bookTrip: (tripId, selected, user_id) => dispatch(bookTrip(tripId, selected, user_id)),
    getBookingTotalPrice: (selected) => dispatch(getBookingTotalPrice(selected)),
    createWalletUser: (userId) => dispatch(createWalletUser(userId)),
    openPaymentOptions: () => dispatch(openPaymentOptions()),
  };
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ConfirmBookingPrice);

let ConfirmBookingPriceConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmBookingPrice);

ConfirmBookingPriceConnected = reduxForm ({
  form: 'confirm_booking_price',
  validate
}) (ConfirmBookingPriceConnected);

export default ConfirmBookingPriceConnected;

import React from "react";
import {
  Button,
  Container,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './confirmbookingprice.css';
import { openConfirmBookingPrice,
         closeConfirmBookingPrice,
         setBookingRequestInfo,
         getBookingTotalPrice,
         createWalletUser, 
         setPrice} from "../../store/actions/confirmBookingPrice";
import {reduxForm} from 'redux-form';
import { validate } from "./validation";
import { bookTrip } from "../../store/actions/selectReservationsModal";
import { openPaymentOptions } from "../../store/actions/paymentOptionsModal";
import { openPaymentFormModal } from "../../store/actions/paymentFormModal";
import {FormattedMessage} from 'react-intl';
import $ from 'jquery';

class ConfirmBookingPrice extends React.Component {

  handleBookTripWithReservations = () => {
    const {tripId, selected, userId} = this.props;
    this.props.bookTrip(tripId, selected, userId);
  }

  confirmPaymentPrice = () => {
    const {bookingId, tripId, userId, price , isProposedPrice, priceProposals, selectedProposalId, selectProposalBookingId} = this.props;
    
    if(!isProposedPrice){
      this.props.setBookingRequestInfo(bookingId, tripId, userId, price, true);
    }else{
      const selectedProposal = priceProposals.find(x => x.pk === selectedProposalId);
      this.props.setBookingRequestInfo(selectProposalBookingId, selectedProposal.trip, userId, parseFloat(selectedProposal.price), true);
    }
    
    console.log('confirmPaymentPrice IIIIIINFOOO',bookingId, tripId, userId, price )

    this.props.closeConfirmBookingPrice();
    // this.props.openPaymentFormModal();
    this.props.createWalletUser(userId);
    this.props.openPaymentOptions();

    $('#confirmReservationPrice').off('hidden.bs.modal');
    $('#confirmReservationPrice').on('hidden.bs.modal', function () {
      $('#paymentOptions').modal("show");
    });
    $('#confirmReservationPrice').modal('hide');
  }

  componentDidUpdate(prevProps) {
    const {isProposedPrice,priceProposals,selectedProposalId} = this.props;

    if (prevProps.open === false && this.props.open === true) {
      if(!isProposedPrice){
        this.props.getBookingTotalPrice(this.props.selectedBookingIds,this.props.userId);
      }else{
        const selectedProposal = priceProposals.find(x => x.pk === selectedProposalId);
        console.log("selectedProposalId",selectedProposalId)
        this.props.setPrice(parseFloat(selectedProposal.price));
        
      }

    }
  }

  handleDeclineReservation = () => {
    const {isProposedPrice} = this.props;

    if(!isProposedPrice){
      $('#confirmReservationPrice').off('hidden.bs.modal');
      $('#confirmReservationPrice').on('hidden.bs.modal', function () {
        $('#selectReservations').modal("show");
      });
      $('#confirmReservationPrice').modal('hide');
      this.props.closeConfirmBookingPrice();
    }else{
      $('#confirmReservationPrice').off('hidden.bs.modal');
      $('#confirmReservationPrice').on('hidden.bs.modal', function () {
        $('#selectPriceProposalModal').modal('show')
      });
      $("#confirmReservationPrice").modal("hide");
      this.props.closeConfirmBookingPrice();
    }
  }

  render() {
    const { open, handleSubmit, price } = this.props;
    return (

      <div className="modal fade"  id="confirmReservationPrice" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static"  data-keyboard="false">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header p-4">
              <Modal.Header>
                <FormattedMessage
                  id="confirm_booking.title"
                  defaultMessage="Confirm price"
                />
              </Modal.Header>
            </div>
            <div className="modal-body p-0">
              <Container>
                <span><FormattedMessage
                  id="confirm_booking.msg"
                  values={{ price: `${price}`, fees: `${0.25*price}` }}
                /></span>
              </Container>
            </div>
            <div class="modal-footer">
            <Button positive onClick={this.confirmPaymentPrice.bind(this)}>
              <FormattedMessage
                id="confirm_booking.confirm"
                defaultMessage="Confirm"
              />
            </Button>
            <Button negative onClick={this.handleDeclineReservation.bind(this)}>
              <FormattedMessage
                id="confirm_booking.decline"
                defaultMessage="Decline"
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
    open: state.confirmBookingPrice.open,
    bookingId: state.confirmBookingPrice.bookingId,
    // tripId: state.confirmBookingPrice.tripId,
    tripId: state.selectReservationsModal.tripId,
    price: state.confirmBookingPrice.price,
    selectedBookingIds: state.selectReservationsModal.selected,
    paymentAmountConfirmed: state.confirmBookingPrice.paymentAmountConfirmed,
    userId: state.userInfo.userId,
    isProposedPrice: state.confirmBookingPrice.isProposedPrice,
    priceProposals: state.selectPriceProposalModal.priceProposals,
    selectedProposalId: state.selectPriceProposalModal.selectedProposalId,
    selectProposalBookingId: state.selectPriceProposalModal.bookingId,
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
    setPrice: (price) => dispatch(setPrice(price))
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

import React from "react";
import {
  Button,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './selectreservations.css';
import { openModal, closeModal } from "../../store/actions/selectReservationsModal";
import SelectableUserReservationsList from "../../containers/SelectableUserReservationsList/SelectableUserReservationsList";
import { openModalForTrip } from "../../store/actions/sendPackageModal";
import { openConfirmBookingPrice, setBookingRequestInfo } from "../../store/actions/confirmBookingPrice";
import {FormattedMessage} from 'react-intl'

import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import $ from "jquery";


class SelectReservationsModal extends React.Component {

  constructor(props) {
    super(props)
  }

  handleBook = () => {
    const {tripId} = this.props;
    this.props.openPackageModalForTrip(tripId);
    $('#selectReservations').off('hidden.bs.modal');
    $('#selectReservations').on('hidden.bs.modal', function () {
      $('#sendPackage').modal("show");
    });

    $('#sendPackage').on('hidden.bs.modal', function () {
      $('#selectReservations').modal("show");
    });

    $("#selectReservations").modal("hide");
  }


  handleConfirmBookingPrice = () => {
    this.props.openConfirmBookingPrice();
    $('#selectReservations').off('hidden.bs.modal');
    $('#selectReservations').on('hidden.bs.modal', function () {
      $('#confirmReservationPrice').modal('show')
    });
    $("#selectReservations").modal("hide");
    
  }

  handleCloseReservationsModal(){
  //   $('#sendPackage').on('show.bs.modal', function () {
  //     $('#selectReservations').css('z-index', 1039);
  //   });

  //   $('#sendPackage').on('hidden.bs.modal', function () {
  //     $('#selectReservations').css('z-index', 1051);
  //   });

    $('#selectReservations').off('hidden.bs.modal');
    $('#sendPackage').off('hidden.bs.modal');
    $('#confirmReservationPrice').off('hidden.bs.modal');
    $('#paymentOptions').off('hidden.bs.modal');
    $('#selectCreditCard').off('hidden.bs.modal');
    $("#selectReservations").modal("hide");
    this.props.closePackageModal();
  }

  render() {
    const { open, selected } = this.props;

    console.log("BOOOOOOOOOOX1")
    return (


      // <Modal 
      //   isOpen={open} 
      //   onClosed={() => this.props.closePackageModal()}
      //   onOpened={() => this.props.openPackageModal()}
      //   size="sm"
      //   scrollable
      // >
      //   <ModalHeader>
      //       <FormattedMessage
      //         id="select_reservations.title"
      //         defaultMessage="Select bookings for this trip"
      //       />
      //       <Button icon labelPosition='right' floated='right'
      //         size="large"
      //         className={"buttoncolor select-trip-top-button"}
      //         onClick={this.handleBook.bind(this)}
      //       >
      //       <Icon name='add circle' /> <FormattedMessage
      //         id="select_reservations.add_booking"
      //         defaultMessage="Add a booking"
      //       />
      //     </Button>
      //   </ModalHeader>
      //   <ModalBody>
      //     <SelectableUserReservationsList selectable={true} editable={false}/>
      //   </ModalBody>
      //   <ModalFooter>
      //     <Button color='green' disabled={selected.length === 0} onClick={this.handleConfirmBookingPrice.bind(this)}>
      //     <FormattedMessage
      //       id="select_reservations.book_with_selected"
      //       defaultMessage="Book with these reservations"
      //     /><Icon name='check' />
      //     </Button>
      //     <Button negative onClick={() => this.props.closePackageModal()} primary>
      //     <FormattedMessage
      //       id="select_reservations.cancel"
      //       defaultMessage="Cancel"
      //     /> <Icon name='cancel' />
      //     </Button>
      //   </ModalFooter>
      // </Modal>

      <div className="modal fade"  id="selectReservations" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header p-4">
                {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button> */}
                <FormattedMessage
                  id="select_reservations.title"
                  defaultMessage="Select bookings for this trip"
                />
                <Button icon labelPosition='right' floated='right'
                  size="large"
                  className={"buttoncolor select-trip-top-button"}
                  onClick={this.handleBook.bind(this)}
                >
                <Icon name='add circle' /> <FormattedMessage
                  id="select_reservations.add_booking"
                  defaultMessage="Add a booking"
                />
              </Button>
            </div>
            <div className="modal-body p-0">
              <div className="login-content p-4">
                <SelectableUserReservationsList selectable={true} editable={false}/>
              </div>
            </div>
            <div class="modal-footer">
              <Button color='green' disabled={selected.length === 0} onClick={this.handleConfirmBookingPrice.bind(this)}>
                <FormattedMessage
                  id="select_reservations.book_with_selected"
                  defaultMessage="Book with these reservations"
                /><Icon name='check' />
              </Button>
              <Button negative onClick={this.handleCloseReservationsModal.bind(this)} primary>
                <FormattedMessage
                  id="select_reservations.cancel"
                  defaultMessage="Cancel"
                /> <Icon name='cancel' />
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
    open: state.selectReservationsModal.open,
    tripId: state.selectReservationsModal.tripId,
    selected: state.selectReservationsModal.selected,
    user_id: state.userInfo.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPackageModal: () => dispatch(openModal()),
    closePackageModal: () => dispatch(closeModal()),
    openPackageModalForTrip: (tripId) => dispatch(openModalForTrip(tripId)),
    openConfirmBookingPrice: () => dispatch(openConfirmBookingPrice()),
    setBookingRequestInfo: (bookingId, tripId, userId, price, paymentAmountConfirmed) => dispatch(setBookingRequestInfo(bookingId, tripId, userId, price, paymentAmountConfirmed)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectReservationsModal);

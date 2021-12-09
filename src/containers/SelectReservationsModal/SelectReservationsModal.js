import React from "react";
import {
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './selectreservations.css';
import { openModal, closeModal } from "../../store/actions/selectReservationsModal";
import SelectableUserReservationsList from "../../containers/SelectableUserReservationsList/SelectableUserReservationsList";
import { openModalForTrip } from "../../store/actions/sendPackageModal";
import { openConfirmBookingPrice, setBookingRequestInfo } from "../../store/actions/confirmBookingPrice";
import {FormattedMessage} from 'react-intl'


class SelectReservationsModal extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
  }

  handleBook = () => {
    const {tripId} = this.props;
    this.props.openPackageModalForTrip(tripId);
  }

  handleConfirmBookingPrice = () => {
    this.props.openConfirmBookingPrice();
  }

  render() {
    const { open, selected } = this.props;

    return (
      <Modal
      closeIcon
      centered={false}
      open={open}
      onClose={() => this.props.closePackageModal()}
      onOpen={() => this.props.openPackageModal()}
      size='large'
    >
      <Modal.Header>
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
      </Modal.Header>
      <Modal.Content scrolling>
          <SelectableUserReservationsList selectable={true} editable={false}/>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' disabled={selected.length === 0} onClick={this.handleConfirmBookingPrice.bind(this)}>
        <FormattedMessage
          id="select_reservations.book_with_selected"
          defaultMessage="Book with these reservations"
        /><Icon name='check' />
        </Button>
        <Button negative onClick={() => this.props.closePackageModal()} primary>
        <FormattedMessage
          id="select_reservations.cancel"
          defaultMessage="Cancel"
        /> <Icon name='cancel' />
        </Button>
      </Modal.Actions>
    </Modal>
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

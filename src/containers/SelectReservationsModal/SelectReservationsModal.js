import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
  Container,
  Step,
  Image,
  TextArea,
  Select,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authLogin } from "../../store/actions/auth";
import styles from './selectreservations.css';
import PropTypes from "prop-types";
import { backend_url } from "../../configurations";
import ImageUploader from 'react-images-upload';
import { DateInput } from 'semantic-ui-calendar-react';
import {createNotification, NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notify';
import { openModal, closeModal, bookTrip } from "../../store/actions/selectReservationsModal";
import TripsReservationsList from "../../containers/TripsReservationsList/TripsReservationsList";
import UserReservationsList from "../../containers/UserReservationsList/UserReservationsList";
import { openModalForTrip } from "../../store/actions/sendPackageModal";


class SelectReservationsModal extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
  }

  handleBook = () => {
    const {trip_id} = this.props;
    this.props.openPackageModalForTrip(trip_id);
  }

  handleBookTripWithReservations = () => {
    console.log("book?");
    const {tripId, selected} = this.props;
    this.props.bookTrip(tripId, selected);
  }

  render() {
    const { open, tripId } = this.props;

    return (
      <Modal
      centered={false}
      open={open}
      onClose={() => this.props.closePackageModal()}
      onOpen={() => this.props.openPackageModal()}
      size='large'
    >
      <Modal.Header>
      Select bookings for this trip
      <Button icon labelPosition='right' floated='right'
        size="large"
        className={"buttoncolor select-trip-top-button"}
        onClick={this.handleBook.bind(this)}
      >
        <Icon name='add circle' /> Add a booking
      </Button>
      </Modal.Header>
      <Modal.Content scrolling>
          <UserReservationsList selectable={true}/>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={this.handleBookTripWithReservations.bind(this)}>
          Book with these reservations <Icon name='check' />
        </Button>
        <Button negative onClick={() => this.props.closePackageModal()} primary>
          Cancel <Icon name='cancel' />
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
    selected: state.selectReservationsModal.selected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPackageModal: () => dispatch(openModal()),
    closePackageModal: () => dispatch(closeModal()),
    openPackageModalForTrip: (tripId) => dispatch(openModalForTrip(tripId)),
    bookTrip: (tripId, selected) => dispatch(bookTrip(tripId, selected)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectReservationsModal);
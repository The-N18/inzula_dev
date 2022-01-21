import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Segment,
  Image,
  Card,
  Button
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './tripcard.module.css';
import { backend_url, get_img_url, isProfileComplete } from "../../configurations";
import { openModalForTrip } from "../../store/actions/sendPackageModal";
import { openModalSelectReservations } from "../../store/actions/selectReservationsModal";
import {FormattedMessage, FormattedDate} from 'react-intl'
import { openDeleteTripConfirm, setTripDeleteTripConfirm } from "../../store/actions/deleteTripConfirm";
import { updateTripOpenModal } from "../../store/actions/updateTripModal";
import {createNotification, NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notify';
import {openCompleteProfileModal} from "../../store/actions/completeProfileModal";

import $ from 'jquery';
window.jQuery = $;
require('bootstrap');

class TripCard extends React.Component {

  handleViewDetails = () => {
    console.log("view details");
  }

  handleBook = () => {
    console.log("in handle book")
    const {trip_id, authenticated} = this.props;
    if(authenticated) {
      if(isProfileComplete(localStorage)) {
        this.props.openReservationsList(trip_id);
        $("#selectReservations").modal("show");
      } else {
        this.props.openCompleteProfileModal();
      }
      
    } else {
      createNotification({
        message: 'Please login to book this trip.',
        type: NOTIFICATION_TYPE_SUCCESS,
        duration: 30000,
        canDismiss: true,
      });
    }
  }

  deleteTrip = () => {
    const {pk} = this.props;
    this.props.setTripDeleteTripConfirm(pk);
    this.props.openDeleteTripConfirm();

  }

  updateTrip = () => {
    const {trip_type, depart_date, comeback_date, departure_location, destination_location, pk} = this.props;
    const data = {
      "trip_type": trip_type,
      "departure_location": departure_location,
      "destination_location": destination_location,
      "depart_date": new Date(depart_date),
      "comeback_date": comeback_date !== null ? new Date(comeback_date) : '',
    };
    this.props.updateTripOpenModal(data, pk);
    $("#updateTrip").modal("show");
  }

  tripTypeToName = (type, options) => {
    let txt = "";
    for(let i = 0; i < options.length; i++) {
      if(options[i]['value'] === type) {
        txt = options[i]['label'];
      }
    }
    return txt;
  }

  render() {

    const {depart_date, img, comeback_date, departure_location, destination_location, creator_user_name, no_book} = this.props;

    return (
      
      <tr>
          <td>
            <span class="list-img">
              {/* <img src={!no_book || img ? get_img_url(img) : backend_url() + '/static/images/default_trips_image.jpg'} alt="" class="w-50"/> */}
              <Image centered src={!no_book || img ? get_img_url(img) : backend_url() + '/static/images/default_trips_image.jpg'} verticalAlign="middle" size="tiny" className={"trip-card-img"}/>
            </span>
          </td>
          <td>{creator_user_name}</td>
          <td>
            {depart_date ? <FormattedDate
                value={depart_date}
                year="numeric"
                month="short"
                day="numeric" 
                weekday="short" 
              /> : ''}
          </td>
          <td>{departure_location && departure_location['label'] ? departure_location['label'] : ''}</td>
          <td>{destination_location && destination_location['label'] ? destination_location['label'] : ''}</td>

          {no_book ? '' : <td><Button
              size="large"
              className={`${styles.bookButtonColor} trip-card-button`}
              onClick={this.handleBook.bind(this)}
            ><FormattedMessage
                id="trip_card.book"
                defaultMessage="Book"
              />
            </Button></td>}

          {!no_book ? '' : <React.Fragment>
            <td>
              <a onClick={this.updateTrip.bind(this)}><i class="fa fa-pencil-square-o text-success" aria-hidden="true"></i></a>
            </td>
            <td>
                <a onClick={this.deleteTrip.bind(this)}><i class="fa fa-trash-alt text-danger" aria-hidden="true"></i></a>
            </td>
          </React.Fragment>}       

              
        
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCompleteProfileModal: () => dispatch(openCompleteProfileModal()),
    openPackageModalForTrip: (tripId) => dispatch(openModalForTrip(tripId)),
    openReservationsList: (tripId) => dispatch(openModalSelectReservations(tripId)),
    openDeleteTripConfirm: () => dispatch(openDeleteTripConfirm()),
    setTripDeleteTripConfirm: (tripId) => dispatch(setTripDeleteTripConfirm(tripId)),
    updateTripOpenModal: (tripInfo, pk) => dispatch(updateTripOpenModal(tripInfo, pk)),
  };
};

TripCard.propTypes = {
  trip_type: PropTypes.string,
  comeback_date: PropTypes.string,
  creator_user_name: PropTypes.string,
  depart_date: PropTypes.string,
  departure_location: PropTypes.object,
  destination_location: PropTypes.object,
  img: PropTypes.string,
  trip_id: PropTypes.number,
  no_book: PropTypes.boolean,
  pk: PropTypes.number,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripCard);

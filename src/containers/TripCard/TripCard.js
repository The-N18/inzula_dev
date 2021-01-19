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
import { backend_url, get_img_url, isProfileComplete } from "../../configurations";
import { openModalForTrip } from "../../store/actions/sendPackageModal";
import { openModalSelectReservations } from "../../store/actions/selectReservationsModal";
import {FormattedMessage, FormattedDate} from 'react-intl'
import { openDeleteTripConfirm, setTripDeleteTripConfirm } from "../../store/actions/deleteTripConfirm";
import { updateTripOpenModal } from "../../store/actions/updateTripModal";
import {createNotification, NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notify';
import {openCompleteProfileModal} from "../../store/actions/completeProfileModal";

class TripCard extends React.Component {

  handleViewDetails = () => {
    console.log("view details");
  }

  handleBook = () => {
    const {trip_id, authenticated} = this.props;
    if(authenticated) {
      if(isProfileComplete(localStorage)) {
        this.props.openReservationsList(trip_id);
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
      <Card raised fluid centered className={"home-text-img-card-grid  trip-card-max-h"}>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={6} computer={3}>
            <Image centered src={!no_book || img ? get_img_url(img) : backend_url() + '/static/images/default_trips_image.jpg'} verticalAlign="middle" size="massive" className={"trip-card-img"}/>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={10} computer={11}>
            <Segment basic textAlign="left">
              {/* <Header as='h4' className={"booking-card-title"}>{this.tripTypeToName(trip_type, tripTypeOptions)}</Header> */}
              <p className={"trip-card-item-style"}><FormattedMessage
                id="trip_card.username"
                defaultMessage="User name"
              /> {creator_user_name}</p>
              {comeback_date ? <p className={"trip-card-item-style"}><FormattedMessage
                id="trip_card.comeback_date"
                defaultMessage="Comeback date"
              /> <FormattedDate
                  value={comeback_date}
                  year="numeric"
                  month="short"
                  day="numeric"
                  weekday="short"
                /></p> : ''}
              {depart_date ? <p className={"trip-card-item-style"}><FormattedMessage
                id="trip_card.depart_date"
                defaultMessage="Depart date"
              /> <FormattedDate
                  value={depart_date}
                  year="numeric"
                  month="short"
                  day="numeric"
                  weekday="short"
                /></p> : ''}
              <p className={"trip-card-item-style"}><FormattedMessage
                id="trip_card.departure"
                defaultMessage="Departure"
              /> {departure_location && departure_location['label'] ? departure_location['label'] : ''}</p>
              <p className={"trip-card-item-style"}><FormattedMessage
                id="trip_card.destination"
                defaultMessage="Destination"
              /> {destination_location && destination_location['label'] ? destination_location['label'] : ''}</p>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={2}>
            <Segment textAlign={"center"} basic>
            {no_book ? '' : <Button
              size="large"
              className={"buttoncolor trip-card-button"}
              onClick={this.handleBook.bind(this)}
            ><FormattedMessage
                id="trip_card.book"
                defaultMessage="Book"
              />
            </Button>}
            {!no_book ? '' : <Segment compact basic>
              <Button color='blue' icon='edit' className={"trip-card-delete-button"} onClick={this.updateTrip.bind(this)}/>
              <Button color='orange' icon='trash' className={"white-trash"} onClick={this.deleteTrip.bind(this)}/>
            </Segment>}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Card>
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

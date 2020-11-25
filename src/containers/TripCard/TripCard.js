import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Header,
  Segment,
  Image,
  Card,
  Button,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './tripcard.css';
import { backend_url, get_img_url } from "../../configurations";
import { openModalForTrip } from "../../store/actions/sendPackageModal";
import { openModalSelectReservations } from "../../store/actions/selectReservationsModal";
import {FormattedMessage, FormattedDate} from 'react-intl'
import { openDeleteTripConfirm, setTripDeleteTripConfirm } from "../../store/actions/deleteTripConfirm";
import { updateTripOpenModal, updateTripCloseModal } from "../../store/actions/updateTripModal";
import { tripTypeOptions } from "../../utils/options";


class TripCard extends React.Component {

  handleViewDetails = () => {
    console.log("view details");
  }

  handleBook = () => {
    console.log("book");
    const {trip_id} = this.props;
    // this.props.openPackageModalForTrip(trip_id);
    this.props.openReservationsList(trip_id);
  }

  deleteTrip = () => {
    const {pk, user_id} = this.props;
    this.props.setTripDeleteTripConfirm(pk);
    this.props.openDeleteTripConfirm();

  }

  updateTrip = () => {
    const {title, trip_type, depart_date, img, comeback_date, departure_location, destination_location, creator_user_name, no_book, pk} = this.props;
    const data = {
      "trip_type": trip_type,
      "departure_location": departure_location,
      "destination_location": destination_location,
      "depart_date": new Date(depart_date),
      "comeback_date": new Date(comeback_date),
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

    const {title, trip_type, depart_date, img, comeback_date, departure_location, destination_location, creator_user_name, no_book} = this.props;

    return (
      <Card raised fluid centered className={"home-text-img-card-grid  trip-card-max-h"}>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={6} computer={3}>
            <Image centered src={!no_book || img ? get_img_url(img) : backend_url() + '/static/images/default_trips_image.jpg'} verticalAlign="middle" size="massive" className={"trip-card-img"}/>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={10} computer={11}>
            <Segment basic textAlign="left">
              <Header as='h4' className={"booking-card-title"}>{this.tripTypeToName(trip_type, tripTypeOptions)}</Header>
              <p className={"trip-card-item-style"}>User name: {creator_user_name}</p>
              {comeback_date ? <p className={"trip-card-item-style"}>Comeback date: <FormattedDate
                                                                              value={comeback_date}
                                                                              year="numeric"
                                                                              month="short"
                                                                              day="numeric"
                                                                              weekday="short"
                                                                            /></p> : ''}
              {depart_date ? <p className={"trip-card-item-style"}>Depart date: <FormattedDate
                                                                              value={depart_date}
                                                                              year="numeric"
                                                                              month="short"
                                                                              day="numeric"
                                                                              weekday="short"
                                                                            /></p> : ''}
              <p className={"trip-card-item-style"}>Departure: {departure_location && departure_location['label'] ? departure_location['label'] : ''}</p>
              <p className={"trip-card-item-style"}>Destination: {destination_location && destination_location['label'] ? destination_location['label'] : ''}</p>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={2}>
            <Segment textAlign={"center"} basic>
            <Button icon labelPosition='right'
              size="large"
              className={"buttoncolor trip-card-button"}
              onClick={this.handleViewDetails.bind(this)}
            >
              <Icon name='eye' /> View
            </Button>
            {no_book ? '' : <Button icon labelPosition='right'
              size="large"
              className={"buttoncolor trip-card-button"}
              onClick={this.handleBook.bind(this)}
            >
              <Icon name='check' /> Book
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
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
  departure_location: PropTypes.string,
  destination_location: PropTypes.string,
  img: PropTypes.string,
  trip_id: PropTypes.number,
  no_book: PropTypes.boolean,
  pk: PropTypes.number,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripCard);

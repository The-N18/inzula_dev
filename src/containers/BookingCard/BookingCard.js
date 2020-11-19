import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Header,
  Segment,
  Image,
  Card,
  Checkbox,
  Button,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './bookingcard.css';
import { backend_url, get_img_url } from "../../configurations";
import { selectBooking } from "../../store/actions/selectReservationsModal";
import { openDeleteBookingConfirm, setBookingDeleteBookingConfirm } from "../../store/actions/deleteBookingConfirm";
import { setBookingRequestId, openProposePriceOnBooking } from "../../store/actions/proposePriceOnBooking";
import {FormattedMessage, FormattedDate} from 'react-intl'


class BookingCard extends React.Component {

  handleToggleCheckbox = (pk) => {
    const {selected} = this.props;
    const selectedBookings = [...selected];
    const index = selectedBookings.indexOf(pk);
    if(index === -1) {
      selectedBookings.push(pk)
    } else {
      selectedBookings.splice(index, 1);
    }
    this.props.selectBooking(selectedBookings);
  }

  deleteBooking = () => {
    const {pk} = this.props;
    this.props.setBookingDeleteBookingConfirm(pk);
    this.props.openDeleteBookingConfirm();

  }

  proposePriceOnBooking = () => {
    const {pk} = this.props;
    this.props.setBookingRequestId(pk);
    this.props.openProposePriceOnBooking();
  }

  render() {

    const {pk, title, description, img, arrival_date, departure_location, pickup_location, selectable, editable} = this.props;

    return (
      <Card raised fluid centered className={"home-text-img-card-grid max-h-190px"}>
        <Grid>
          <Grid.Row>
          {selectable ? <Grid.Column mobile={1} tablet={1} computer={1}>
            <Segment compact basic>
              <Checkbox onChange={this.handleToggleCheckbox.bind(this, pk)}/>
            </Segment>
          </Grid.Column> : ''}
          <Grid.Column mobile={16} tablet={16} computer={4}>
            <Segment basic textAlign="right">
              <Image centered src={img ? get_img_url(img) : backend_url() + '/static/images/default_booking_image.png'} rounded bordered verticalAlign="middle" size="massive" className={"booking-card-img"}/>
            </Segment>
          </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={selectable && editable ? 9 : 10}>
              <Segment basic textAlign="left">
                <Header as='h4' className={"booking-card-title"}>{title}</Header>
                <p className={"home-text-img-card-description"}>Description: {description}</p>
                <p className={"home-text-img-card-description"}>Arrival date: <FormattedDate
                                                                                value={arrival_date}
                                                                                year="numeric"
                                                                                month="long"
                                                                                day="numeric"
                                                                                weekday="long"
                                                                              /></p>
                <p className={"home-text-img-card-description"}>Departure: {departure_location}</p>
                <p className={"home-text-img-card-description"}>Pickup: {pickup_location}</p>
              </Segment>
            </Grid.Column>
            {!editable ? <Segment compact basic>
              <Button color='blue' icon='money' className={"white-trash"} onClick={this.proposePriceOnBooking.bind(this)}/>
            </Segment> : ''}
            {editable ? <Grid.Column mobile={2} tablet={2} computer={2}>
              <Segment compact basic>
                <Button color='blue' icon='edit' className={"booking-card-delete-button"}/>
                <Button color='orange' icon='trash' className={"white-trash"} onClick={this.deleteBooking.bind(this)}/>
              </Segment>
            </Grid.Column> : ''}
          </Grid.Row>
        </Grid>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    selected: state.selectReservationsModal.selected,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectBooking: (selected) => dispatch(selectBooking(selected)),
    openDeleteBookingConfirm: () => dispatch(openDeleteBookingConfirm()),
    openProposePriceOnBooking: () => dispatch(openProposePriceOnBooking()),
    setBookingRequestId: (bookingId) => dispatch(setBookingRequestId(bookingId)),
    setBookingDeleteBookingConfirm: (bookingId) => dispatch(setBookingDeleteBookingConfirm(bookingId)),
  };
};

BookingCard.propTypes = {
  title: PropTypes.string,
  desctiption: PropTypes.string,
  arrival_date: PropTypes.string,
  departure_location: PropTypes.string,
  pickup_location: PropTypes.string,
  img: PropTypes.string,
  selectable: PropTypes.boolean,
  editable: PropTypes.boolean,
  pk: PropTypes.number,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingCard);

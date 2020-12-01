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
import { updateBookingOpenModal, updateBookingCloseModal } from "../../store/actions/updateBookingModal";
import { optionToText, sizeOptions, sizeOptionsFr, categoryOptions, categoryOptionsFr, weightOptions, weightOptionsFr, valueOptions, valueOptionsFr } from "../../utils/options";
import {createNotification, NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notify';


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

  validateBooking = () => {
    console.log("validate booking");
  }

  declineBooking = () => {
    console.log("decline booking");
  }

  updateBooking = () => {
    const {title, departure_location, destination_location, pk, product_details} = this.props;
    const data = {
      "product_name": title,
      "departure_location": product_details['departure_location'],
      "destination_location": product_details['destination_location'],
      "delivery_date": new Date(product_details['arrival_date']),
      "recipient_phone_number": product_details['recipient_phone_number'],
      "recipient_name": product_details['recipient_name'],
      "product_value": product_details['price'],
      "product_category": product_details['product_category'],
      "product_size": product_details['space'],
      "product_weight": product_details['weight'],
      "proposed_price": product_details['proposed_price'],
      "product_description": product_details['description'],
    };
    this.props.updateBookingOpenModal(data, pk);
  }

  proposePriceOnBooking = () => {
    const {pk, authenticated} = this.props;
    if(authenticated) {
      this.props.setBookingRequestId(pk);
      this.props.openProposePriceOnBooking();
    } else {
      createNotification({
        message: 'Please login to propose a price on this request.',
        type: NOTIFICATION_TYPE_SUCCESS,
        duration: 30000,
        canDismiss: true,
      });
    }

  }

  render() {

    const {pk, title, description, img, product_details,
      arrival_date, departure_location, selectable, editable,
      destination_location, weight, space, price, product_category,
      proposed_price, validate_decline, can_propose, lang} = this.props;

    return (
      <Card raised fluid centered className={"home-text-img-card-grid booking-card-max-h"}>
        <Grid>
          <Grid.Row>
          {selectable ? <Grid.Column mobile={1} tablet={1} computer={1}>
            <Segment compact basic>
              <Checkbox onChange={this.handleToggleCheckbox.bind(this, pk)}/>
            </Segment>
          </Grid.Column> : ''}
          <Grid.Column mobile={16} tablet={16} computer={4}>
            <Segment basic textAlign="right">
              <Image centered src={img ? get_img_url(img) : backend_url() + '/static/images/default_booking_image.png'} verticalAlign="middle" size="massive" className={"booking-card-img"}/>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={selectable && editable ? 5 : 6}>
            <Segment basic textAlign="left">
              <Header as='h4' className={"booking-card-title"}>{title}</Header>
              <p className={"booking-card-items-style"}><FormattedMessage
                id="booking_card.description"
                defaultMessage="Description:"
              /> {description}</p>
              <p className={"booking-card-items-style"}><FormattedMessage
                id="booking_card.arrival_date"
                defaultMessage="Arrival date:"
              /> <FormattedDate
                                                                              value={arrival_date}
                                                                              year="numeric"
                                                                              month="short"
                                                                              day="numeric"
                                                                              weekday="short"
                                                                            /></p>
                                                                          <p className={"booking-card-items-style"}>Departure: {departure_location && departure_location["label"] ? departure_location["label"] : ""}</p>
              <p className={"booking-card-items-style"}><FormattedMessage
                id="booking_card.pickup_loc"
                defaultMessage="Pickup location:"
              /> {destination_location && destination_location["label"] ? destination_location["label"] : ""}</p>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Segment basic textAlign="left">
              <p className={"booking-card-items-style"}><FormattedMessage
                id="booking_card.weight"
                defaultMessage="Weight:"
              /> {optionToText(weight, lang === "fr" ? weightOptionsFr : weightOptions)}</p>
              <p className={"booking-card-items-style"}><FormattedMessage
                id="booking_card.size"
                defaultMessage="Size:"
              /> {optionToText(space, lang === "fr" ? sizeOptionsFr : sizeOptions)}</p>
              <p className={"booking-card-items-style"}><FormattedMessage
                id="booking_card.category"
                defaultMessage="Category:"
              /> {optionToText(product_category, lang === "fr" ? categoryOptionsFr : categoryOptions)}</p>
              <p className={"booking-card-items-style"}><FormattedMessage
                id="booking_card.value"
                defaultMessage="Value:"
              /> {optionToText(price, lang === "fr" ? valueOptionsFr : valueOptions)}</p>
              <p className={"booking-card-items-style"}><FormattedMessage
                id="booking_card.price"
                defaultMessage="Price:"
              /> {proposed_price} euros</p>
            </Segment>
          </Grid.Column>
            {can_propose ? <Segment compact basic className={"sub-btn-style"}>
              <Button color='blue' icon='money' className={"white-trash"} onClick={this.proposePriceOnBooking.bind(this)}/>
            </Segment> : ''}
            {editable ? <Grid.Column mobile={2} tablet={2} computer={2}>
              <Segment compact basic className={"sub-btn-style"}>
                <Button color='blue' icon='edit' className={"booking-card-delete-button"}  onClick={this.updateBooking.bind(this)}/>
                <Button color='orange' icon='trash' className={"white-trash"} onClick={this.deleteBooking.bind(this)}/>
              </Segment>
            </Grid.Column> : ''}
            {validate_decline ? <Grid.Column mobile={2} tablet={2} computer={2}>
              <Segment compact basic className={"sub-btn-style"}>
                <Button size="mini"
                  color='blue'
                  className={"booking-card-delete-button"}
                  onClick={this.validateBooking.bind(this)}
                ><FormattedMessage
                  id="booking_card.validate"
                  defaultMessage="Validate"
                />
                </Button>

                <Button size="mini"
                  color='orange'
                  className={"white-trash"}
                  onClick={this.declineBooking.bind(this)}
                ><FormattedMessage
                  id="booking_card.decline"
                  defaultMessage="Decline"
                />
                </Button>
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
    authenticated: state.auth.token !== null,
    lang: state.appConfig.lang
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectBooking: (selected) => dispatch(selectBooking(selected)),
    openDeleteBookingConfirm: () => dispatch(openDeleteBookingConfirm()),
    openProposePriceOnBooking: () => dispatch(openProposePriceOnBooking()),
    setBookingRequestId: (bookingId) => dispatch(setBookingRequestId(bookingId)),
    updateBookingOpenModal: (bookingInfo, pk) => dispatch(updateBookingOpenModal(bookingInfo, pk)),
    setBookingDeleteBookingConfirm: (bookingId) => dispatch(setBookingDeleteBookingConfirm(bookingId)),
  };
};

BookingCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  arrival_date: PropTypes.string,
  departure_location: PropTypes.object,
  destination_location: PropTypes.object,

  weight: PropTypes.string,
  space: PropTypes.string,
  price: PropTypes.string,
  product_category: PropTypes.string,
  proposed_price: PropTypes.string,

  product_details: PropTypes.object,
  img: PropTypes.string,
  selectable: PropTypes.boolean,
  editable: PropTypes.boolean,
  validate_decline: PropTypes.boolean,
  can_propose: PropTypes.boolean,
  pk: PropTypes.number,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingCard);

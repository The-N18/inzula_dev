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
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './bookingcard.css';
import { backend_url, mimic_img } from "../../configurations";
import { selectBooking } from "../../store/actions/selectReservationsModal";
import { openDeleteBookingConfirm, setBookingDeleteBookingConfirm } from "../../store/actions/deleteBookingConfirm";
import { setBookingRequestId, openProposePriceOnBooking } from "../../store/actions/proposePriceOnBooking";
import {FormattedMessage, FormattedDate} from 'react-intl'
import { updateBookingOpenModal } from "../../store/actions/updateBookingModal";
import { optionToText, sizeOptions, sizeOptionsFr, categoryOptions, categoryOptionsFr, weightOptions, weightOptionsFr, valueOptions, valueOptionsFr } from "../../utils/options";
import {createNotification, NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notify';
import { openDeclineBooking, setBookingDeclineBooking } from "../../store/actions/declineBooking";
import { openValidateBooking, setBookingValidateBooking } from "../../store/actions/validateBooking";
import { openCancelBooking, setBookingCancelBooking, getRefundAmt } from "../../store/actions/cancelBooking";
import { openProductDeliveryModal } from "../../store/actions/productDeliveryModal";
import { Carousel } from "react-responsive-carousel";
// import 'react-responsive-carousel/lib/styles/carousel.css';

import $ from "jquery";

class BookingCard extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    isMobile: false,
    isTablet: false,
    width: 0
  };

  handleScreenSize = () => {
    this.setState({width: $(window).width()});
    if($(window).width() < 768) {
      this.setState({ isMobile: true, isTablet: false });
    }
    if($(window).width() >= 768) {
      this.setState({ isTablet: true, isMobile: false });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreenSize);
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
    }

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
    const {pk} = this.props;
    this.props.setBookingValidateBooking(pk);
    this.props.openValidateBooking();
  }

  declineBooking = () => {
    const {pk} = this.props;
    this.props.setBookingDeclineBooking(pk);
    this.props.openDeclineBooking();
  }

  cancelBooking = () => {
    const {pk} = this.props;
    this.props.setBookingCancelBooking(pk);
    this.props.getRefundAmt(pk);
    this.props.openCancelBooking();
  }

  updateBooking = () => {
    const {title, pk, product_details} = this.props;
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
      "images": mimic_img(product_details['images']),
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

  productDelivered = () => {
    const {pk, authenticated} = this.props;
    if(authenticated) {
      this.props.openProductDeliveryModal();
    } else {
      createNotification({
        message: 'Please login to enter the delivery code',
        type: NOTIFICATION_TYPE_SUCCESS,
        duration: 30000,
        canDismiss: true,
      });
    }
  }

  computeSliderWidth = () => {
    const {width} = this.state;
    if(width <= 767) {
      return width - 66;
    }
    if(width === 1024) {
      return 194;
    }
    if(width > 767) {
      return 260;
    }
    return 260;
  }

  render() {

    const {pk, title, description, images,
      arrival_date, departure_location, selectable, editable, recipient_phone_number, recipient_name,
      destination_location, weight, space, price, product_category, request_by_username,
      proposed_price, validate_decline, can_propose, lang, status, confirmed_by_sender} = this.props;
    const colored = validate_decline ? confirmed_by_sender ? 'green' : 'orange' : '';

    return (
      <Card raised fluid centered className={"home-text-img-card-grid booking-card-max-h"} color={colored}>
        <Grid>
          <Grid.Row>
          {selectable ? <Grid.Column mobile={1} tablet={1} computer={1}>
            <Segment compact basic>
              <Checkbox onChange={this.handleToggleCheckbox.bind(this, pk)}/>
            </Segment>
          </Grid.Column> : ''}
          <Grid.Column mobile={16} tablet={16} computer={4}>
            <Segment basic textAlign="right">
              {images && images.length === 0 && <Image centered src={backend_url() + '/static/images/default_booking_image.png'} verticalAlign="middle" size="massive" className={"booking-card-img"}/>}
            {images && images.length > 0 ? <Carousel autoPlay>
              {images.map((item, index) => {
                return (
                  <Image centered alt="" src={item.url} verticalAlign="middle" size="massive" className={"booking-card-img"}/>
                );
              })}
            </Carousel> : ''}
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
                id="booking_card.username"
                defaultMessage="Username:"
              /> {request_by_username}</p>
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
              <p className={"booking-card-items-style"}><FormattedMessage
                id="booking_card.departure_loc"
                defaultMessage="Departure:"
              /> {departure_location && departure_location["label"] ? departure_location["label"] : ""}</p>
              <p className={"booking-card-items-style"}><FormattedMessage
                id="booking_card.pickup_loc"
                defaultMessage="Pickup location:"
              /> {destination_location && destination_location["label"] ? destination_location["label"] : ""}</p>
              <p className={"booking-card-items-style"}><FormattedMessage
                id="booking_card.recipient_name"
                defaultMessage="Recipient:"
              /> {recipient_name}</p>
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
              <p className={"booking-card-items-style"}><FormattedMessage
                id="booking_card.recipient_phone_number"
                defaultMessage="Recipient Phone:"
              /> {recipient_phone_number}</p>
            </Segment>
          </Grid.Column>
            {can_propose ? <Segment compact basic className={"sub-btn-style"}>
              <Button color='blue' icon='money' className={"white-trash"} onClick={this.proposePriceOnBooking.bind(this)}/>
            </Segment> : ''}
            {editable && status !== "boo" && status !== "awa" && status !== "col" && status !== "del" ? <Grid.Column mobile={2} tablet={2} computer={2}>
              <Segment compact basic className={"sub-btn-style"}>
                <Button color='blue' icon='edit' className={"booking-card-delete-button"}  onClick={this.updateBooking.bind(this)}/>
                <Button color='orange' icon='trash' className={"white-trash"} onClick={this.deleteBooking.bind(this)}/>
                {status === "boo" || status === "awa" ? <Button size="mini"
                  color='orange'
                  className={"white-trash"}
                  onClick={this.cancelBooking.bind(this)}
                ><FormattedMessage
                  id="booking_card.cancel_booking"
                  defaultMessage="Cancel"
                />
                </Button> : ''}
              </Segment>
            </Grid.Column> : ''}
            {editable && status !== "del" && status !== "cre" ? <Grid.Column mobile={2} tablet={2} computer={2}>
              <Segment compact basic className={"sub-btn-style"}>
                {status === "boo" || status === "awa" ? <Button size="mini"
                  color='orange'
                  className={"white-trash"}
                  onClick={this.cancelBooking.bind(this)}
                ><FormattedMessage
                  id="booking_card.cancel_booking"
                  defaultMessage="Cancel"
                />
                </Button> : ''}
              </Segment>
            </Grid.Column> : ''}
            {validate_decline ? <Grid.Column mobile={2} tablet={2} computer={2}>
              <Segment compact basic className={"sub-btn-style"}>
                <Button size="mini"
                  color='blue'
                  className={"booking-card-delete-button"}
                  onClick={this.validateBooking.bind(this)}
                  disabled={confirmed_by_sender || status === "awa" || status === "del"}
                ><FormattedMessage
                  id="booking_card.validate"
                  defaultMessage="Validate"
                />
                </Button>

                {confirmed_by_sender ? <Button size="mini"
                  color='blue'
                  className={"booking-card-delete-button"}
                  onClick={this.productDelivered.bind(this)}
                  disabled={status === "del"}
                ><FormattedMessage
                  id="booking_card.product_delivered"
                  defaultMessage="Product delivered"
                />
                </Button> : ""}

                <Button size="mini"
                  color='orange'
                  className={"white-trash"}
                  onClick={this.declineBooking.bind(this)}
                  disabled={status === "del"}
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
    setBookingValidateBooking: (pk) => dispatch(setBookingValidateBooking(pk)),
    setBookingDeclineBooking: (pk) => dispatch(setBookingDeclineBooking(pk)),
    setBookingCancelBooking: (pk) => dispatch(setBookingCancelBooking(pk)),
    openCancelBooking: () => dispatch(openCancelBooking()),
    getRefundAmt: (pk) => dispatch(getRefundAmt(pk)),
    openValidateBooking: () => dispatch(openValidateBooking()),
    openProductDeliveryModal: () => dispatch(openProductDeliveryModal()),
    openDeclineBooking: () => dispatch(openDeclineBooking()),
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
  images: PropTypes.array,

  request_by: PropTypes.string,
  request_by_username: PropTypes.string,
  recipient_name: PropTypes.string,
  recipient_phone_number: PropTypes.string,

  confirmed_by_sender: PropTypes.boolean,
  status: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingCard);

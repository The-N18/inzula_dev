import React from "react";
import PropTypes from "prop-types";
import {
  Card,
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './notifcard.css';
import {FormattedMessage, FormattedDate} from 'react-intl'


class NotifCard extends React.Component {

  markAsSeen = () => {
    console.log("mark this notification as seen");
  }

  render() {

    const {creator_username, created_on, type, trip_dep_date, product_name, trip_dep_loc, trip_des_loc, offer_price} = this.props;
    return (
      <Card raised fluid centered className={"notif-card"}>
        <Card.Content>
          <Card.Header>
          {created_on !== "" ? <span><FormattedMessage
            id="notif_card.created_on"
            defaultMessage="On: "
          />
          <FormattedDate
            value={created_on}
            year="numeric"
            month="long"
            day="numeric"
            weekday="long"
            hour="numeric"
            minute="numeric"
            second="numeric"
          /> | </span> : ''}
          {creator_username !== "" && type !== "request_declined" ? <span><FormattedMessage
            id="notif_card.created_by"
            defaultMessage="By: "
          /> {creator_username} | </span> : ''}
          {type === "trip_booked" ?
            <FormattedMessage
              id="notif_card.trip_booked"
              defaultMessage="Your trip has been booked"
            /> : ''}
            {type === "payment_for_booking" ?
            <FormattedMessage
              id="notif_card.payment_for_booking"
              defaultMessage="Paid for booking"
            /> : ''}
            {type === "offer_rec" ?
            <FormattedMessage
              id="notif_card.offer_rec"
              defaultMessage="You have recieved an offer for this request"
            /> : ''}
            {type === "request_validated" ?
            <FormattedMessage
              id="notif_card.request_validated"
              defaultMessage="Your booking request has been validated by sender."
            /> : ''}
            {type === "request_declined" ?
            <FormattedMessage
              id="notif_card.request_declined"
              values={{ username: `${creator_username}`}}
              defaultMessage="Your booking request has been declined by the sender"
            /> : ''}
            {type === "request_cancelled" ?
            <FormattedMessage
              id="notif_card.request_cancelled"
              defaultMessage="You have cancelled your booking request."
            /> : ''}
            {type === "payment_for_delivery" ?
            <FormattedMessage
              id="notif_card.payment_for_delivery"
              defaultMessage="You have received a payment for the delivery you made."
            /> : ''}
            {type === "product_delivered" ?
            <FormattedMessage
              id="notif_card.product_delivered"
              defaultMessage="Your product has been delivered."
            /> : ''}
            {/*<div className={"notif_card_btns"}>
              <Button color='blue' icon='eye' onClick={this.markAsSeen.bind(this)} title={"mark as seen"}/>
            </div>*/}
          </Card.Header>
          <Card.Description>
            {trip_dep_date !== "" ? <span><FormattedMessage
              id="notif_card.date"
              defaultMessage="Date: "
            />
            <FormattedDate
              value={trip_dep_date}
              year="numeric"
              month="long"
              day="numeric"
              weekday="long"
            /> | </span> : ''}<FormattedMessage
              id="notif_card.product"
              defaultMessage="Product: "
            /> {product_name} {trip_dep_loc !== "" && trip_des_loc !== "" ? <span> | <FormattedMessage
              id="notif_card.trip"
              defaultMessage="Trip: "
            />{trip_dep_loc} - {trip_des_loc}</span> : ''}
            {offer_price !== "" ? <span> | <FormattedMessage
              id="notif_card.offer_price"
              defaultMessage="Price: "
            />{offer_price} euros</span> : ''}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

NotifCard.propTypes = {
  pk: PropTypes.number,
  trip_id: PropTypes.number,
  booking_request_id: PropTypes.number,
  type: PropTypes.string,
  status: PropTypes.string,
  product_name: PropTypes.string,
  trip_dep_loc: PropTypes.string,
  trip_des_loc: PropTypes.string,
  trip_dep_date: PropTypes.string,
  created_on: PropTypes.string,
  creator_username: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotifCard);

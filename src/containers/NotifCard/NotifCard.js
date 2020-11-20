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
import styles from './notifcard.css';
import { backend_url, get_img_url } from "../../configurations";
import {FormattedMessage, FormattedDate} from 'react-intl'


class NotifCard extends React.Component {

  markAsSeen = () => {
    console.log("mark this notification as seen");
    const {pk} = this.props;

  }

  render() {

    const {pk, type, trip_dep_date, product_name, trip_dep_loc, trip_des_loc, offer_price} = this.props;
    return (
      <Card raised fluid centered className={"notif-card"}>
        <Card.Content>
          <Card.Header>
            {type === "trip_booked" ?
            <FormattedMessage
              id="notif_card.trip_booked"
              defaultMessage="Your trip has been booked"
            /> : ''}
            {type === "offer_rec" ?
            <FormattedMessage
              id="notif_card.offer_rec"
              defaultMessage="You have recieved an offer for this request"
            /> : ''}
            <div className={"notif_card_btns"}>
              <Button color='blue' icon='eye' onClick={this.markAsSeen.bind(this)} title={"mark as seen"}/>
            </div>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotifCard);

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
      <div className="comment-box d-flex align-items-center justify-content-between">
        <div className="comment-image">
          <img src="/images/team/img1.jpg" alt="image" />
        </div>
        <div className="comment-content">
          {creator_username !== "" && type !== "request_declined" ?
            <h5 className="m-0">{creator_username}</h5>: ''}
          {created_on !== "" ?
          <p className="comment-date mb-2">
            <FormattedDate
              value={created_on}
              year="numeric"
              month="long"
              day="numeric"
              weekday="long"
              hour="numeric"
              minute="numeric"
              second="numeric"
            />
          </p>: ''}
          {/* <span className="num-rating white">4.6/5</span>
          <span className="comment-title"><i>"Was too noisy and not suitable for business meetings"</i></span> */}
          <p className="comment mt-2">
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
          </p>
        </div>
      </div>
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

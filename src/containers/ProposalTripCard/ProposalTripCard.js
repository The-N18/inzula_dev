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
import {FormattedMessage, FormattedDate} from 'react-intl'
import {createNotification, NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notify';
import {openCompleteProfileModal} from "../../store/actions/completeProfileModal";

class ProposalTripCard extends React.Component {



  render() {

    const {depart_date, img, comeback_date, departure_location, destination_location, creator_user_name, onclick} = this.props;

    return (
      <Card raised fluid centered className={"home-text-img-card-grid  trip-card-max-h"} onClick={onclick}>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={6} computer={3}>
            <Image centered src={backend_url() + '/static/images/default_trips_image.jpg'} verticalAlign="middle" size="massive" className={"trip-card-img"}/>
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
  };
};

ProposalTripCard.propTypes = {
  trip_type: PropTypes.string,
  comeback_date: PropTypes.string,
  creator_user_name: PropTypes.string,
  depart_date: PropTypes.string,
  departure_location: PropTypes.object,
  destination_location: PropTypes.object,
  img: PropTypes.string,
  trip_id: PropTypes.number,
  pk: PropTypes.number,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposalTripCard);

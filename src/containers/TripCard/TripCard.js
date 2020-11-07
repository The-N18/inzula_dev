import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Header,
  Segment,
  Image,
  Card
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './tripcard.css';
import { backend_url } from "../../configurations";


class TripCard extends React.Component {


  render() {

    const {title, trip_type, depart_date, img, comeback_date, departure_location, destination_location, username} = this.props;

    return (
      <Card raised fluid centered className={"home-text-img-card-grid"}>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} tablet={16} computer={5}>
            <Segment basic textAlign="right">
              <Image centered src={backend_url() + img} rounded bordered verticalAlign="middle" size="massive"/>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={11}>
            <Segment basic textAlign="left">
              <Header as='h4' className={"booking-card-title"}>{trip_type}</Header>
              <p className={"home-text-img-card-description"}>User name: {username}</p>
              <p className={"home-text-img-card-description"}>Comeback date: {comeback_date}</p>
              <p className={"home-text-img-card-description"}>Depart date: {depart_date}</p>
              <p className={"home-text-img-card-description"}>Departure: {departure_location}</p>
              <p className={"home-text-img-card-description"}>Destination: {destination_location}</p>
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
  return {};
};

TripCard.propTypes = {
  trip_type: PropTypes.string,
  comeback_date: PropTypes.string,
  username: PropTypes.string,
  depart_date: PropTypes.string,
  departure_location: PropTypes.string,
  destination_location: PropTypes.string,
  img: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripCard);

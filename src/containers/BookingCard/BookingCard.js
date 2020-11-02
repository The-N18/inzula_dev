import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Header,
  Segment,
  Image,
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './bookingcard.css';
import { backend_url } from "../../configurations";


class BookingCard extends React.Component {


  render() {

    const {title, description, img, arrival_date, departure_location, pickup_location} = this.props;

    return (
      <Segment basic>
      <Grid className={"home-text-img-card-grid"}>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <Segment basic textAlign="left">
              <Header as='h4' className={"home-text-img-card-title"}>{title}</Header>
              <p className={"home-text-img-card-description"}>Description: {description}</p>
              <p className={"home-text-img-card-description"}>Arrival date: {arrival_date}</p>
              <p className={"home-text-img-card-description"}>Departure: {departure_location}</p>
              <p className={"home-text-img-card-description"}>Pickup: {pickup_location}</p>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <Segment basic textAlign="right">
              <Image centered src= {backend_url() + img} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

BookingCard.propTypes = {
  title: PropTypes.string,
  desctiption: PropTypes.string,
  arrival_date: PropTypes.string,
  departure_location: PropTypes.string,
  pickup_location: PropTypes.string,
  img: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingCard);

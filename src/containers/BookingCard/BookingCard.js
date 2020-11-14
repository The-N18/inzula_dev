import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Header,
  Segment,
  Image,
  Card,
  Checkbox
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './bookingcard.css';
import { backend_url } from "../../configurations";
import { selectBooking } from "../../store/actions/selectReservationsModal";


class BookingCard extends React.Component {

  handleToggleCheckbox = (pk) => {
    console.log("Selected booking " + pk);
    const {selected} = this.props;
    const selectedBookings = [...selected];
    const index = selectedBookings.indexOf(pk);
    if(index === -1) {
      selectedBookings.push(pk)
    } else {
      selectedBookings.splice(index, 1);
    }
    console.log(selectedBookings)
    this.props.selectBooking(selectedBookings);
  }

  render() {

    const {pk, title, description, img, arrival_date, departure_location, pickup_location, selectable} = this.props;

    return (
      <Card raised fluid centered className={"home-text-img-card-grid"}>
      <Grid>
        <Grid.Row columns={selectable ? 3: 2}>
        {selectable ? <Grid.Column mobile={1} tablet={1} computer={1}>
          <Segment compact basic>
            <Checkbox onChange={this.handleToggleCheckbox.bind(this, pk)}/>
          </Segment>
        </Grid.Column> : ''}
        <Grid.Column mobile={16} tablet={16} computer={4}>
          <Segment basic textAlign="right">
            <Image centered src={backend_url() + img} rounded bordered verticalAlign="middle" size="massive"/>
          </Segment>
        </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={11}>
            <Segment basic textAlign="left">
              <Header as='h4' className={"booking-card-title"}>{title}</Header>
              <p className={"home-text-img-card-description"}>Description: {description}</p>
              <p className={"home-text-img-card-description"}>Arrival date: {arrival_date}</p>
              <p className={"home-text-img-card-description"}>Departure: {departure_location}</p>
              <p className={"home-text-img-card-description"}>Pickup: {pickup_location}</p>
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
    selected: state.selectReservationsModal.selected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectBooking: (selected) => dispatch(selectBooking(selected))
  };
};

BookingCard.propTypes = {
  title: PropTypes.string,
  desctiption: PropTypes.string,
  arrival_date: PropTypes.string,
  departure_location: PropTypes.string,
  pickup_location: PropTypes.string,
  img: PropTypes.string,
  selectable: PropTypes.boolean
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingCard);

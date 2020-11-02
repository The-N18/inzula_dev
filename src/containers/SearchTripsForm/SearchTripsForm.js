import React from "react";
import {
  Button,
  Form,
  Header,
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { searchTrips } from "../../store/actions/searchBookings";
import styles from './searchtripsform.css';
import { DateInput } from 'semantic-ui-calendar-react';
import BookingCard from "../../containers/BookingCard/BookingCard";

class SearchTripsForm extends React.Component {

  state = {
    departure_location: "",
    destination_location: "",
    travel_date: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDateTimeChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { departure_location, destination_location, travel_date } = this.state;
    this.props.findTrip(departure_location, destination_location, travel_date);
  };

  render() {
    const { loading, error, bookings } = this.props;
    const { departure_location, destination_location, travel_date } = this.state;
    return (
      <Segment>
          <Header as="h4" textAlign="center">
            Prefer to know what shipping offers are available before committing?
          </Header>
          <Header as="h4" textAlign="center">
            No worries, you can add the country of departure and destination of your trip and thus access the requests for available expeditions.
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input
                onChange={this.handleChange}
                value={departure_location}
                name="departure_location"
                fluid
                icon="map pin"
                iconPosition="left"
                placeholder="Departure"
              />
              <Form.Input
                onChange={this.handleChange}
                fluid
                value={destination_location}
                name="destination_location"
                icon="map pin"
                iconPosition="left"
                placeholder="Destination"
              />
              <DateInput
                name="travel_date"
                placeholder="Travel Date"
                value={travel_date}
                iconPosition="left"
                onChange={this.handleDateTimeChange}
                dateFormat="YYYY-MM-DD"
              />
            </Form.Group>
            <Button
              size="big"
              loading={loading}
              disabled={loading}
              className={"buttoncolor search-trips-button"}
            >
              Search
            </Button>
          </Form>
          {bookings.length > 0 ? <Segment raised>
            {/*bookings.forEach((item) => {
              console.log(item["product"]["name"]);
              return (<BookingCard title={item["product"]["name"]}/>);
            })*/}
            {bookings.map((item, i) => {
               console.log(item["product"]["name"]);
               // Return the element. Also pass key
               return (<BookingCard
                 title={item["product"]["name"]}
                 arrival_date={item["product"]["arrival_date"]}
                 description={item["product"]["description"]}
                 departure_location={item["product"]["departure_location"]["city"]}
                 pickup_location={item["product"]["pickup_location"]["city"]}/>);
            })}
          </Segment> : ''}
        </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.searchBookings.loading,
    error: state.searchBookings.error,
    bookings: state.searchBookings.bookings,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    findTrip: (departure_location, destination_location, travel_date) => dispatch(searchTrips(departure_location, destination_location, travel_date))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchTripsForm);

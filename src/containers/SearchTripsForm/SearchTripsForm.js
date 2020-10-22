import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
  Container
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { searchTrips } from "../../store/actions/auth";
import styles from './searchtripsform.css';

class SearchTripsForm extends React.Component {

  state = {
    departure_location: "",
    destination_location: "",
    travel_date: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { departure_location, destination_location, travel_date } = this.state;
    this.props.findTrip(departure_location, destination_location, travel_date);
  };

  render() {
    const { error, loading, token } = this.props;
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
              <Form.Input
                onChange={this.handleChange}
                fluid
                value={travel_date}
                name="travel_date"
                icon="calendar alternate outline"
                iconPosition="left"
                placeholder="Travel Date"
              />
            </Form.Group>
            <Button
              size="large"
              fluid
              loading={loading}
              disabled={loading}
              className={"buttoncolor search-button"}
            >
              Search
            </Button>
          </Form>
        </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
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

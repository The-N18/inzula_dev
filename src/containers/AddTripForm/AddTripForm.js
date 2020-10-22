import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
  Container,
  Radio
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { tripAddition } from "../../store/actions/auth";
import styles from './addtripform.css';

class AddTripForm extends React.Component {

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
    this.props.addTrip(departure_location, destination_location, travel_date);
  };

  render() {
    const { error, loading, token } = this.props;
    const { departure_location, destination_location, travel_date } = this.state;
    return (
      <Segment style={{ padding: "2em 0em" }} vertical>
        <Segment basic className={"segment-bg-img"}>
        <Grid verticalAlign="middle">
          <Grid.Row verticalAlign="middle" className={"add-trip-grid"}>
            <Grid.Column  mobile={16} tablet={8} computer={8} textAlign="center" verticalAlign="middle" className={"add-trip-grid-column"}>
              <Segment basic>
              <Header as="h2" textAlign="center">
                Earn money every time you travel.
              </Header>
              <Header as="h4" textAlign="center">
                Deliver parcels to individuals wishing to ship at low prices and amortize your travel costs.
              </Header>
              <Button
                size="small"
                className={"buttoncolor search-button"}
              >
                How does it work?
              </Button>
              </Segment>
            </Grid.Column>
            <Grid.Column  mobile={16} tablet={8} computer={8} className={"add-trip-grid-column"}>
            <Segment>
            <Header as="h4" textAlign="center" className={"add-trip-form-header"}>
              Add information about your trip to earn money.
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Form.Group widths='equal'>
                <Form.Field>
                  <Radio
                    label='Round trip'
                    name='radioGroup'
                    value='round_trip'
                    checked={this.state.value === 'round_trip'}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label='One way'
                    name='radioGroup'
                    value='one_way_trip'
                    checked={this.state.value === 'one_way_trip'}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                </Form.Group>
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
              <Button
                size="large"
                fluid
                loading={loading}
                disabled={loading}
                className={"buttoncolor search-button"}
              >
                Add your trip
              </Button>
            </Form>
            </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Segment>
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
    addTrip: (departure_location, destination_location, travel_date) => dispatch(tripAddition(departure_location, destination_location, travel_date))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTripForm);

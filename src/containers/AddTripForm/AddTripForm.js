import React, { useState } from "react";
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
import { NavLink, Redirect, withRouter } from "react-router-dom";
import { tripAddition } from "../../store/actions/auth";
import styles from './addtripform.css';
import Recaptcha from 'react-recaptcha';
import DateTimePicker from 'react-datetime-picker';

class AddTripForm extends React.Component {

  constructor(props) {
    super(props)

    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);

  }

  recaptchaLoaded() {
    console.log('capcha successfully loaded');
  }

  handleSubscribe() {
    if (this.state.isVerified) {
      alert('You have successfully subscribed!');
    } else {
      alert('Please verify that you are a human!');
    }
  }

  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true
      })
    }
  }


  state = {
    departure_location: "",
    destination_location: "",
    travel_date: "",
    isVerified: false,
    trip_type: "round_trip"
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDateTimeChange = e => {
    console.log(e);
    console.log(new Date(e));
  }

  handleRadioChange = (e, data) => {
    console.log(data.value);
    this.setState({ trip_type: data.value });
  };

  handleRedirectToLogin = (url) => {
    this.props.history.push(url);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { departure_location, destination_location, travel_date } = this.state;
    if(this.props.authenticated) {
      this.props.addTrip(departure_location, destination_location, travel_date);
    } else {
      this.handleRedirectToLogin('/login');
    }
  };

  // const [value, onChange] = useState(new Date());

  render() {
    const { error, loading, token, authenticated } = this.props;
    const { departure_location, destination_location, travel_date } = this.state;
    return (
      <Segment style={{ padding: "2em 0em" }} vertical>
        <Segment basic className={"segment-bg-img"}>
        <Grid verticalAlign="middle">
          <Grid.Row verticalAlign="middle" className={"add-trip-grid"}>
            <Grid.Column  mobile={16} tablet={16} computer={8} textAlign="center" verticalAlign="middle" className={"add-trip-grid-column"}>
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
            <Grid.Column  mobile={16} tablet={16} computer={8} className={"add-trip-grid-column"}>
            <Segment>
            <Header as="h4" textAlign="center" className={"add-trip-form-header"}>
              Add information about your trip to earn money.
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment basic textAlign="center">
              <Form.Group widths='equal'>
                <Form.Field>
                  <Radio
                    label='Round trip'
                    name='radioGroup'
                    value='round_trip'
                    checked={this.state.trip_type === 'round_trip'}
                    onChange={this.handleRadioChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label='One way'
                    name='radioGroup'
                    value='one_way_trip'
                    checked={this.state.trip_type === 'one_way_trip'}
                    onChange={this.handleRadioChange}
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
                <DateTimePicker
                  onChange={this.handleDateTimeChange}
                  value={travel_date}
                  maxDetail={"second"}
                  disableClock={"true"}
                />
              <Recaptcha
                sitekey="6LfycNoZAAAAADPAHBVK7JjxT8V6AvayfwhVaHQa"
                render="explicit"
                onloadCallback={this.recaptchaLoaded}
                verifyCallback={this.verifyCallback}
              />
              <Button
                size="large"
                loading={loading}
                disabled={loading}
                className={"buttoncolor transport-add-trip-button"}
              >
                Add your trip
              </Button>
              </Segment>
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
    token: state.auth.token,
    authenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTrip: (departure_location, destination_location, travel_date) => dispatch(tripAddition(departure_location, destination_location, travel_date))
  };
};

export default withRouter(
connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTripForm)
);

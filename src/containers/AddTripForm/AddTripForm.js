import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Radio
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { tripAddition } from "../../store/actions/auth";
import styles from './addtripform.css';
import Recaptcha from 'react-recaptcha';
import { DateInput } from 'semantic-ui-calendar-react';
import CSRFToken from "../../containers/CSRFToken";
import DjangoCSRFToken from 'django-react-csrftoken';
import {createNotification, NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notify';

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
    depart_date: "",
    comeback_date: null,
    isVerified: false,
    trip_type: "round_trip",
    created_by: null
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRadioChange = (e, data) => {
    console.log(data.value);
    this.setState({ trip_type: data.value });
  };

  handleRedirectToLogin = (url) => {
    this.props.history.push(url);
  }

  handleSubmit = e => {
    const {userId, createNotification} = this.props;
    e.preventDefault();
    const { departure_location, destination_location, depart_date, comeback_date, trip_type } = this.state;
    const createdBy = {"user": userId};
    const departureLocation = {
            "id": null,
            "latitude": 0,
            "longitude": 0,
            "long_address": null,
            "city": departure_location,
            "country": null
        };
    const destinationLocation = {
            "id": null,
            "latitude": 0,
            "longitude": 0,
            "long_address": null,
            "city": destination_location,
            "country": null
        };
    this.props.addTrip(createdBy, departureLocation, destinationLocation, depart_date, comeback_date, trip_type);
    createNotification({
      message: 'Your trip has been added',
      type: NOTIFICATION_TYPE_SUCCESS,
      duration: 0,
      canDismiss: true,
    });
    // if(this.props.authenticated) {
    //   this.props.addTrip(createdBy, departureLocation, destinationLocation, depart_date, comeback_date, trip_type);
    // } else {
    //   this.handleRedirectToLogin('/login');
    // }
  };

  handleDateTimeChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleOnClick = (item) => {
    this.props.history.push(item);
    // $(document.body).animate({
    //     'scrollTop':   $('#howitworks').offset().top
    // }, 2000);
  };

  render() {
    const { loading } = this.props;
    const { departure_location, destination_location, depart_date, comeback_date, trip_type } = this.state;
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
                onClick={this.handleOnClick.bind(this, '/')}
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
              <DjangoCSRFToken/>
              <Segment basic textAlign="center">
              <Form.Group widths='equal'>
                <Form.Field>
                  <Radio
                    label='Round trip'
                    name='radioGroup'
                    value='round_trip'
                    checked={trip_type === 'round_trip'}
                    onChange={this.handleRadioChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label='One way'
                    name='radioGroup'
                    value='one_way_trip'
                    checked={trip_type === 'one_way_trip'}
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
                <DateInput
                  name="depart_date"
                  placeholder="Departure Date"
                  value={depart_date}
                  iconPosition="left"
                  onChange={this.handleDateTimeChange}
                  dateFormat="YYYY-MM-DD"
                />
                {trip_type === "round_trip" ? <DateInput
                  name="comeback_date"
                  placeholder="Come back Date"
                  value={comeback_date}
                  iconPosition="left"
                  onChange={this.handleDateTimeChange}
                  dateFormat="YYYY-MM-DD"
                /> : "" }
              {/* <Recaptcha
                sitekey="6LfycNoZAAAAADPAHBVK7JjxT8V6AvayfwhVaHQa"
                render="explicit"
                onloadCallback={this.recaptchaLoaded}
                verifyCallback={this.verifyCallback}
              /> */}
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
    userId: state.auth.userId,
    userProfileId: state.auth.userProfileId,
    username: state.auth.username,
    authenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTrip: (created_by, departure_location, destination_location, depart_date, comeback_date, trip_type) => dispatch(tripAddition(created_by, departure_location, destination_location, depart_date, comeback_date, trip_type)),
    createNotification: (config) => {dispatch(createNotification(config))},
  };
};

export default withRouter(
connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTripForm)
);

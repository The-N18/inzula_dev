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
import { tripAddition } from "../../store/actions/addTrip";
import styles from './addtripform.css';
import Recaptcha from 'react-recaptcha';
import { DateInput } from 'semantic-ui-calendar-react';
import CSRFToken from "../../containers/CSRFToken";
import DjangoCSRFToken from 'django-react-csrftoken';
import {createNotification, NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notify';
import {renderField, renderDateTimePicker, renderSelectList, renderCitiesList} from "../../containers/ReduxForm/renderField";
import { validate } from "./validation";
import {Field, reset, reduxForm, formValueSelector} from 'redux-form';
import { openLoginParentModal } from "../../store/actions/loginParentModal";
import 'react-widgets/dist/css/react-widgets.css';

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
    isVerified: false,
  };


  submitForm = (val) => {
    const {userId, authenticated} = this.props;
    const createdBy = {"user": userId};
    console.log(val);
    if(authenticated) {
      const departureLocation = val['departure_location'] ? val['departure_location']['pk'] : null;
      const destinationLocation = val['destination_location'] ? val['destination_location']['pk'] : null;
      const depdate = val['depart_date'];
      const cbdate = val['comeback_date'] ? val['comeback_date'] : '';
      this.props.addTrip(createdBy, departureLocation, destinationLocation, depdate, cbdate, val['trip_type']);
    } else {
      createNotification({
        message: 'Please login to add a new trip',
        type: NOTIFICATION_TYPE_SUCCESS,
        duration: 0,
        canDismiss: true,
      });
      this.props.openLoginModal();
    }
  }

  handleDateTimeChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleOnClick = (item) => {
    this.props.history.push(item);
  };


  render() {
    const { loading, userId, handleSubmit, pristine, reset, submitting, invalid } = this.props;
    const { departure_location, destination_location, depart_date, comeback_date, trip_type } = this.state;
    return (
      <Segment style={{ padding: "2em 0em" }} vertical className={"segment-bg-img"}>
        <Segment basic>
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
            <form onSubmit={handleSubmit(this.submitForm)}>
              <CSRFToken/>
              <Segment basic textAlign="center">
                  <div>
                    <label>Trip</label>
                    <Field
                      name="trip_type"
                      component={renderSelectList}
                      data={[ 'round_trip', 'one_way_trip' ]}/>
                  </div>
                  {/*<Field
                    name="departure_location"
                    component="input"
                    type="text"
                    placeholder="Departure location"
                    label="Departure location"
                    className={"custom-field"}
                    component={renderField}
                  /> */}
                  <Field
                    name="departure_location"
                    placeholder="Departure location"
                    label="Departure location"
                    component="input"
                    type="text"
                    className={"custom-field"}
                    component={renderCitiesList}
                  />
                {/*<Field
                  name="destination_location"
                  component="input"
                  type="text"
                  placeholder="Destination location"
                  label="Destination location"
                  className={"custom-field"}
                  component={renderField}
                />*/}
                <Field
                  name="destination_location"
                  placeholder="Destination location"
                  label="Destination location"
                  component="input"
                  type="text"
                  className={"custom-field"}
                  component={renderCitiesList}
                />
                <div>
                  <label>Departure Date</label>
                  <Field
                    name="depart_date"
                    showTime={false}
                    component={renderDateTimePicker}
                  />
                </div>
                {this.props.trip_type === "round_trip" ? <div>
                  <label>Return Date</label>
                  <Field
                    name="comeback_date"
                    showTime={false}
                    component={renderDateTimePicker}
                    min={new Date(this.props.depart_date)}
                  />
                </div> : "" }
              <Recaptcha
                sitekey="6LfycNoZAAAAADPAHBVK7JjxT8V6AvayfwhVaHQa"
                render="explicit"
                onloadCallback={this.recaptchaLoaded}
                verifyCallback={this.verifyCallback}
              />
              <Button
                size="large"
                type="submit"
                loading={loading}
                disabled={invalid}
                className={"buttoncolor transport-add-trip-button"}
                title={"Please login to add a new trip"}
              >
                Add your trip
              </Button>
              </Segment>
            </form>
            </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Segment>
      </Segment>
    );
  }
}

const selector = formValueSelector('add_trip')

const mapStateToProps = state => {
  const trip_type = selector(state, 'trip_type')
  const depart_date = selector(state, 'depart_date')
  return {
    loading: state.addTrip.loading,
    error: state.addTrip.error,
    token: state.auth.token,
    userId: state.userInfo.userId,
    userProfileId: state.userInfo.userProfileId,
    username: state.userInfo.username,
    authenticated: state.auth.token !== null,
    trip_type: trip_type,
    depart_date: depart_date,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTrip: (created_by, departure_location, destination_location, depart_date, comeback_date, trip_type) => dispatch(tripAddition(created_by, departure_location, destination_location, depart_date, comeback_date, trip_type)),
    createNotification: (config) => {dispatch(createNotification(config))},
    openLoginModal: () => dispatch(openLoginParentModal()),
  };
};

// export default withRouter(
// connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AddTripForm)
// );

// let AddTripFormConnected = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AddTripForm);
//
// AddTripFormConnected = reduxForm ({
//   form: 'add_trip',
//   validate
// }) (AddTripFormConnected);
//
// export default AddTripFormConnected;

const afterSubmit = (result, dispatch) => dispatch(reset('add_trip'));

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "add_trip", onSubmitSuccess: afterSubmit, validate})(AddTripForm)));

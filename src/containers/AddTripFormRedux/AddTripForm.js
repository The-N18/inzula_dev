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
import { tripAddition, toggleCheck } from "../../store/actions/addTrip";
import styles from './addtripform.css';
import Recaptcha from 'react-recaptcha';
import { DateInput } from 'semantic-ui-calendar-react';
import CSRFToken from "../../containers/CSRFToken";
import DjangoCSRFToken from 'django-react-csrftoken';
import {NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';
import { createNotif } from "../../store/actions/appConfig";
import {renderField, renderDateTimePicker, renderSelectList, renderCitiesList} from "../../containers/ReduxForm/renderField";
import { validate } from "./validation";
import {Field, reset, reduxForm, formValueSelector} from 'redux-form';
import { openLoginParentModal } from "../../store/actions/loginParentModal";
import {FormattedMessage, FormattedDate} from 'react-intl'
// const  { DOM: { input, select, textarea } } = React
import { isProfileComplete } from "../../configurations";
import {openCompleteProfileModal} from "../../store/actions/completeProfileModal";

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
    const {userId, authenticated, trip_type_check} = this.props;
    const createdBy = {"user": userId};
    console.log(val);
    if(authenticated) {
      if(isProfileComplete(localStorage)) {
        const departureLocation = val['departure_location'] ? val['departure_location']['pk'] : null;
        const destinationLocation = val['destination_location'] ? val['destination_location']['pk'] : null;
        const depdate = val['depart_date'];
        const cbdate = val['comeback_date'] ? val['comeback_date'] : '';
        this.props.addTrip(createdBy, departureLocation, destinationLocation, depdate, cbdate, trip_type_check);
      } else {
        this.props.openCompleteProfileModal();
      }
    } else {
      this.props.createNotif("add_trip.login_msg", "Please login to add a new trip", NOTIFICATION_TYPE_WARNING);
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

  toggleCheck = (k) => {
    this.props.toggleCheck(this.props.trip_type_check);
  }

  componentDidMount() {
    this.props.toggleCheck("round_trip");
  }


  render() {
    const { loading, userId, handleSubmit, pristine, reset, submitting, invalid, trip_type_check } = this.props;
    const { departure_location, destination_location, depart_date, comeback_date, trip_type } = this.state;
    return (
            <form onSubmit={handleSubmit(this.submitForm)}>
              <CSRFToken/>
              <Segment basic textAlign="center">
                  {/*<div>
                    <label><FormattedMessage
                      id="add_trip_form.trip"
                      defaultMessage="Trip"
                    /></label>
                    <Field
                      name="trip_type"
                      component={renderSelectList}
                      default='one_way_trip'
                      data={[ 'round_trip', 'one_way_trip' ]}/>
                  </div>*/}
                  {/*<div>
                    <span className={"radion-btns-span"}><label><FormattedMessage
                      id="add_trip_form.trip"
                      defaultMessage="Trip"
                    /></label></span>
                    <div>
                      <span className={"radion-btns-span"}><label><Field name="trip_type" component={'input'} type="radio" value="one_way_trip" checked={trip_type_check === "one_way_trip"} onClick={this.toggleCheck.bind(this, 'one_way_trip')}/> <FormattedMessage
                        id="add_trip_form.one_way"
                        defaultMessage="One way Trip"
                      /></label></span>
                      <span className={"radion-btns-span"}><label><Field name="trip_type" component={'input'} type="radio" value="round_trip" checked={trip_type_check === "round_trip"} onClick={this.toggleCheck.bind(this, 'round_trip')}/> <FormattedMessage
                        id="add_trip_form.round_trip"
                        defaultMessage="Round Trip"
                      /></label></span>
                    </div>
                  </div> */}
                  <div>
                    <label><FormattedMessage
                      id="add_trip_form.depart_location"
                      defaultMessage="Departure location"
                    /></label>
                  <Field
                    name="departure_location"
                    component="input"
                    type="text"
                    className={"custom-field"}
                    component={renderCitiesList}
                  />
                </div>
                <div>
                  <label><FormattedMessage
                    id="add_trip_form.dest_location"
                    defaultMessage="Destination location"
                  /></label>
                <Field
                  name="destination_location"
                  component="input"
                  type="text"
                  className={"custom-field"}
                  component={renderCitiesList}
                />
              </div>
                <div>
                  <label><FormattedMessage
                    id="add_trip_form.dep_date"
                    defaultMessage="Departure Date"
                  /></label>
                  <Field
                    name="depart_date"
                    showTime={false}
                    component={renderDateTimePicker}
                    min={new Date()}
                  />
                </div>
                {this.props.trip_type === "round_trip" ? <div>
                  <label><FormattedMessage
                    id="add_trip_form.cb_date"
                    defaultMessage="Return Date"
                  /></label>
                  <Field
                    name="comeback_date"
                    showTime={false}
                    component={renderDateTimePicker}
                    min={new Date(this.props.depart_date)}
                  />
                </div> : "" }
              {/*<Recaptcha
                sitekey="6LfycNoZAAAAADPAHBVK7JjxT8V6AvayfwhVaHQa"
                render="explicit"
                onloadCallback={this.recaptchaLoaded}
                verifyCallback={this.verifyCallback}
              />*/}
              <Button
                size="large"
                type="submit"
                loading={loading}
                disabled={invalid}
                className={"buttoncolor transport-add-trip-button"}
                title={"Please login to add a new trip"}
              >
              <FormattedMessage
                id="add_trip_form.add_your_trip"
                defaultMessage="Add your trip"
              />
              </Button>
              </Segment>
            </form>
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
    trip_type_check: state.addTrip.trip_type_check,
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
    openCompleteProfileModal: () => dispatch(openCompleteProfileModal()),
    addTrip: (created_by, departure_location, destination_location, depart_date, comeback_date, trip_type) => dispatch(tripAddition(created_by, departure_location, destination_location, depart_date, comeback_date, trip_type)),
    openLoginModal: () => dispatch(openLoginParentModal()),
    createNotif: (key, default_text, type) => dispatch(createNotif(key, default_text, type)),
    toggleCheck: (trip_type) => dispatch(toggleCheck(trip_type)),
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

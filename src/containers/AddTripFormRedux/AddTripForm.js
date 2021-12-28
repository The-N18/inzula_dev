import React from "react";
// import {
//   Button,
//   Segment,
// } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { tripAddition, toggleCheck } from "../../store/actions/addTrip";
import styles from './addtripform.css';
import Recaptcha from 'react-recaptcha';
import CSRFToken from "../../containers/CSRFToken";
import DjangoCSRFToken from 'django-react-csrftoken';
import {NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';
import { createNotif } from "../../store/actions/appConfig";
import { renderDateTimePicker, renderCitiesList} from "../../containers/ReduxForm/renderField";
import { validate } from "./validation";
import {Field, reset, reduxForm, formValueSelector} from 'redux-form';
import { openLoginParentModal } from "../../store/actions/loginParentModal";
import {FormattedMessage} from 'react-intl'
// const  { DOM: { input, select, textarea } } = React
import { isProfileComplete } from "../../configurations";
import {openCompleteProfileModal} from "../../store/actions/completeProfileModal";
import $ from 'jquery';
window.jQuery = $;
require('bootstrap');

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
      $("#login").modal("show");
 
      // this.props.openLoginModal();
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
    const { loading, handleSubmit, invalid, lang } = this.props;
    return (
          
          <div className="form-main">
            <div className="form-content w-100 p-0">
              <h3 className="form-title text-center m-0 p-3 white">Détails de votre voyage</h3>
              <div className="form-content-inner p-4">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-box">
                        {/* <i className="fa fa-map-marker" />
                        <select className="niceSelect">
                          <option value={1}>Lieu de départ</option> 
                          <option value={2}>Paris</option>
                          <option value={3}>Berlin</option>
                          <option value={4}>Bruxelles</option>
                          <option value={5}>Yaoundé</option>
                          <option value={5}>Douala</option>
                        </select> */}
                        <Field
                        name="departure_location"
                        label={lang === "en" ? "Departure location" : "Lieu de départ"}
                        component="input"
                        type="text"
                        className={"custom-field"}
                        component={renderCitiesList}
                      />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-box">
                        {/* <i className="fa fa-map-marker" />
                        <select className="niceSelect">
                          <option value={1}>Lieu d'arivée</option>
                          <option value={2}>Paris</option>
                          <option value={3}>Berlin</option>
                          <option value={4}>Bruxelles</option>
                          <option value={5}>Yaoundé</option>
                          <option value={5}>Douala</option>
                        </select> */}
                        <Field
                          name="destination_location"
                          label={lang === "en" ? "Destination location" : "Lieu d'arrivée"}
                          component="input"
                          type="text"
                          className={"custom-field"}
                          component={renderCitiesList}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-box">
                        {/* <i className="fa fa-calendar" />
                        <input id="date-range0" type="text" placeholder="Date de départ" /> */}
                        <Field
                          name="depart_date"
                          showTime={false}
                          component={renderDateTimePicker}
                          min={new Date()}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group m-0 w-100 text-center">
                      <a href="#" className={`nir-btn ${invalid?'disabled':''}`} onClick={handleSubmit(this.submitForm)}><i className="fa fa-search" />Ajoutez votre voyage</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
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
    lang: state.appConfig.lang,
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

const afterSubmit = (result, dispatch) => dispatch(reset('add_trip'));

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "add_trip", onSubmitSuccess: afterSubmit, validate})(AddTripForm)));

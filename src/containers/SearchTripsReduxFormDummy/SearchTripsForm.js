import React from "react";
import {
  Button,
  Header,
  Segment,
  Divider,
  Grid
} from "semantic-ui-react";
import { connect } from "react-redux";
import { searchTrips } from "../../store/actions/searchTrips";
// import styles from './searchtripsform.css';
import { withRouter } from "react-router-dom";
import { openModal, closeModal } from "../../store/actions/sendPackageModal";
import { createNotif } from "../../store/actions/appConfig";
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { renderDateTimePicker, renderCitiesList} from "../ReduxForm/renderField";
import {FormattedMessage} from 'react-intl'
import {NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';
import { openLoginParentModal } from "../../store/actions/loginParentModal";
// import 'react-widgets/dist/css/react-widgets.css';
import $ from 'jquery';
window.jQuery = $;
require('bootstrap');

class SearchTripsForm extends React.Component {

  state = {
    isMobile: false,
    isTablet: false
  }

  submitForm = (val) => {
    const { user_id, next_url, count } = this.props;
    const departureLocation = val['departure_location'] ? val['departure_location']['pk'] : null;
    const destinationLocation = val['destination_location'] ? val['destination_location']['pk'] : null;
    this.props.history.push("/dispatch");
    this.props.findTrip(departureLocation, destinationLocation, val['travel_date'], user_id, next_url, count);
  };

  fetchMoreData = () => {
    const { user_id, next_url, count, departure_location, destination_location, travel_date } = this.props;
    this.props.history.push("/dispatch");
    this.props.findTrip(departure_location, destination_location, travel_date, user_id, next_url, count);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScreenSize);
  }

  handleScreenSize = () => {
    if($(window).width() < 768) {
      this.setState({ isMobile: true });
    }
    if($(window).width() >= 768 && $(window).width() <= 950) {
      this.setState({ isTablet: true });
    }
  }

  getDivHeight = () => {
    const { isMobile, isTablet } = this.state;
    let val = 240;
    if(isTablet) {
      val = 300;
    }
    if(isMobile) {
      val = 445;
    }
    return val;
  }

  handleOpenSendPackageModal = () => {
    console.log("IN handleOpenSendPackageModal ")
    
    if(this.props.authenticated) {
      // this.props.openPackageModal();
      $("#updateBooking").modal("show");
    } else {
      this.props.createNotif("send_package.login_msg", "Please login to create a booking request.", NOTIFICATION_TYPE_WARNING);
      $("#login").modal("show");
      // this.props.openLoginModal();
    }
  }


  render() {
    const { loading, handleSubmit, lang } = this.props;
    return (
      <div>
          {/* form main starts */}
          <div className="form-main">
            <div className="container-fluid">
              <div className="form-content"> 
                <h3 className="form-title text-center d-inline white">Trouvez un voyage</h3>
                <div className="row d-flex align-items-center justify-content-between">
                  <div className="col-lg">
                    <div className="form-group pr-4 m-0">
                      <div className="input-box">
                        {/* <i className="fa fa-map-marker" />
                        <select className="niceSelect">
                          <option value={1}>Lieu de départ souhaité</option>
                          <option value={2}>Yaoundé</option>
                          <option value={3}>Douala</option>
                          <option value={4}>Paris</option>
                          <option value={5}>Berlin</option>
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
                  <div className="col-lg">
                    <div className="form-group pr-4 m-0">
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
                  {/* <div class="form-group pr-4 m-0">
                          <div class="input-box">
                              <i class="fa fa-calendar"></i>
                              <input id="date-range1" type="text" placeholder="Travelling date">
                          </div>                            
                      </div>*/}
                  <div className="col-lg">
                    <div className="form-group pr-4 m-0">
                      <div className="input-box">
                        {/* <i className="fa fa-calendar" />
                        <input id="date-range0" type="text" placeholder="Date du voyage" /> */}
                        <Field
                          name="travel_date"
                          showTime={false}
                          component={renderDateTimePicker}
                        />
                      </div>   
                    </div>
                  </div>
                  {/* <div class="form-group pr-4 m-0">
                          <div class="input-box">
                              <i class="fa fa-clock"></i>
                              <select class="niceSelect">
                                  <option value="1">Total Duration</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                              </select>
                          </div> */}      
                  <div className="col-lg">
                    <div className="form-group m-0 w-100">
                      <a  className={`nir-btn ${loading?'disabled':''}`} onClick={handleSubmit(this.submitForm)} ><i className="fa fa-search" /> Rechercher</a>
                    </div>
                  </div>                      
                </div>
              </div>
            </div>
          </div>
          {/* form main ends */}
          {/* section 2 ends */}
          {/*find travel start */}
          <div className="cta-horizon bg-white pt-4 pb-2">
          </div>
          <div className="cta-horizon bg-white pt-4 pb-2">
          </div>
          <div className="cta-horizon pt-4 pb-2" style={{backgroundColor: '#a10115'}}>
            <div className="container d-md-flex align-items-center justify-content-between">
              <h4 className="mb-2 white">Impossible de trouver le bon voyageur ? Enregistrez votre colis pour être contacté rapidement.</h4>
              <a className="nir-btn-black" onClick={this.handleOpenSendPackageModal.bind(this)} >Expédier</a>
            </div>
          </div>
          {/*find travel end */}
      </div>
    );
  }
}

const selector = formValueSelector('search_trips');

const mapStateToProps = state => {
  const departure_location = selector(state, 'departure_location');
  const destination_location = selector(state, 'destination_location');
  const travel_date = selector(state, 'travel_date');
  return {
    loading: state.searchTrips.loading,
    error: state.searchTrips.error,
    trips: state.searchTrips.trips,
    next_url: state.searchTrips.next_url,
    count: state.searchTrips.count,
    user_id: state.userInfo.userId,
    lang: state.appConfig.lang,
    authenticated: state.auth.token !== null,
    departure_location: departure_location,
    destination_location: destination_location,
    travel_date: travel_date,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPackageModal: () => dispatch(openModal()),
    closePackageModal: () => dispatch(closeModal()),
    openLoginModal: () => dispatch(openLoginParentModal()),
    createNotif: (key, default_text, type) => dispatch(createNotif(key, default_text, type)),
    findTrip: (departure_location, destination_location, travel_date, user_id, next_url, count) => dispatch(searchTrips(departure_location, destination_location, travel_date, user_id, next_url, count))
  };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "search_trips" })(SearchTripsForm)));

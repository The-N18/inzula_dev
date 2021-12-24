import React from "react";
import {
  Button,
  Header,
  Segment,
  Grid,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { searchBookings } from "../../store/actions/searchBookings";
// import styles from './searchbookingrequestsform.css';
// import 'rc-slider/assets/index.css';
// import 'react-widgets/dist/css/react-widgets.css';
import { Field, reduxForm } from 'redux-form'
import { withRouter } from "react-router-dom";
import $ from "jquery";
import { renderDateTimePicker, renderCitiesList} from "../../containers/ReduxForm/renderField";
import { setInitialValues } from "../../store/actions/searchBookingsPage";
import {FormattedMessage} from 'react-intl'


class SearchBookingRequestsForm extends React.Component {

  state = {
    departure_location: "",
    destination_location: "",
    travel_date: "",
    isMobile: false,
    isTablet: false
  }

  handleScreenSize = () => {
    if($(window).width() < 768) {
      this.setState({ isMobile: true });
    }
    if($(window).width() >= 768) {
      this.setState({ isTablet: true });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreenSize);
  }

  submitForm = (val) => {
    const { user_id, next_url, count } = this.props;
    this.props.setInitialValues(val['departure_location'], val['destination_location'], val['travel_date']);
    const departureLocation = val['departure_location'] ? val['departure_location']['pk'] : null;
    const destinationLocation = val['destination_location'] ? val['destination_location']['pk'] : null;
    this.props.history.push("/search_bookings");
    this.props.searchBookings(departureLocation, destinationLocation, val['travel_date'], null, null, null, null, user_id, next_url, count);
  };


  render() {
    const { handleSubmit, lang } = this.props;
    return (
      <div className="form-main">
        <div className="container">
          <div className="form-content w-100"> 
            <h3 className="form-title text-center d-inline white">Trouvez un colis à expédier</h3>
            <div className="d-lg-flex align-items-center justify-content-between">
              <div className="form-group pr-4 m-0">
                <div className="input-box">
                  {/* <i className="fa fa-map-marker" />
                  <select className="niceSelect">
                    <option value={1}>Lieu de départ</option>
                    <option value={2}>Argentina</option>
                    <option value={3}>Belgium</option>
                    <option value={4}>Canada</option>
                    <option value={5}>Denmark</option>
                  </select> */}
                  <Field
                    name="departure_location"
                    label={lang === "en" ? "Departure location" : "Lieu d'arrivée"}
                    type="text"
                    className={"custom-field-search"}
                    component={renderCitiesList}
                  />
                </div>                            
              </div> 
              <div className="form-group pr-4 m-0">
                <div className="input-box">
                  {/* <i className="fa fa-map-marker" />
                  <select className="niceSelect">
                    <option value={1}>Lieu d'arrivée</option>
                    <option value={2}>Argentina</option>
                    <option value={3}>Belgium</option>
                    <option value={4}>Canada</option>
                    <option value={5}>Denmark</option>
                  </select> */}
                  <Field
                    name="destination_location"
                    label={lang === "en" ? "Destination location" : "Lieu de départ"}
                    type="text"
                    className={"custom-field-search"}
                    component={renderCitiesList}
                  />
                </div>                            
              </div>
              <div className="form-group pr-4 m-0">
                <div className="input-box">
                  {/* <i className="fa fa-calendar" />
                  <input id="date-range1" type="text" placeholder="Date du voyage" /> */}
                  <Field
                    name="travel_date"
                    showTime={false}
                    component={renderDateTimePicker}
                  />
                </div>                            
              </div>
              <div className="form-group m-0">
                <a href="#" onClick={handleSubmit(this.submitForm)} className="nir-btn w-100"><i className="fa fa-search" /> Rechercher</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user_id: state.userInfo.userId,
    next_url: state.searchBookings.next_url,
    count: state.searchBookings.count,
    lang: state.appConfig.lang,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchBookings: (departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count) => dispatch(searchBookings(departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count)),
    setInitialValues: (departure_location, destination_location, travel_date) => dispatch(setInitialValues(departure_location, destination_location, travel_date)),
  };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "search_bookings", enableReinitialize: true })(SearchBookingRequestsForm)));

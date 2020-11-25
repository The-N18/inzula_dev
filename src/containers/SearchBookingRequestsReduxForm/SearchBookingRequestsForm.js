import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Header,
  Segment,
  Divider,
  Grid,
  Select
} from "semantic-ui-react";
import { connect } from "react-redux";
import { searchBookings, filterBookings } from "../../store/actions/searchBookings";
import styles from './searchbookingrequestsform.css';
import { DateInput } from 'semantic-ui-calendar-react';
import BookingCard from "../../containers/BookingCard/BookingCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Multiselect from 'react-widgets/lib/Multiselect'
import MultiSelect from "@khanacademy/react-multi-select";
import 'react-widgets/dist/css/react-widgets.css';
import { Field, reduxForm } from 'redux-form'
import { withRouter } from "react-router-dom";
import $ from "jquery";
import {renderField, renderDateTimePicker, renderCitiesList, renderDropdownList} from "../../containers/ReduxForm/renderField";
import { setInitialValues } from "../../store/actions/searchBookingsPage";


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
    this.props.setInitialValues(val['departure_location'], val['destination_location'], val['travel_date']);
    this.props.history.push("/search_bookings");
  };


  render() {
    const { handleSubmit } = this.props;
    return (
      <Segment>
          <Header as="h4" textAlign="center">
            Prefer to know what shipping offers are available before committing?
          </Header>
          <Header as="h4" textAlign="center">
            No worries, you can add the country of departure and destination of your trip and thus access the requests for available expeditions.
          </Header>
          <form onSubmit={handleSubmit(this.submitForm)}>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column mobile={16} tablet={16} computer={6}>
          <div>
            <div>
              <Field
                name="departure_location"
                placeholder="Departure location"
                label="Departure location"
                component="input"
                type="text"
                component={renderCitiesList}
              />
              </div>
            </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={6}>
            <div>
              <div>
                <Field
                  name="destination_location"
                  placeholder="Destination location"
                  label="Destination location"
                  component="input"
                  type="text"
                  component={renderCitiesList}
                />
                </div>
              </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={4}>
            <div>
              <label>Travel Date</label>
              <Field
                name="travel_date"
                showTime={false}
                component={renderDateTimePicker}
              />
            </div>
              </Grid.Column>
              </Grid.Row>
              </Grid>
            <Button
              size="big"
              type="submit"
              className={"buttoncolor search-booking-requests-button"}
            >
              Search
            </Button>
            </form>
        </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user_id: state.userInfo.user_id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setInitialValues: (departure_location, destination_location, travel_date) => dispatch(setInitialValues(departure_location, destination_location, travel_date)),
  };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "search_bookings", enableReinitialize: true })(SearchBookingRequestsForm)));

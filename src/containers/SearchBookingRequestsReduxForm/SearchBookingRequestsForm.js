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
import {FormattedMessage, FormattedDate} from 'react-intl'


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
    const { handleSubmit } = this.props;
    return (
      <Segment>
          <Header as="h4" textAlign="center">
            <FormattedMessage
              id="search_requests.title"
              defaultMessage="Prefer to know what shipping offers are available before committing?"
            />
          </Header>
          <Header as="h4" textAlign="center">
            <FormattedMessage
              id="search_requests.head"
              defaultMessage="No worries, you can add the country of departure and destination of your trip and thus access the requests for available expeditions."
            />
          </Header>
          <form onSubmit={handleSubmit(this.submitForm)}>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column mobile={16} tablet={16} computer={6}>
          <div>
            <label>
              <FormattedMessage
                id="search_requests.departure"
                defaultMessage="Departure location"
              />
            </label>
              <Field
                name="departure_location"
                component="input"
                type="text"
                component={renderCitiesList}
              />
            </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={6}>
            <div>
              <label>
                <FormattedMessage
                  id="search_requests.destination"
                  defaultMessage="Destination location"
                />
              </label>
                <Field
                  name="destination_location"
                  component="input"
                  type="text"
                  component={renderCitiesList}
                />
              </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={4}>
            <div>
              <label>
                <FormattedMessage
                  id="search_requests.travel_date"
                  defaultMessage="Travel Date"
                />
              </label>
              <Field
                name="travel_date"
                showTime={false}
                component={renderDateTimePicker}
              />
            </div>
              </Grid.Column>
              </Grid.Row>
              </Grid>
              <div className={"search-booking-requests-button"}>
            <Button
              size="big"
              type="submit"
              className={"buttoncolor search-booking-requests-button"}
            >
            <FormattedMessage
              id="search_requests.search"
              defaultMessage="Search"
            />
            </Button>
            </div>
            </form>
        </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user_id: state.userInfo.userId,
    next_url: state.searchBookings.next_url,
    count: state.searchBookings.count,
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

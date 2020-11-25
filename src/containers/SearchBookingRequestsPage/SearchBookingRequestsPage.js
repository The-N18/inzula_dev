import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Header,
  Segment,
  Divider,
  Grid,
  Select,
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './searchbookingrequests.css';
import AddTripForm from "../../containers/AddTripForm/AddTripForm";
import TransportHowToMakeMoney from "../../containers/TransportHowToMakeMoney/TransportHowToMakeMoney";
import SearchBookingRequestsForm from "../../containers/SearchBookingRequestsReduxForm/SearchBookingRequestsForm";
import 'rc-slider/assets/index.css';
import Multiselect from 'react-widgets/lib/Multiselect'
import MultiSelect from "@khanacademy/react-multi-select";
import 'react-widgets/dist/css/react-widgets.css';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { withRouter } from "react-router-dom";
import $ from "jquery";
import {renderField, renderDateTimePicker, renderDropdownList, renderCitiesList} from "../../containers/ReduxForm/renderField";
import { searchBookings, filterBookings } from "../../store/actions/searchBookings";
import { DateInput } from 'semantic-ui-calendar-react';
import BookingCard from "../../containers/BookingCard/BookingCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import { sizeMultiOptions, categoryMultiOptions, weightMultiOptions, valueMultiOptions } from "../../utils/options";


class SearchBookingRequestsPage extends React.Component {

  state = {
    departure_location: "",
    destination_location: "",
    travel_date: "",
    weight: [],
    proposed_price: [],
    product_category: [],
    product_size: [],
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

  handleDateChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  submitForm = (val) => {
    const { user_id, next_url, count, inNewPage } = this.props;
    const { product_category, product_size, proposed_price, weight } = this.state;
    const departureLocation = val['departure_location'] ? val['departure_location']['pk'] : null;
    const destinationLocation = val['destination_location'] ? val['destination_location']['pk'] : null;
    this.setState({ departure_location: val['departure_location'] ? val['departure_location'] : "",
                    destination_location: val['destination_location'] ? val['destination_location'] : ""});
    this.props.searchBookings(departureLocation, destinationLocation, val['travel_date'], product_category, product_size, proposed_price, weight, user_id, next_url, count);
  };

  fetchMoreData = () => {
    const { product_category, product_size, proposed_price, weight } = this.state;
    const { departure_location, destination_location, travel_date } = this.props;
    const { user_id, next_url, count } = this.props;
    this.props.searchBookings(departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count);
  }

  render() {
    const { loading, error, bookings, next_url, count, api_been_called, handleSubmit, inNewPage } = this.props;
    const { travel_date, product_category, product_size, weight, proposed_price } = this.state;
    return (
      <Segment basic style={{ padding: "8em 0em" }} textAlign="center">
        <Header as="h4" textAlign="center">
          Prefer to know what shipping offers are available before committing?
        </Header>
        <Header as="h4" textAlign="center">
          No worries, you can add the country of departure and destination of your trip and thus access the requests for available expeditions.
        </Header>
        <form onSubmit={handleSubmit(this.submitForm)}>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column mobile={16} tablet={16} computer={5}>
        <div>
          <div>
            <Field
              name="departure_location"
              component="input"
              type="text"
              placeholder="Departure location"
              label="Departure location"
              className={"custom-field"}
              component={renderCitiesList}
            />
            </div>
          </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={5}>
          <div>
            <div>
              <Field
                name="destination_location"
                component="input"
                type="text"
                placeholder="Destination location"
                label="Destination location"
                className={"custom-field"}
                component={renderCitiesList}
              />
              </div>
            </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={6}>
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
            loading={loading}
            disabled={loading}
            className={"buttoncolor search-booking-requests-button"}
          >
            Search
          </Button>
        {api_been_called === true ? <Divider/> : ''}
        {api_been_called === true ? <Grid>
          <Grid.Row columns={2}>
            <Grid.Column mobile={16} tablet={8} computer={4}>
            <div className={"range-div"}>
              <p>Price</p>
                <MultiSelect
                  options={valueMultiOptions}
                  selected={proposed_price}
                  onSelectedChanged={proposed_price => this.setState({proposed_price})}
                />
            </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
            <div className={"range-div"}>
              <p>Weight</p>
                <MultiSelect
                  options={weightMultiOptions}
                  selected={weight}
                  onSelectedChanged={weight => this.setState({weight})}
                />
            </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
            <div className={"range-div"}>
            <p>Size</p>
              <MultiSelect
                options={sizeMultiOptions}
                selected={product_size}
                onSelectedChanged={product_size => this.setState({product_size})}
              />
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
            <div className={"range-div"}>
            <p>Category</p>
              <MultiSelect
                options={categoryMultiOptions}
                selected={product_category}
                onSelectedChanged={product_category => this.setState({product_category})}
              />
              </div>
            </Grid.Column>
            </Grid.Row>
          </Grid> : ''}
          </form>
        <Divider/>
        {bookings.length === 0 ? <div> No search results. Please try a more general search.</div> : ''}
        <div
          id="scrollableDiv"
          style={{
            height: 800,
            overflow: 'auto',
            borderTop: '1px solid #f1f1f1',
            boxShadow: '0px 0 10px #d4d4d5',
            display: bookings.length > 0 ? "block": "none"
          }}
        >
          <InfiniteScroll
            dataLength={bookings.length}
            next={this.fetchMoreData}
            hasMore={count !== null && next_url !== null}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            {bookings.map((item, index) => (
              <div style={{
                height: this.state.isMobile ? 330 : 200,
                margin: 6,
                padding: 8
              }} key={index}>
                <BookingCard
                  title={item["product"]["name"]}
                  pk={item["pk"]}
                  arrival_date={item["product"]["arrival_date"]}
                  description={item["product"]["description"]}
                  departure_location={item["product"]["departure_location"]}
                  destination_location={item["product"]["destination_location"]}
                  weight={item["product"]["weight"]}
                  space={item["product"]["space"]}
                  price={item["product"]["price"]}
                  product_category={item["product"]["product_category"]}
                  proposed_price={item["product"]["proposed_price"]}
                  img={item["product"]["images"].length === 0 ? '' : item["product"]["images"][0]['image']}
                  editable={false} />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </Segment>
    );
  }
}

const selector = formValueSelector('search_bookings_page')

const mapStateToProps = state => {
  const departure_location = selector(state, 'departure_location');
  const destination_location = selector(state, 'destination_location');
  const travel_date = selector(state, 'travel_date');
  return {
    loading: state.searchBookings.loading,
    error: state.searchBookings.error,
    bookings: state.searchBookings.bookings,
    api_been_called: state.searchBookings.api_been_called,
    next_url: state.searchBookings.next_url,
    count: state.searchBookings.count,
    user_id: state.userInfo.user_id,
    initialValues: state.searchbookingsPage.initialValues,
    departure_location: departure_location,
    destination_location: destination_location,
    travel_date: travel_date
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchBookings: (departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count) => dispatch(searchBookings(departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count)),
    filterBookings: (departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count) => dispatch(filterBookings(departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count)),
  };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "search_bookings_page", enableReinitialize: true })(SearchBookingRequestsPage)));

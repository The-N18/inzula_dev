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
import {renderField} from "../../containers/ReduxForm/renderField";

class SearchBookingRequestsForm extends React.Component {

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
    console.log(val);
    const { user_id, next_url, count, inNewPage } = this.props;
    const { travel_date, weight, proposed_price, product_category, product_size } = this.state;
    this.setState({ departure_location: val['departure_location'] ? val['departure_location'] : "",
                    destination_location: val['destination_location'] ? val['destination_location'] : ""});
    this.props.searchBookings(val['departure_location'], val['destination_location'], travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count);
    if(!inNewPage) {
      this.props.history.push("/search_bookings");
    }
  };

  fetchMoreData = () => {
    const { departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight } = this.state;
    const { user_id, next_url, count } = this.props;
    this.props.searchBookings(departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count);
  }

  render() {
    const { loading, error, bookings, next_url, count, api_been_called, handleSubmit, inNewPage } = this.props;
    const { travel_date, product_category, product_size, weight, proposed_price } = this.state;
    const sizeOptions = [
      { key: 'xxs', value: 'xxs', label: 'Extra Extra Small' },
      { key: 'xs', value: 'xs', label: 'Extra small' },
      { key: 's', value: 's', label: 'Small' },
      { key: 'm', value: 'm', label: 'Medium' },
      { key: 'l', value: 'l', label: 'Large' },
      { key: 'xl', value: 'xl', label: 'Extra Large' },
      { key: 'xxl', value: 'xxl', label: 'Extra Extra Large' },
      { key: 'xxxl', value: 'xxxl', label: 'Extra Extra Extra Large' },
    ];

    const categoryOptions = [
      { key: 'food', value: 'food', label: 'Food' },
      { key: 'elec', value: 'elec', label: 'Electronics' },
      { key: 'dress', value: 'dress', label: 'Dresses' },
      { key: 'shoe', value: 'shoe', label: 'Shoes' },
      { key: 'doc', value: 'doc', label: 'Documents' },
      { key: 'uts', value: 'uts', label: 'Kitchen utensils' },
      { key: 'app', value: 'app', label: 'Electrical appliances' },
      { key: 'skin', value: 'skin', label: 'Skin care' },
      { key: 'jel', value: 'jel', label: 'Jewelry' },
      { key: 'misc', value: 'misc', label: 'Miscellaneous' },
    ];

    const weightOptions = [
      { key: '500g', value: '500g', label: '0.1 - 500g' },
      { key: '1kg', value: '1kg', label: '500g - 1kg' },
      { key: '5kg', value: '5kg', label: '1.1kg - 5kg' },
      { key: '10kg', value: '10kg', label: '5.1kg - 10kg' },
      { key: '20kg', value: '20kg', label: '10.1kg - 20kg' },
      { key: '30kg', value: '30kg', label: '20.1kg - 30kg' },
      { key: '40kg', value: '40kg', label: '30.1kg - 40kg' },
      { key: 'huge', value: 'huge', label: '40.1kg +' },
    ];

    const valueOptions = [
      { key: 'low', value: 'low', label: 'Low value' },
      { key: 'mid', value: 'mid', label: 'Medium value' },
      { key: 'high', value: 'high', label: 'High value' },
      { key: 'lux', value: 'lux', label: 'Luxury item' },
      { key: 'exc', value: 'exc', label: 'Exclusive' },
    ];
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
            <label htmlFor="departure_location">Departure location</label>
            <div>
              <Field
                name="departure_location"
                component="input"
                type="text"
                placeholder="Departure location"
                label="Departure location"
                className={"custom-field"}
                component={renderField}
              />
              </div>
            </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={6}>
            <div>
              <label htmlFor="destination_location">Destination location</label>
              <div>
                <Field
                  name="destination_location"
                  component="input"
                  type="text"
                  placeholder="Destination location"
                  label="Destination location"
                  className={"custom-field"}
                  component={renderField}
                />
                </div>
              </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={4}>
              <div>
                <label htmlFor="travel_date">Travel date</label>
                <div>
              <DateInput
                name="travel_date"
                placeholder="Travel Date"
                value={travel_date}
                iconPosition="left"
                onChange={this.handleDateChange}
                dateFormat="YYYY-MM-DD"
              />
              </div>
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
          {inNewPage && api_been_called === true ? <Divider/> : ''}
          {inNewPage && api_been_called === true ? <Grid>
            <Grid.Row columns={2}>
              <Grid.Column mobile={16} tablet={8} computer={4}>
              <div className={"range-div"}>
                <p>Price</p>
                {/*<Field
                  name="proposed_price"
                  component={Multiselect}
                  defaultValue={[]}
                  data={valueOptions}
                  value={this.state.value}
                  onChange={items=> {
                    console.log("in on change");
                  if (items.length <= 3)
                    this.setState({ value: items })
                }}/>*/}
                <MultiSelect
                  options={valueOptions}
                  selected={proposed_price}
                  onSelectedChanged={proposed_price => this.setState({proposed_price})}
                />
              </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
              <div className={"range-div"}>
                <p>Weight</p>
                    <MultiSelect
                      options={weightOptions}
                      selected={weight}
                      onSelectedChanged={weight => this.setState({weight})}
                    />
              </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
              <div className={"range-div"}>
              <p>Size</p>
                <MultiSelect
                  options={sizeOptions}
                  selected={product_size}
                  onSelectedChanged={product_size => this.setState({product_size})}
                />
                </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
              <div className={"range-div"}>
              <p>Category</p>
                <MultiSelect
                  options={categoryOptions}
                  selected={product_category}
                  onSelectedChanged={product_category => this.setState({product_category})}
                />
                </div>
              </Grid.Column>
              </Grid.Row>
            </Grid> : ''}
            </form>
          {inNewPage && <Divider/>}
          {inNewPage && bookings.length === 0 ? <div> No search results. Please try a more general search.</div> : ''}
          {inNewPage ? <div
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
                    pk={item["product"]["pk"]}
                    arrival_date={item["product"]["arrival_date"]}
                    description={item["product"]["description"]}
                    departure_location={item["product"]["departure_location"]["city"]}
                    pickup_location={item["product"]["pickup_location"]["city"]}
                    img={item["product"]["images"].length === 0 ? '' : item["product"]["images"][0]['image']}
                    editable={false}/>
                </div>
              ))}
            </InfiniteScroll>
          </div> : ''}
        </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.searchBookings.loading,
    error: state.searchBookings.error,
    bookings: state.searchBookings.bookings,
    api_been_called: state.searchBookings.api_been_called,
    next_url: state.searchBookings.next_url,
    count: state.searchBookings.count,
    user_id: state.userInfo.user_id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchBookings: (departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count) => dispatch(searchBookings(departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count)),
    filterBookings: (departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count) => dispatch(filterBookings(departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count)),
  };
};

SearchBookingRequestsForm.PropTypes = {
  inNewPage: PropTypes.boolean,
}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SearchBookingRequestsForm);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "search_bookings" })(SearchBookingRequestsForm)));

import React from "react";
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
import BookingRequestCard from "../../containers/BookingRequestCard/BookingRequestCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

class SearchBookingRequestsForm extends React.Component {

  state = {
    departure_location: "",
    destination_location: "",
    travel_date: "",
    product_category: null,
    product_size: null,
    weight: [0, 100],
    proposed_price: [0, 100],
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDateTimeChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight } = this.state;
    const { user_id, next_url, count } = this.props;
    this.props.searchBookings(departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count);
  };

  fetchMoreData = () => {
    const { departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight } = this.state;
    const { user_id, next_url, count } = this.props;
    this.props.searchBookings(departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count);
  }

  handleOnPriceRangeChange = (val) => {
    this.setState({proposed_price: val });
  }

  handleOnWeightRangeChange = (val) => {
    this.setState({weight: val });
  }

  handleSelectChange = (e, data) => {
    const { departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight } = this.state;
    const { user_id, next_url, count } = this.props;
    this.setState({ [data.name]: data.value });
    const pCat = data.name === "product_category" ? data.value : product_category;
    const pSize = data.name === "product_size" ? data.value : product_size;
    this.props.filterBookings(departure_location, destination_location, travel_date, pCat, pSize, proposed_price, weight, user_id, next_url, count);
  }

  handleOnSliderPriceAPICall = (e) => {
    const { departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight } = this.state;
    const { user_id, next_url, count } = this.props;
    this.props.filterBookings(departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count);
  }

  handleOnSliderWeightAPICall = (e) => {
    const { departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight } = this.state;
    const { user_id, next_url, count } = this.props;
    this.props.filterBookings(departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count);
  }

  render() {
    const { loading, error, bookings, next_url, count, api_been_called } = this.props;
    const { departure_location, destination_location, travel_date, weight, proposed_price, product_category, product_size } = this.state;
    const sizeOptions = [
      { key: 'xxs', value: 'xxs', text: 'Extra Extra Small' },
      { key: 'xs', value: 'xs', text: 'Extra small' },
      { key: 's', value: 's', text: 'Small' },
      { key: 'm', value: 'm', text: 'Medium' },
      { key: 'l', value: 'l', text: 'Large' },
      { key: 'xl', value: 'xl', text: 'Extra Large' },
      { key: 'xxl', value: 'xxl', text: 'Extra Extra Large' },
      { key: 'xxxl', value: 'xxxl', text: 'Extra Extra Extra Large' },
    ];

    const categoryOptions = [
      { key: 'food', value: 'food', text: 'Food' },
      { key: 'elec', value: 'elec', text: 'Electronics' },
      { key: 'dress', value: 'dress', text: 'Dresses' },
      { key: 'shoe', value: 'shoe', text: 'Shoes' },
      { key: 'doc', value: 'doc', text: 'Documents' },
      { key: 'uts', value: 'uts', text: 'Kitchen utensils' },
      { key: 'app', value: 'app', text: 'Electrical appliances' },
      { key: 'skin', value: 'skin', text: 'Skin care' },
      { key: 'jel', value: 'jel', text: 'Jewelry' },
      { key: 'misc', value: 'misc', text: 'Miscellaneous' },
    ];
    return (
      <Segment>
          <Header as="h4" textAlign="center">
            Prefer to know what shipping offers are available before committing?
          </Header>
          <Header as="h4" textAlign="center">
            No worries, you can add the country of departure and destination of your trip and thus access the requests for available expeditions.
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
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
                name="travel_date"
                placeholder="Travel Date"
                value={travel_date}
                iconPosition="left"
                onChange={this.handleDateTimeChange}
                dateFormat="YYYY-MM-DD"
              />
            </Form.Group>
            <Button
              size="big"
              loading={loading}
              disabled={loading}
              className={"buttoncolor search-booking-requests-button"}
            >
              Search
            </Button>
          </Form>
          {api_been_called === true ? <Divider/> : ''}
          {api_been_called === true ? <Grid>
            <Grid.Row columns={2}>
              <Grid.Column mobile={16} tablet={8} computer={4}>
              <div className={"range-div"}>
                <p>Price {proposed_price[0]} - {proposed_price[1]}</p>
                <Range
                  className={"range-style"}
                  min={1}
                  max={100}
                  step={1}
                  value={proposed_price}
                  dots={true}
                  onChange={this.handleOnPriceRangeChange}
                  onAfterChange={this.handleOnSliderPriceAPICall}
                  tipFormatter={value => proposed_price}/>
              </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
              <div className={"range-div"}>
                <p>Weight {weight[0]} - {weight[1]}</p>
                <Range
                  className={"range-style"}
                  min={1}
                  max={100}
                  step={1}
                  value={weight}
                  dots={true}
                  onChange={this.handleOnWeightRangeChange}
                  onAfterChange={this.handleOnSliderWeightAPICall}
                  tipFormatter={value => weight}/>
              </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
              <div className={"select-div"}>
              <Select
                onChange={this.handleSelectChange}
                name="product_size"
                value={product_size}
                fluid
                placeholder='Product size'
                options={sizeOptions} />
                </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
              <div className={"select-div"}>
              <Select
                onChange={this.handleSelectChange}
                name="product_category"
                value={product_category}
                fluid
                placeholder='Product category'
                options={categoryOptions} />
                </div>
              </Grid.Column>
              </Grid.Row>
            </Grid> : ''}
          <Divider/>
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
                  height: 200,
                  margin: 6,
                  padding: 8
                }} key={index}>
                  <BookingCard
                    title={item["product"]["name"]}
                    arrival_date={item["product"]["arrival_date"]}
                    description={item["product"]["description"]}
                    departure_location={item["product"]["departure_location"]["city"]}
                    pickup_location={item["product"]["pickup_location"]["city"]}
                    img={item["product"]["images"].length === 0 ? '' : item["product"]["images"][0]['image']}/>
                </div>
              ))}
            </InfiniteScroll>
          </div>
          {/*bookings.length > 0 ? <Segment raised>
            {bookings.map((item, i) => {
               console.log(item["product"]["name"]);
               // Return the element. Also pass key
               return (<BookingCard
                 title={item["product"]["name"]}
                 arrival_date={item["product"]["arrival_date"]}
                 description={item["product"]["description"]}
                 departure_location={item["product"]["departure_location"]["city"]}
                 pickup_location={item["product"]["pickup_location"]["city"]}/>);
            })}
          </Segment> : ''*/}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBookingRequestsForm);

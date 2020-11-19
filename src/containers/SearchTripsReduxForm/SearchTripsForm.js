import React from "react";
import {
  Button,
  Form,
  Header,
  Segment,
  Divider
} from "semantic-ui-react";
import { connect } from "react-redux";
import { searchTrips } from "../../store/actions/searchTrips";
import styles from './searchtripsform.css';
import { DateInput } from 'semantic-ui-calendar-react';
import TripCard from "../../containers/TripCard/TripCard";
import BookingRequestCard from "../../containers/BookingRequestCard/BookingRequestCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import { openModal, closeModal } from "../../store/actions/sendPackageModal";
import MultiSelect from "@khanacademy/react-multi-select";
import 'react-widgets/dist/css/react-widgets.css';
import { Field, reduxForm } from 'redux-form'
import {renderField} from "../../containers/ReduxForm/renderField";

class SearchTripsForm extends React.Component {

  state = {
    departure_location: "",
    destination_location: "",
    travel_date: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDateChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  submitForm = (val) => {
    const { travel_date } = this.state;
    const { user_id, next_url, count } = this.props;
    this.setState({ departure_location: val['departure_location'] ? val['departure_location'] : "",
                    destination_location: val['destination_location'] ? val['destination_location'] : ""});
    this.props.findTrip(val['departure_location'], val['destination_location'], travel_date, user_id, next_url, count);
  };

  fetchMoreData = () => {
    console.log("fetch more data")
    const { departure_location, destination_location, travel_date } = this.state;
    const { user_id, next_url, count } = this.props;
    this.props.findTrip(departure_location, destination_location, travel_date, user_id, next_url, count);
  }


  render() {
    const { loading, error, trips, next_url, count, handleSubmit } = this.props;
    const { departure_location, destination_location, travel_date } = this.state;
    return (
      <Segment>
          <Header as="h4" textAlign="center">
            Prefer to know what shipping offers are available before committing?
          </Header>
          <Header as="h4" textAlign="center">
            No worries, you can add the country of departure and destination of your trip and thus access the requests for available expeditions.
          </Header>
          <Header as="h4" textAlign="center">
            Can't find a trip? <Button inverted color='green' onClick={() => this.props.openPackageModal()}>click here to save a booking request</Button> so you can be later contacted by travellers.
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
              className={"buttoncolor search-trips-button"}
            >
              Search
            </Button>
          </form>
          <Divider/>
          {trips.length === 0 ? <div> No search results. Please try a more general search.</div> : ''}
          <div
            id="scrollableDiv"
            style={{
              height: 800,
              overflow: 'auto',
              borderTop: '1px solid #f1f1f1',
              boxShadow: '0px 0 10px #d4d4d5',
              display: trips && trips.length > 0 ? "block": "none"
            }}
          >
            <InfiniteScroll
              dataLength={trips ? trips.length : 0}
              next={this.fetchMoreData}
              hasMore={count !== null && next_url !== null}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
            >
              {trips && trips.length > 0 ? trips.map((item, index) => (
                <div style={{
                  height: 240,
                  margin: 6,
                  padding: 8
                }} key={index}>
                  <TripCard
                    trip_type={item["trip_type"]}
                    comeback_date={item["comeback_date"]}
                    depart_date={item["depart_date"]}
                    departure_location={item["departure_location"]["city"]}
                    destination_location={item["destination_location"]["city"]}
                    img={item["created_by"]["profile_pic"] === null ? '' : item["created_by"]["profile_pic"]}
                    creator_user_name={item["creator_user_name"]}
                    trip_id={item["pk"]}
                    no_book={false}/>
                </div>
              )) : ''}
            </InfiniteScroll>
          </div>
          {/*trips.length > 0 ? <Segment raised>
            {trips.map((item, i) => {
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
    loading: state.searchTrips.loading,
    error: state.searchTrips.error,
    trips: state.searchTrips.trips,
    next_url: state.searchTrips.next_url,
    count: state.searchTrips.count,
    user_id: state.userInfo.user_id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPackageModal: () => dispatch(openModal()),
    closePackageModal: () => dispatch(closeModal()),
    findTrip: (departure_location, destination_location, travel_date, user_id, next_url, count) => dispatch(searchTrips(departure_location, destination_location, travel_date, user_id, next_url, count))
  };
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SearchTripsForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "search_trips" })(SearchTripsForm));

import React from "react";
import {
  Container,
  Button,
  Header,
  Segment,
  Divider,
  Grid 
} from "semantic-ui-react";
import { connect } from "react-redux";
import { searchTrips } from "../../store/actions/searchTrips";
import styles from './searchtripsform.css';
import TripCard from "../../containers/TripCard/TripCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import { openModal, closeModal } from "../../store/actions/sendPackageModal";
import { createNotif } from "../../store/actions/appConfig";
import { Field, reduxForm, formValueSelector } from 'redux-form'
import {renderDateTimePicker, renderCitiesList} from "../../containers/ReduxForm/renderField";
import $ from "jquery";
import {FormattedMessage} from 'react-intl'
import {NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';
import { openLoginParentModal } from "../../store/actions/loginParentModal";
// import 'react-widgets/dist/css/react-widgets.css';

class SearchTripsForm extends React.Component {

  state = {
    isMobile: false,
    isTablet: false
  }

  submitForm = (val) => {
    const { user_id, next_url, count } = this.props;
    const departureLocation = val['departure_location'] ? val['departure_location']['pk'] : null;
    const destinationLocation = val['destination_location'] ? val['destination_location']['pk'] : null;
    this.props.findTrip(departureLocation, destinationLocation, val['travel_date'], user_id, next_url, count);
  };

  fetchMoreData = () => {
    const { user_id, next_url, count, departure_location, destination_location, travel_date } = this.props;
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
    if(this.props.authenticated) {
      this.props.openPackageModal();
    } else {
      this.props.createNotif("send_package.login_msg", "Please login to create a booking request.", NOTIFICATION_TYPE_WARNING);
      this.props.openLoginModal();
    }
  }


  render() {
    const { loading, trips, next_url, count, handleSubmit, lang } = this.props;
    return (
      <Container className={"layoutcontainer"}>
          <Segment id="search_trips_section">
          <Header as="h4" textAlign="center">
            <FormattedMessage
              id="search_trips.title"
              defaultMessage="Prefer to know what shipping offers are available before committing?"
            />
          </Header>
          <form onSubmit={handleSubmit(this.submitForm)}>
          <Grid>
            <Grid.Row columns={3}>
              <Grid.Column mobile={16} tablet={16} computer={6}>
          <div>
          <label htmlFor="departure_location">
              <FormattedMessage
                id="search_trips.departure_location"
                defaultMessage="departure location"
              />
            </label>
            <div>
              <Field
                name="departure_location"
                label={lang === "en" ? "Select departure location" : "Sélectionnez le lieu de départ"}
                type="text"
                className={"custom-field"}
                component={renderCitiesList}
              />
              </div>
            </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={6}>
            <div>
            <label htmlFor="destination_location">
              <FormattedMessage
                id="search_trips.destination_location"
                defaultMessage="destination location"
              />
            </label>
              <div>
                <Field
                  name="destination_location"
                  label={lang === "en" ? "Select destination location" : "Sélectionnez la destination"}
                  type="text"
                  className={"custom-field"}
                  component={renderCitiesList}
                />
                </div>
              </div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={4}>
              <div>
              <label htmlFor="travel_date">
              <FormattedMessage
                id="search_trips.travel_date"
                defaultMessage="travel date"
              />
            </label>
                <div>
              <Field
                name="travel_date"
                showTime={false}
                component={renderDateTimePicker}
              />
              </div>
            </div>
              </Grid.Column>
              </Grid.Row>
              </Grid>
              <div className={"search-trips-button"}>
            <Button
              size="big"
              loading={loading}
              disabled={loading}
              className={"buttoncolor search-trips-button"}
            >
            <FormattedMessage
              id="search_trips.search_btn"
              defaultMessage="Search"
            />
            </Button>
            </div>
          </form>
          <Divider/>
          {trips && trips.length === 0 ? <div> <FormattedMessage
            id="search_trips.no_results"
            defaultMessage="No search results. Please try a more general search."
          /></div> : ''}
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
                  height: this.getDivHeight.bind(this),
                  margin: 6,
                  padding: 8
                }} key={index}>
                  <TripCard
                    trip_type={item["trip_type"]}
                    comeback_date={item["comeback_date"]}
                    depart_date={item["depart_date"]}
                    departure_location={item["departure_location"]}
                    destination_location={item["destination_location"]}
                    img={item["created_by"]["profile_pic"] === null ? '' : item["created_by"]["profile_pic"]}
                    creator_user_name={item["creator_user_name"]}
                    trip_id={item["pk"]}
                    no_book={false} />
                </div>
              )) : ''}
            </InfiniteScroll>
            <Header as="h4" textAlign="center">
            <FormattedMessage
              id="search_trips.cant_find_trip"
              defaultMessage="Can't find a trip? Click "
            />
            <Button inverted color='green' onClick={this.handleOpenSendPackageModal.bind(this)}>
            <FormattedMessage
              id="search_trips.click_book_request"
              defaultMessage=" here "
            /></Button> <FormattedMessage
              id="search_trips.get_contacted"
              defaultMessage=" to save a booking request so you can be later contacted by travellers."
            />
          </Header>
          </div>
        </Segment>
      </Container>
      
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
    lang: state.appConfig.lang,
    trips: state.searchTrips.trips,
    next_url: state.searchTrips.next_url,
    count: state.searchTrips.count,
    user_id: state.userInfo.userId,
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "search_trips" })(SearchTripsForm));

import React from "react";
import {
  Container,
  Button,
  Header,
  Segment,
  Divider,
  Grid,
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './searchbookingrequests.css';
// import 'rc-slider/assets/index.css';
import MultiSelect from "@khanacademy/react-multi-select";
// import 'react-widgets/dist/css/react-widgets.css';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { withRouter } from "react-router-dom";
import $ from "jquery";
import {renderDateTimePicker, renderCitiesList} from "../../containers/ReduxForm/renderField";
import { searchBookings, filterBookings, searchSuccessOverride } from "../../store/actions/searchBookings";
import BookingCard from "../../containers/BookingCard/BookingCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import { sizeMultiOptions, sizeMultiOptionsFr, categoryMultiOptions, categoryMultiOptionsFr, weightMultiOptions, weightMultiOptionsFr, valueMultiOptions, valueMultiOptionsFr } from "../../utils/options";
import { buildImagesLinkList } from "../../configurations";
import {FormattedMessage} from 'react-intl'


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
    if($(window).width() >= 768 && $(window).width() <= 950) {
      this.setState({ isTablet: true });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreenSize);
    this.props.searchSuccessOverride([], null, null);
  }

  handleDateChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  submitForm = (val) => {
    const { user_id, next_url, count } = this.props;
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

  render() {
    const { loading, bookings, next_url, count, api_been_called, handleSubmit, lang } = this.props;
    const { product_category, product_size, weight, proposed_price } = this.state;
    return (
      <Container className={"layoutcontainer"}>
        <Segment basic style={{ padding: "8em 0em" }} textAlign="center">
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
              <Grid.Column mobile={16} tablet={16} computer={5}>
          <div>
            <div>
            <label>
            <FormattedMessage
              id="search_requests.departure"
              defaultMessage="Departure"
            />
            </label>
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
            <Grid.Column mobile={16} tablet={16} computer={5}>
            <div>
              <div>
              <label>
              <FormattedMessage
                id="search_requests.destination"
                defaultMessage="Destination"
              />
              </label>
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
              <Grid.Column mobile={16} tablet={16} computer={6}>
            <div>
            <label>
            <FormattedMessage
              id="search_requests.travel_date"
              defaultMessage="Travel date"
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
              {api_been_called === true ? <Divider/> : ''}
              {api_been_called === true ? <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column mobile={16} tablet={8} computer={4}>
                  <div className={"range-div"}>
                    <p><FormattedMessage
                      id="search_requests.price"
                      defaultMessage="Price"
                    /></p>
                      <MultiSelect
                        overrideStrings={{
                          selectSomeItems: lang === "en" ? "Filter by value...": "Filtrez par valeur...",
                          allItemsAreSelected: lang === "en" ? "All Items are Selected" : "Tous les éléments sont sélectionnés",
                          selectAll: lang === "en" ? "Select All": "Tout sélectionner",
                          search: lang === "en" ? "Search" : "Rechercher",
                      }}
                        options={lang === "en" ? valueMultiOptions: valueMultiOptionsFr}
                        selected={proposed_price}
                        onSelectedChanged={proposed_price => this.setState({proposed_price})}
                      />
                  </div>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={8} computer={4}>
                  <div className={"range-div"}>
                    <p><FormattedMessage
                      id="search_requests.weight"
                      defaultMessage="Weight"
                    /></p>
                      <MultiSelect
                      overrideStrings={{
                        selectSomeItems: lang === "en" ? "Filter by weight...": "Filtrez par le poids...",
                        allItemsAreSelected: lang === "en" ? "All Items are Selected" : "Tous les éléments sont sélectionnés",
                        selectAll: lang === "en" ? "Select All": "Tout sélectionner",
                        search: lang === "en" ? "Search" : "Rechercher",
                    }}
                        options={lang === "en" ? weightMultiOptions: weightMultiOptionsFr}
                        selected={weight}
                        onSelectedChanged={weight => this.setState({weight})}
                      />
                  </div>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={8} computer={4}>
                  <div className={"range-div"}>
                  <p><FormattedMessage
                    id="search_requests.p_size"
                    defaultMessage="Product size"
                  /></p>
                    <MultiSelect
                    overrideStrings={{
                      selectSomeItems: lang === "en" ? "Filter by size...": "Filtrez par la taille...",
                      allItemsAreSelected: lang === "en" ? "All Items are Selected" : "Tous les éléments sont sélectionnés",
                      selectAll: lang === "en" ? "Select All": "Tout sélectionner",
                      search: lang === "en" ? "Search" : "Rechercher",
                  }}
                      options={lang === "en" ? sizeMultiOptions: sizeMultiOptionsFr}
                      selected={product_size}
                      onSelectedChanged={product_size => this.setState({product_size})}
                    />
                    </div>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={8} computer={4}>
                  <div className={"range-div"}>
                  <p><FormattedMessage
                    id="search_requests.p_category"
                    defaultMessage="Product category"
                  /></p>
                    <MultiSelect
                    overrideStrings={{
                      selectSomeItems: lang === "en" ? "Filter by category...": "Filtrez par la categorie...",
                      allItemsAreSelected: lang === "en" ? "All Items are Selected" : "Tous les éléments sont sélectionnés",
                      selectAll: lang === "en" ? "Select All": "Tout sélectionner",
                      search: lang === "en" ? "Search" : "Rechercher",
                  }}
                      options={lang === "en" ? categoryMultiOptions: categoryMultiOptionsFr}
                      selected={product_category}
                      onSelectedChanged={product_category => this.setState({product_category})}
                    />
                    </div>
                  </Grid.Column>
                  </Grid.Row>
                </Grid> : ''}
            <div className={"search-button"}>
            <Button
              size="big"
              loading={loading}
              disabled={loading}
              className={"buttoncolor search-button"}
            >
            <FormattedMessage
              id="search_requests.search"
              defaultMessage="Search"
            />
            </Button>
            </div>
            </form>
          <Divider/>
          {bookings === undefined || bookings.length === 0 ? <div><FormattedMessage
            id="search_requests.no_results"
            defaultMessage="No search results. Please try a more general search"
          /></div> : ''}
          <div
            id="scrollableDiv"
            style={{
              height: 800,
              overflow: 'auto',
              borderTop: '1px solid #f1f1f1',
              boxShadow: '0px 0 10px #d4d4d5',
              display: bookings && bookings.length > 0 ? "block": "none"
            }}
          >
            <InfiniteScroll
              dataLength={bookings ? bookings.length: 0}
              next={this.fetchMoreData}
              hasMore={count !== null && next_url !== null}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
            >
              {bookings ? bookings.map((item, index) => (
                <div style={{
                  height: this.getDivHeight.bind(this),
                  margin: 6,
                  padding: 8
                }} key={index}>
                  <BookingCard
                    title={item["product"]["name"]}
                    pk={item["pk"]}
                    recipient_name={item["product"]["recipient_name"]}
                    recipient_phone_number={item["product"]["recipient_phone_number"]}
                    request_by_username={item["request_by_username"]}
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
                    images={buildImagesLinkList(item["product"]["images"])}
                    editable={false}
                    selectable={false}
                    can_propose />
                </div>
              )) : ''}
            </InfiniteScroll>
          </div>
        </Segment>
      </Container>
      
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
    lang: state.appConfig.lang,
    api_been_called: state.searchBookings.api_been_called,
    next_url: state.searchBookings.next_url,
    count: state.searchBookings.count,
    user_id: state.userInfo.userId,
    initialValues: state.searchbookingsPage.initialValues,
    authenticated: state.auth.token !== null,
    departure_location: departure_location,
    destination_location: destination_location,
    travel_date: travel_date
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchBookings: (departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count) => dispatch(searchBookings(departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count)),
    filterBookings: (departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count) => dispatch(filterBookings(departure_location, destination_location, travel_date, product_category, product_size, proposed_price, weight, user_id, next_url, count)),
    searchSuccessOverride: (bookings, next, count) => dispatch(searchSuccessOverride(bookings, next, count)),
  };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "search_bookings_page", enableReinitialize: true })(SearchBookingRequestsPage)));

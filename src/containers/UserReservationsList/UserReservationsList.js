import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Select,
  Image,
  Divider
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './userreservations.css';
import { backend_url } from "../../configurations";
import ImageUploader from 'react-images-upload';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getReservations, getInitialReservations } from "../../store/actions/userReservations";
import BookingCard from "../../containers/BookingCard/BookingCard";
import $ from "jquery";

class UserReservationsList extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    isMobile: false,
    isTablet: false
  };

  handleScreenSize = () => {
    if($(window).width() < 768) {
      this.setState({ isMobile: true });
    }
    if($(window).width() >= 768 && $(window).width() <= 950) {
      this.setState({ isTablet: true });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreenSize);
  }

  componentDidMount = () => {
    const { user_id } = this.props;
    this.props.getInitialUserReservations(user_id);
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
    }

  fetchMoreData = () => {
    const { user_id, next_url, count } = this.props;
    this.props.getUserReservations(user_id, next_url, count);
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
    const { loading, reservations, next_url, count, selectable, editable } = this.props;
    const dataLength = reservations ? reservations.length : 0;
    return (
      <Segment basic className={"profile-tab-section"}>
      {reservations.length === 0 ? <div>You have no reservations</div> : <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: 'auto',
        }}
      >
        {/*Put the scroll bar always on the bottom*/}
        <InfiniteScroll
          dataLength={reservations.length}
          next={this.fetchMoreData}
          hasMore={count !== null && next_url !== null}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {reservations.map((item, index) => (
            <div style={{
              height: this.getDivHeight.bind(this),
              margin: 6,
              padding: 8
            }} key={index}>
              <BookingCard
                selectable={selectable}
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
                product_details={item["product"]}
                img={item["product"]["images"].length === 0 ? '' : item["product"]["images"][0]['image']}
                editable={editable}/>
            </div>
          ))}
        </InfiniteScroll>
      </div>}

      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    user_id: state.userInfo.user_id,
    reservations: state.userReservations.reservations,
    next_url: state.userReservations.next_url,
    count: state.userReservations.count,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserReservations: (user_id, next_url, count) => dispatch(getReservations(user_id, next_url, count)),
    getInitialUserReservations: (user_id) => dispatch(getInitialReservations(user_id)),
  };
};

UserReservationsList.propTypes = {
  profileType: PropTypes.string,
  selectable: PropTypes.boolean,
  editable: PropTypes.boolean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReservationsList);

import React from "react";
import PropTypes from "prop-types";
import {
  Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './userreservations.css';
import { buildImagesLinkList } from "../../configurations";
import InfiniteScroll from 'react-infinite-scroll-component';
import { getReservations, getInitialReservations } from "../../store/actions/userBookings";
import BookingCard from "../../containers/BookingCard/BookingCard";
import $ from "jquery";
import {FormattedMessage} from 'react-intl';

class UserBookingsList extends React.Component {
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
    const { reservations, next_url, count } = this.props;
    return (
      <React.Fragment>
      {reservations.length === 0 ? <div><FormattedMessage
        id="user_bookings.no_bookings"
        defaultMessage="You have not recieved any bookings on your trips."
      /></div> : <React.Fragment>
          <div className="dashboard-list-box with-icons">
            <div className="dashboard-title">
              <h4 className="mb-0">Liste de réservations</h4>
              <p className="mb-0">Vous retrouvez ici la liste des réservations faites sur vos voyages </p>
            </div>
            <div className="table-responsive table-desi">
              <table className="basic-table table table-hover">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Nom</th>
                    <th>Date d'arrivée</th>
                    <th>Ville de départ</th>
                    <th>Ville d'arrivée</th>
                    <th>Détail</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {reservations.map((item, index) => (
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
                    product_details={item["product"]}
                    confirmed_by_sender={item["confirmed_by_sender"]}
                    status={item["status"]}
                    img={item["product"]["images"].length === 0 ? '' : item["product"]["images"][0]['image']}
                    images={buildImagesLinkList(item["product"]["images"])}
                    editable={false}
                    selectable={false}
                    validate_decline/>
              ))}


                </tbody>
              </table>
            </div>
          </div>
    </React.Fragment>
    }

    </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    user_id: state.userInfo.userId,
    reservations: state.userBookings.reservations,
    next_url: state.userBookings.next_url,
    count: state.userBookings.count,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserReservations: (user_id, next_url, count) => dispatch(getReservations(user_id, next_url, count)),
    getInitialUserReservations: (user_id) => dispatch(getInitialReservations(user_id)),
  };
};

UserBookingsList.propTypes = {
  profileType: PropTypes.string,
  selectable: PropTypes.boolean,
  editable: PropTypes.boolean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBookingsList);

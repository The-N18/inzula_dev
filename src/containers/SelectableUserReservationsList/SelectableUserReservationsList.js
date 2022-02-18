import React from "react";
import PropTypes from "prop-types";
import {
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './selectableuserreservations.css';
import { buildImagesLinkList } from "../../configurations";
import InfiniteScroll from 'react-infinite-scroll-component';
import { selectBooking } from "../../store/actions/selectReservationsModal";
import { getSelectableReservations, getInitialSelectableReservations } from "../../store/actions/selectableUserReservations";
import BookingCard from "../../containers/BookingCard/BookingCard";
import $ from "jquery";
import {FormattedMessage} from 'react-intl'

class SelectableUserReservationsList extends React.Component {
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
    this.props.selectBooking([]);
  }

  componentDidMount = () => {
    // const { user_id, tripId } = this.props;
    // this.props.getInitialSelectableUserReservations(user_id, tripId);
    // $('#selectReservations').on('show.bs.modal', function () {
    //   this.props.getInitialSelectableUserReservations(this.props.user_id, this.props.tripId);
    //   $("#selectReservations").off('show.bs.modal');
    // }.bind(this));
  
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();

    }

  fetchMoreData = () => {
    const { user_id, tripId, next_url, count } = this.props;
    this.props.getSelectableUserReservations(user_id, tripId, next_url, count);
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
    const { reservations, next_url, count, selectable, editable} = this.props;
    const dataLength = reservations ? reservations.length : 0;
    console.log("BOOOOOOOOOOX2")
    return (
      <React.Fragment>
        {reservations.length === 0 ? <div><FormattedMessage
          id="user_reservations.no_reservations_matching"
          defaultMessage="You have not created any reservations."
        /></div> : <React.Fragment>
            <div className="dashboard-list-box with-icons">
              <div className="dashboard-title">
                <h4 className="mb-0">Liste de mes colis</h4>
                <p className="mb-0">Vous retrouvez ici la liste des colis que vous avez ajouté </p>
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
                    </tr>
                  </thead>
                  <tbody>
                  {reservations.map((item, index) => (
                      <BookingCard
                      key={index}
                      selectable={selectable}
                      title={item["product"]["name"]}
                      recipient_name={item["product"]["recipient_name"]}
                      recipient_phone_number={item["product"]["recipient_phone_number"]}
                      request_by_username={item["request_by_username"]}
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
                      images={buildImagesLinkList(item["product"]["images"])}
                      editable={editable}/>
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
    reservations: state.selectableUserReservations.reservations,
    next_url: state.selectableUserReservations.next_url,
    count: state.selectableUserReservations.count,
    tripId: state.selectReservationsModal.tripId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSelectableUserReservations: (user_id, trip_id, next_url, count) => dispatch(getSelectableReservations(user_id, trip_id, next_url, count)),
    getInitialSelectableUserReservations: (user_id, trip_id) => dispatch(getInitialSelectableReservations(user_id, trip_id)),
    selectBooking: (selected) => dispatch(selectBooking(selected)),
  };
};

SelectableUserReservationsList.propTypes = {
  profileType: PropTypes.string,
  selectable: PropTypes.boolean,
  editable: PropTypes.boolean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectableUserReservationsList);

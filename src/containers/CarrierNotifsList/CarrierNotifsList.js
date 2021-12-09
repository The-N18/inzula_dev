import React from "react";
import PropTypes from "prop-types";
import {
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './usernotifslist.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getNotifs, getInitialNotifs } from "../../store/actions/carrierNotifs";
import NotifCard from "../../containers/NotifCard/NotifCard";
import $ from "jquery";
import {FormattedMessage} from 'react-intl'

class CarrierNotifsList extends React.Component {
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
    if($(window).width() >= 768) {
      this.setState({ isTablet: true });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreenSize);
  }

  componentDidMount = () => {
    const { user_id, next_url, count } = this.props;
    this.props.getInitialNotifs(user_id, next_url, count);
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
    }

  fetchMoreData = () => {
    const { user_id, next_url, count } = this.props;
    this.props.getUserNotifs(user_id, next_url, count);
  }

  getDivHeight = () => {
    const { isMobile, isTablet } = this.state;
    let val = 240;
    if(isTablet) {
      val = 100;
    }
    if(isMobile) {
      val = 190;
    }
    return val;
  }


  render() {
    const { notifs, next_url, count } = this.props;
    return (
      <Segment basic className={"profile-tab-section"}>
      {notifs && notifs !== undefined && notifs.length === 0 ? <div>
        <FormattedMessage
          id="carrier_notifs.no_notifs"
          defaultMessage="You have no notifications"
        /></div> : <div
        id="scrollableDiv"
        style={{
          height: 800,
          overflow: 'auto',
          borderTop: '1px solid #f1f1f1',
          boxShadow: '0px 0 10px #d4d4d5',
          display: notifs.length > 0 ? "block": "none"
        }}
      >
        <InfiniteScroll
          dataLength={notifs ? notifs.length : 0}
          next={this.fetchMoreData}
          hasMore={count !== null && next_url !== null}
          loader={<h4><FormattedMessage
            id="carrier_notifs.loading"
            defaultMessage="Loading"
          /></h4>}
          scrollableTarget="scrollableDiv"
        >
          {notifs && notifs.map((item, index) => (
            <div style={{
              height: this.getDivHeight.bind(this),
              margin: 6,
              padding: 8
            }} key={index}>
              <NotifCard
                pk={item["pk"]}
                type={item["type"]}
                creator_username={item["creator_username"]}
                created_on={item["created_on"]}
                status={item["status"]}
                booking_request_id={item["booking_request"]["pk"] || ''}
                product_name={item["booking_request"]["product_name"] || ''}
                trip_id={item["trip"]["pk"] || ''}
                trip_dep_loc={item["trip"]["dep_loc"] || ''}
                trip_des_loc={item["trip"]["des_loc"] || ''}
                trip_dep_date={item["trip"]["dep_date"] || ''}
                offer_price={item["proposal"]["price"] || ''}
                />
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
    loading: state.carrierNotifs.loading,
    error: state.carrierNotifs.error,
    user_id: state.userInfo.userId,
    notifs: state.carrierNotifs.notifs,
    next_url: state.carrierNotifs.next_url,
    count: state.carrierNotifs.count,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserNotifs: (user_id, next_url, count) => dispatch(getNotifs(user_id, next_url, count)),
    getInitialNotifs: (user_id, next_url, count) => dispatch(getInitialNotifs(user_id, next_url, count))
  };
};

CarrierNotifsList.propTypes = {
  profileType: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarrierNotifsList);

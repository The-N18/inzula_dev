import React from "react";
import PropTypes from "prop-types";
import {
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './usernotifslist.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getNotifs, getInitialNotifs } from "../../store/actions/senderNotifs";
import NotifCard from "../../containers/NotifCard/NotifCard";
import $ from "jquery";
import {FormattedMessage} from 'react-intl'

class SenderNotifsList extends React.Component {
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
      val = 300;
    }
    if(isMobile) {
      val = 445;
    }
    return val;
  }


  render() {
    const { notifs, next_url, count } = this.props;
    return (
      <div className="dashboard-content">
        {notifs && notifs !== undefined && notifs.length === 0 ? <div>
        <FormattedMessage
          id="sender_notifs.no_notifs"
          defaultMessage="You have no notifications"
        /></div> : <div className="dashboard-review single-comments">
          <div className="comments">
          {notifs && notifs.map((item, index) => (
            <NotifCard
              key={index}
              pk={item["pk"]}
              type={item["type"]}
              status={item["status"]}
              created_on={item["created_on"]}
              creator_username={item["creator_username"]}
              booking_request_id={item["booking_request"]["pk"] || ''}
              product_name={item["booking_request"]["product_name"] || ''}
              trip_id={item["trip"]["pk"] || ''}
              trip_dep_loc={item["trip"]["dep_loc"] || ''}
              trip_des_loc={item["trip"]["des_loc"] || ''}
              trip_dep_date={item["trip"]["dep_date"] || ''}
              offer_price={item["proposal"]["price"] || ''}
              img={item["created_by"]["profile_pic"] === null ? '' : item["created_by"]["profile_pic"]}
            />
            ))}
          </div>
          <div className="pagination-main text-center">
            <ul className="pagination">
              <li><a href="#"><i className="fa fa-angle-double-left" aria-hidden="true" /></a></li>
              <li className="active"><a href="#">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#"><i className="fa fa-angle-double-right" aria-hidden="true" /></a></li>
            </ul>
          </div>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.senderNotifs.loading,
    error: state.senderNotifs.error,
    user_id: state.userInfo.userId,
    notifs: state.senderNotifs.notifs,
    next_url: state.senderNotifs.next_url,
    count: state.senderNotifs.count,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserNotifs: (user_id, next_url, count) => dispatch(getNotifs(user_id, next_url, count)),
    getInitialNotifs: (user_id, next_url, count) => dispatch(getInitialNotifs(user_id, next_url, count))
  };
};

SenderNotifsList.propTypes = {
  profileType: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SenderNotifsList);

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
import styles from './usernotifslist.css';
import { backend_url } from "../../configurations";
import ImageUploader from 'react-images-upload';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getNotifs, getInitialNotifs } from "../../store/actions/userNotifs";
import NotifCard from "../../containers/NotifCard/NotifCard";
import $ from "jquery";

class UserNotifsList extends React.Component {
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


  render() {
    const { loading, notifs, next_url, count } = this.props;
    const dataLength = notifs ? notifs.length : 0;
    return (
      <Segment basic className={"profile-tab-section"}>
      {notifs.length === 0 ? <div>You have no notifications</div> : <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: 'auto',
        }}
      >
        <InfiniteScroll
          dataLength={notifs.length}
          next={this.fetchMoreData}
          hasMore={count !== null && next_url !== null}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {notifs.map((item, index) => (
            <div style={{
              height: 240,
              margin: 6,
              padding: 8
            }} key={index}>
              <NotifCard
                pk={item["pk"]}
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
    loading: state.userNotifs.loading,
    error: state.userNotifs.error,
    user_id: state.userInfo.userId,
    notifs: state.userNotifs.notifs,
    next_url: state.userNotifs.next_url,
    count: state.userNotifs.count,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserNotifs: (user_id, next_url, count) => dispatch(getNotifs(user_id, next_url, count)),
    getInitialNotifs: (user_id, next_url, count) => dispatch(getInitialNotifs(user_id, next_url, count))
  };
};

UserNotifsList.propTypes = {
  profileType: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserNotifsList);

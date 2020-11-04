import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Select,
  Image
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './userreservations.css';
import { backend_url } from "../../configurations";
import ImageUploader from 'react-images-upload';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getReservations } from "../../store/actions/userReservations";

class UserReservationsList extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
  };

  componentDidMount = () => {
    console.log("in component did mount");
    const { user_id, next_url, count } = this.props;
    this.props.getUserReservations(user_id, next_url, count);
    }

  fetchMoreData = () => {
    console.log("fetch more data")
    const { user_id, next_url, count } = this.props;
    this.props.getUserReservations(user_id, next_url, count);
  }


  render() {
    const { loading, reservations, next_url, count } = this.props;
    const dataLength = reservations ? reservations.length : 0;
    return (
      <Segment basic className={"profile-tab-section"}>
      <div
        id="scrollableDiv"
        style={{
          height: 300,
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
          {reservations.map((_, index) => (
            <div style={{
              height: 35,
              margin: 6,
              padding: 8
            }} key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
      </div>

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
    getUserReservations: (user_id, next_url, count) => dispatch(getReservations(user_id, next_url, count))
  };
};

UserReservationsList.propTypes = {
  profileType: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReservationsList);

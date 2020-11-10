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
import styles from './usertripslist.css';
import { backend_url } from "../../configurations";
import ImageUploader from 'react-images-upload';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getTrips } from "../../store/actions/userTrips";
import TripCard from "../../containers/TripCard/TripCard";

class UserTripsList extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
  };

  componentDidMount = () => {
    console.log("in component did mount");
    const { user_id, next_url, count } = this.props;
    this.props.getUserTrips(user_id, next_url, count);
    }

  fetchMoreData = () => {
    console.log("fetch more data")
    const { user_id, next_url, count } = this.props;
    this.props.getUserTrips(user_id, next_url, count);
  }


  render() {
    const { loading, trips, next_url, count } = this.props;
    const dataLength = trips ? trips.length : 0;
    return (
      <Segment basic className={"profile-tab-section"}>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: 'auto',
        }}
      >
        {/*Put the scroll bar always on the bottom*/}
        <InfiniteScroll
          dataLength={trips.length}
          next={this.fetchMoreData}
          hasMore={count !== null && next_url !== null}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {trips.map((item, index) => (
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
                username={item["created_by"]["username"]}
                no_book={true}/>
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
    trips: state.userTrips.trips,
    next_url: state.userTrips.next_url,
    count: state.userTrips.count,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserTrips: (user_id, next_url, count) => dispatch(getTrips(user_id, next_url, count))
  };
};

UserTripsList.propTypes = {
  profileType: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTripsList);

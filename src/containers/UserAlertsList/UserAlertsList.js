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
import styles from './useralerts.css';
import { backend_url } from "../../configurations";
import ImageUploader from 'react-images-upload';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAlerts } from "../../store/actions/userAlerts";
import BookingCard from "../../containers/BookingCard/BookingCard";

class UserAlertsList extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
  };

  componentDidMount = () => {
    console.log("in component did mount");
    const { user_id, next_url, count } = this.props;
    // this.props.getUserAlerts(user_id, next_url, count);
    }

  fetchMoreData = () => {
    console.log("fetch more data")
    const { user_id, next_url, count } = this.props;
    // this.props.getUserAlerts(user_id, next_url, count);
  }


  render() {
    const { loading, alerts, next_url, count, selectable } = this.props;
    const dataLength = alerts ? alerts.length : 0;
    return (
      <Segment basic className={"profile-tab-section"}>
      {alerts.length === 0 ? <div>You have no alerts</div> : <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: 'auto',
        }}
      >
        {/*Put the scroll bar always on the bottom*/}
        <InfiniteScroll
          dataLength={alerts.length}
          next={this.fetchMoreData}
          hasMore={count !== null && next_url !== null}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {alerts.map((item, index) => (
            <div style={{
              height: 200,
              margin: 6,
              padding: 8
            }} key={index}>
              <BookingCard
                selectable={selectable}
                pk={item["product"]["pk"]}
                title={item["product"]["name"]}
                arrival_date={item["product"]["arrival_date"]}
                description={item["product"]["description"]}
                departure_location={item["product"]["departure_location"]["city"]}
                pickup_location={item["product"]["destination_location"] !== null ? item["product"]["destination_location"]["city"] : ''}
                img={item["product"]["images"].length === 0 ? '' : item["product"]["images"][0]['image']}/>
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
    alerts: state.userAlerts.alerts,
    next_url: state.userAlerts.next_url,
    count: state.userAlerts.count,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserAlerts: (user_id, next_url, count) => dispatch(getAlerts(user_id, next_url, count))
  };
};

UserAlertsList.propTypes = {
  profileType: PropTypes.string,
  selectable: PropTypes.boolean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAlertsList);

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
import styles from './userfinance.css';
import { backend_url } from "../../configurations";
import ImageUploader from 'react-images-upload';
import InfiniteScroll from 'react-infinite-scroll-component';

class UserFinance extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
  };

  componentDidMount = () => {
    console.log("in component did mount");
    }

  fetchMoreData = () => {
    console.log("fetch more data");
  }


  render() {
    const { loading, alerts, next_url, count, selectable } = this.props;
    const dataLength = alerts ? alerts.length : 0;
    return (
      <Segment basic className={"profile-tab-section"}>
      In progress
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

UserFinance.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFinance);

import React from "react";
import {
  Segment,
  Header
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './terms.css';
import { withRouter } from "react-router-dom";

class Terms extends React.Component {

  render() {
    return (
      <Segment basic style={{ padding: "12em 0em" }} textAlign="center">
      <Header as="h2" textAlign="center" color="teal">
        Terms and conditions
      </Header>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Terms));

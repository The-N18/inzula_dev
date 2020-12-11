import React from "react";
import {
  Segment,
  Button,
  Icon,
  Header
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './faqs.css';
import { withRouter } from "react-router-dom";

class Faqs extends React.Component {

  render() {
    return (
      <Segment basic style={{ padding: "12em 0em" }} textAlign="center">
      <Header as="h2" textAlign="center" color="teal">
        Frequently asked questions
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
)(Faqs));

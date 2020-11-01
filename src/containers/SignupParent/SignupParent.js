import React from "react";
import {
  Segment,
  Button,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './signupparent.css';
import { NavLink, Redirect } from "react-router-dom";

class SignupParent extends React.Component {

  render() {
    return (
      <Segment basic style={{ padding: "12em 0em" }} textAlign="center">
        <Segment basic textAlign="center" className={"signupparent-segment"}>
        <Segment raised className={"signupparentcard"} textAlign="center">
          <Button fluid color='facebook' className={"signupparent-button"}>
            <Icon name='facebook' /> Sign up with Facebook
          </Button>
          <Button fluid color='google plus' className={"signupparent-button"}>
            <Icon name='google plus' /> Sign up with Gmail
          </Button>
          <NavLink to="/signupemail"><Button fluid color='white' className={"signupparent-button"}>
            <Icon name='mail' /> Use email address
          </Button></NavLink>
        </Segment>
        <Segment raised className={"signupparentcard"} textAlign="center">
          Already a member? <NavLink to="/login">Sign In</NavLink>
        </Segment>
      </Segment>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupParent);

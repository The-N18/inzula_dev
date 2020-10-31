import React from "react";
import {
  Segment,
  Button,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './loginparent.css';
import { NavLink, Redirect } from "react-router-dom";

class LoginParent extends React.Component {

  render() {
    return (
      <Segment basic style={{ padding: "12em 0em" }} textAlign="center">
        <Segment basic textAlign="center" className={"signupparent-segment"}>
        <Segment raised className={"signupparentcard"} textAlign="center">
          <Button fluid color='facebook' className={"signupparent-button"}>
            <Icon name='facebook' /> Connect with Facebook
          </Button>
          <Button fluid color='google plus' className={"signupparent-button"}>
            <Icon name='google plus' /> Connect with Gmail
          </Button>
          <NavLink to="/loginemail"><Button fluid color='white' className={"signupparent-button"}>
            <Icon name='mail' /> Use email address
          </Button></NavLink>
        </Segment>
        <Segment raised className={"signupparentcard"} textAlign="center">
          Not yet a member? <NavLink to="/signup">Sign up</NavLink>
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
)(LoginParent);

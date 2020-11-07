import React from "react";
import {
  Segment,
  Button,
  Icon,
  Header
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './signupparentwithdiscount.css';
import { NavLink, Redirect } from "react-router-dom";
import { authSetDiscountText } from "../../store/actions/auth";

class SignupParentWithDiscount extends React.Component {

  componentWillMount() {
    this.props.setDiscountText("Signup now to benefit from a 5% discount for each of your first three parcel epeditions.");
  }

  render() {
    return (
      <Segment basic style={{ padding: "12em 0em" }} textAlign="center">
      <Header as="h2" textAlign="center" color="teal">
        Signup now to benefit from a 5% discount for each of your first three parcel epeditions.
      </Header>
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
    setDiscountText: (text) => dispatch(authSetDiscountText(text))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupParentWithDiscount);

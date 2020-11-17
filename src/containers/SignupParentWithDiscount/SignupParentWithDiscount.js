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
import { openSignupModal } from "../../store/actions/signupModal";

class SignupParentWithDiscount extends React.Component {

  componentWillMount() {
    this.props.setDiscountText("Signup now to benefit from a 5% discount for each of your first three parcel epeditions.");
  }

  render() {
    return (
      <Segment basic style={{ padding: "12em 0em" }} textAlign="center">
      <Header as="h4" textAlign="center" color="teal">
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
          <Button fluid color='white' className={"signupparent-button"} onClick={() => this.props.openSignupModal()}>
            <Icon name='mail' /> Use email address
          </Button>
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
    setDiscountText: (text) => dispatch(authSetDiscountText(text)),
    openSignupModal: () => dispatch(openSignupModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupParentWithDiscount);

import React from "react";
import {
  Segment,
  Button,
  Icon,
  Header
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './signupparentwithdiscount.css';
import { authSetDiscountText } from "../../store/actions/auth";
import { openSignupModalWithDiscount } from "../../store/actions/signupModal";
import {FormattedMessage} from 'react-intl'

class SignupParentWithDiscount extends React.Component {

  componentWillMount() {
    this.props.setDiscountText("Signup now to benefit from a 5% discount for each of your first three parcel epeditions.");
  }

  handleOnModalOpen = () => {
    this.props.openSignupModalWithDiscount();
  }

  render() {
    return (
      <Segment basic style={{ padding: "12em 0em" }} textAlign="center">
      <Header as="h4" textAlign="center" color="teal">
      <FormattedMessage
        id="signup_discount.title"
        defaultMessage="Signup now to benefit from a 5% discount for each of your first three parcel epeditions."
      />
      </Header>
        <Segment basic textAlign="center" className={"signupparent-segment"}>
        <Segment raised className={"signupparentcard"} textAlign="center">
          <Button fluid color='white' className={"signupparent-button"} onClick={this.handleOnModalOpen.bind(this)}>
            <Icon name='mail' /> <FormattedMessage
              id="signup_discount.username"
              defaultMessage="Use username"
            />
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
    openSignupModalWithDiscount: () => dispatch(openSignupModalWithDiscount()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupParentWithDiscount);

import React from "react";
import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './signupparentmodal.css';
import { NavLink, Redirect } from "react-router-dom";
import { openSignupParentModal, closeSignupParentModal } from "../../store/actions/signupParentModal";
import { openSignupModal } from "../../store/actions/signupModal";
import { openLoginParentModal } from "../../store/actions/loginParentModal";
import {FormattedMessage, FormattedDate} from 'react-intl'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from "../../configurations";
import { googleLogin, facebookLogin } from "../../store/actions/auth";


class SignupParentModal extends React.Component {

  handleSignin = () => {
    this.props.closeSignupParentModal();
    this.props.openLoginParentModal();
  }

  useFacebook = (response) => {
    // this.props.facebookLogin(response);
  }

  useGoogle = (response) => {
    this.props.googleLogin(response);
  }

  render() {
    const { open } = this.props;

    return (
      <Modal
      closeIcon
        centered={false}
        open={open}
        onClose={() => this.props.closeSignupParentModal()}
        onOpen={() => this.props.openSignupParentModal()}
        size='large'
      >
        <Modal.Header>
          <FormattedMessage
            id="signup.title"
            defaultMessage="Sign up"
          />
        </Modal.Header>
        <Modal.Content scrolling>
      <Segment basic style={{ padding: "6em 0em" }} textAlign="center">
        <Segment basic textAlign="center" className={"signupparent-segment"}>
        <Segment raised className={"signupparentcard"} textAlign="center">
        <FacebookLogin
          textButton="Login with facebook"
          appId={FACEBOOK_APP_ID}
          fields="name,email,picture"
          callback={this.useFacebook}
          render={renderProps => (
            <Button fluid color='facebook' className={"signupparent-button"} onClick={renderProps.onClick}>
            <Icon name='facebook' />
              <FormattedMessage
                id="signup.use_fb"
                defaultMessage="Sign up with Facebook"
              />
          </Button>)}
        />
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login with google"
          onSuccess={this.useGoogle}
          onFailure={this.useGoogle}
          render={renderProps => (
            <Button fluid color='google plus' className={"signupparent-button"} onClick={renderProps.onClick}>
            <Icon name='google plus' />
              <FormattedMessage
                id="signup.use_gmail"
                defaultMessage="Sign up with Gmail"
              />
          </Button>)}
        />
          <Button fluid className={"signupparent-button"} onClick={() => this.props.openSignupModal()}>
            <Icon name='mail' />
              <FormattedMessage
                id="signup.use_email"
                defaultMessage="Use username"
              />
          </Button>
        </Segment>
        <Segment raised className={"signupparentcard"} textAlign="center">
          <FormattedMessage
            id="signup.have_account"
            defaultMessage="Already a member?"
          /> <span className={"mimic-anchor"} onClick={this.handleSignin.bind(this)}>
          <FormattedMessage
            id="signup.login"
            defaultMessage="Sign in"
          /></span>
        </Segment>
      </Segment>
      </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closeSignupParentModal()} primary>
          <FormattedMessage
            id="signup.cancel"
            defaultMessage="Cancel"
          /> <Icon name='cancel' />
        </Button>
      </Modal.Actions>
    </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.signupParentModal.open,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openSignupParentModal: () => dispatch(openSignupParentModal()),
    closeSignupParentModal: () => dispatch(closeSignupParentModal()),
    openSignupModal: () => dispatch(openSignupModal()),
    openLoginParentModal: () => dispatch(openLoginParentModal()),
    googleLogin: (response) => dispatch(googleLogin(response)),
    facebookLogin: (response) => dispatch(facebookLogin(response)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupParentModal);

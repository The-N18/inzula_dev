import React from "react";
import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './loginparentmodal.css';
import { NavLink, Redirect } from "react-router-dom";
import { openLoginParentModal, closeLoginParentModal } from "../../store/actions/loginParentModal";
import { openLoginModal } from "../../store/actions/loginModal";
import { googleLogin, facebookLogin } from "../../store/actions/auth";
import { openSignupParentModal } from "../../store/actions/signupParentModal";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {FormattedMessage, FormattedDate} from 'react-intl'
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from "../../configurations";

class LoginParentModal extends React.Component {

  handleSignup = () => {
    this.props.closeLoginParentModal();
    this.props.openSignupParentModal();
  }

  useFacebook = (response) => {
    console.log("use facebook", response);
    this.props.facebookLogin(response);
  }

  useGoogle = (response) => {
    console.log("use google", response);
    this.props.googleLogin(response);
  }

  render() {
    const { open } = this.props;
    return (
      <Modal
        centered={false}
        open={open}
        onClose={() => this.props.closeLoginParentModal()}
        onOpen={() => this.props.openLoginParentModal()}
        size='large'
      >
        <Modal.Header>
          <FormattedMessage
            id="login_parent.sign_in"
            defaultMessage="Sign in"
          />
        </Modal.Header>
        <Modal.Content scrolling>
      <Segment basic style={{ padding: "8em 0em" }} textAlign="center">
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
                    id="login_parent.use_facebook"
                    defaultMessage="Sign in with Facebook"
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
                    id="login_parent.use_gmail"
                    defaultMessage="Sign in with Gmail"
                  />
              </Button>)}
          />
          <Button fluid className={"signupparent-button"} onClick={() => this.props.openLoginModal()}>
            <Icon name='mail' /> <FormattedMessage
              id="login_parent.use_username"
              defaultMessage="Use username"
            />
          </Button>
        </Segment>
        <Segment raised className={"signupparentcard"} textAlign="center">
          <FormattedMessage
            id="login_parent.not_yet_signed_up"
            defaultMessage="Not yet a member?"
          /><span className={"mimic-anchor"} onClick={this.handleSignup.bind(this)}>
          <FormattedMessage
            id="login_parent.signup_btn"
            defaultMessage="Sign up"
          /></span>
        </Segment>
      </Segment>
      </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closeLoginParentModal()} primary>
          <FormattedMessage
            id="login_parent.cancel"
            defaultMessage="Cancel"
          /><Icon name='cancel' />
        </Button>
      </Modal.Actions>
    </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.loginParentModal.open,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openLoginParentModal: () => dispatch(openLoginParentModal()),
    closeLoginParentModal: () => dispatch(closeLoginParentModal()),
    openLoginModal: () => dispatch(openLoginModal()),
    openSignupParentModal: () => dispatch(openSignupParentModal()),
    googleLogin: (response) => dispatch(googleLogin(response)),
    facebookLogin: (response) => dispatch(facebookLogin(response)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginParentModal);

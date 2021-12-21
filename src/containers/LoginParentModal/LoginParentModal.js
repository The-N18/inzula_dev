import React from "react";

import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './loginparentmodal.css';
import { openLoginParentModal, closeLoginParentModal } from "../../store/actions/loginParentModal";
import { openLoginModal } from "../../store/actions/loginModal";
import { googleLogin, facebookLogin } from "../../store/actions/auth";
import { openSignupParentModal } from "../../store/actions/signupParentModal";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {FormattedMessage} from 'react-intl'
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from "../../configurations";

import LoginModal from "../../containers/LoginReduxFormModal/LoginModal";

// import jQuery from 'jquery';
// window.jQuery = jQuery;
// require('bootstrap')

class LoginParentModal extends React.Component {

  handleSignup = () => {
    this.props.closeLoginParentModal();
    this.props.openSignupParentModal();
  }

  useFacebook = (response) => {
    // this.props.facebookLogin(response);
  }

  useGoogle = (response) => {
    // this.props.googleLogin(response);
  }

  // switchModals = () => {
  //   jQuery('#login').modal('hide');
  //   jQuery('#register').modal('show');
  // }

  render() {
    const { open } = this.props;
    return (

      <div className="modal fade" id="login" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header bordernone p-0">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body p-0">
              <div className="login-content p-4 text-center">
                <div className="login-title section-border">
                  <h3 className="pink">Se connecter</h3>                    
                </div>
                <LoginModal />
                <div className="login-social border-t mt-3 pt-2 mb-3">
                  <p className="mb-2">Ou continuer avec</p>
                  <FacebookLogin
                    textButton="Login with facebook"
                    appId={FACEBOOK_APP_ID}
                    fields="name,email,picture"
                    callback={this.useFacebook}
                    isDisabled
                    render={renderProps => (
                      <a onClick={renderProps.onClick} className="btn-facebook"><i className="fab fa-facebook" aria-hidden="true" /> Facebook</a>
                    )}
                  />
                  <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Login with google"
                    onSuccess={this.useGoogle}
                    onFailure={this.useGoogle}
                    disabled
                    render={renderProps => (
                      <a onClick={renderProps.onClick} className="btn-google"><i className="fab fa-google" aria-hidden="true" /> Google</a>
                      )}
                  />  
                </div>
                <div className="sign-up">
                  <p className="m-0">Vous n'avez pas de compte? <a href="#" className="pink" >S'inscrire</a></p>
                </div>                
              </div>
            </div>
          </div>
        </div>
      </div>
    //   <Modal
    //   closeIcon
    //     centered={false}
    //     open={open}
    //     onClose={() => this.props.closeLoginParentModal()}
    //     onOpen={() => this.props.openLoginParentModal()}
    //     size='large'
    //   >
    //     <Modal.Header>
    //       <FormattedMessage
    //         id="login_parent.sign_in"
    //         defaultMessage="Sign in"
    //       />
    //     </Modal.Header>
    //     <Modal.Content scrolling>
    //   <Segment basic style={{ padding: "8em 0em" }} textAlign="center">
    //     <Segment basic textAlign="center" className={"signupparent-segment"}>
    //     <Segment raised className={"signupparentcard"} textAlign="center">

    //       <FacebookLogin
    //         textButton="Login with facebook"
    //         appId={FACEBOOK_APP_ID}
    //         fields="name,email,picture"
    //         callback={this.useFacebook}
    //         isDisabled
    //         render={renderProps => (
    //           <Button disabled fluid color='facebook' className={"signupparent-button"} onClick={renderProps.onClick}>
    //             <Icon name='facebook' />
    //               <FormattedMessage
    //                 id="login_parent.use_facebook"
    //                 defaultMessage="Sign in with Facebook"
    //               />
    //           </Button>)}
    //       />
    //       <GoogleLogin
    //         clientId={GOOGLE_CLIENT_ID}
    //         buttonText="Login with google"
    //         onSuccess={this.useGoogle}
    //         onFailure={this.useGoogle}
    //         disabled
    //         render={renderProps => (
    //           <Button disabled fluid color='google plus' className={"signupparent-button"} onClick={renderProps.onClick}>
    //             <Icon name='google plus' />
    //               <FormattedMessage
    //                 id="login_parent.use_gmail"
    //                 defaultMessage="Sign in with Gmail"
    //               />
    //           </Button>)}
    //       />
    //       <Button fluid className={"signupparent-button"} onClick={() => this.props.openLoginModal()}>
    //         <Icon name='mail' /> <FormattedMessage
    //           id="login_parent.use_username"
    //           defaultMessage="Use username"
    //         />
    //       </Button>
    //     </Segment>
    //     <Segment raised className={"signupparentcard"} textAlign="center">
    //       <FormattedMessage
    //         id="login_parent.not_yet_signed_up"
    //         defaultMessage="Not yet a member?"
    //       /><span className={"mimic-anchor"} onClick={this.handleSignup.bind(this)}>
    //       <FormattedMessage
    //         id="login_parent.signup_btn"
    //         defaultMessage="Sign up"
    //       /></span>
    //     </Segment>
    //   </Segment>
    //   </Segment>
    //   </Modal.Content>
    //   <Modal.Actions>
    //     <Button negative onClick={() => this.props.closeLoginParentModal()} primary>
    //       <FormattedMessage
    //         id="login_parent.cancel"
    //         defaultMessage="Cancel"
    //       /><Icon name='cancel' />
    //     </Button>
    //   </Modal.Actions>
    // </Modal>
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

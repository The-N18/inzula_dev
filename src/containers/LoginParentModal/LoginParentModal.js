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

import $ from 'jquery';
window.jQuery = $;
// window.$ = $;
// global.jQuery = $;
require('bootstrap');




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

  switchModals = () => {
    console.log("IN SWITCHMODALS1");
    $("#login").modal("hide");
    $("#login").on('hidden.bs.modal', function (e) {
      console.log("IN SWITCHMODALS2");
      $('#register').modal('show');
      $("#login").off('hidden.bs.modal');
    })
    
  }

  render() {
    const { open } = this.props;
    return (

      <div className="modal fade"  id="login" tabIndex={-1} role="dialog" aria-hidden="true">
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
                  <p className="m-0">Vous n'avez pas de compte? <a href="#" onClick={this.switchModals}  className="pink">S'inscrire</a></p>
                </div>                
              </div>
            </div>
          </div>
        </div>
      </div>

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

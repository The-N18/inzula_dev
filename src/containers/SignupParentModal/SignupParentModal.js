import React from "react";
import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './signupparentmodal.css';
import { openSignupParentModal, closeSignupParentModal } from "../../store/actions/signupParentModal";
import { openSignupModal } from "../../store/actions/signupModal";
import { openLoginParentModal } from "../../store/actions/loginParentModal";
import {FormattedMessage} from 'react-intl'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from "../../configurations";
import { googleLogin, facebookLogin } from "../../store/actions/auth";

import SignupModal from "../../containers/SignupReduxFormModal/SignupModal";

import $ from 'jquery';
window.jQuery = $;
require('bootstrap');


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

  switchModals = () => {
    console.log("IN SWITCHMODALS1");
    $("#register").modal("hide");
    $("#register").on('hidden.bs.modal', function (e) {
      console.log("IN SWITCHMODALS2");
      $('#login').modal('show');
      $("#register").off('hidden.bs.modal');
    })
  }

  render() {
    const { open } = this.props;

    return (
      <div className="modal fade" id="register" tabIndex={-1} role="dialog" aria-hidden="true">
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
                  <h3 className="pink mb-1">Inscrivez vous sur Inzula</h3>  
                  <p>Et rejoignez notre communauté</p>                  
                </div>
                <SignupModal />
                <div className="login-social border-t mt-3 pt-2 mb-3">
                  <p className="mb-2">Ou continuer avec</p>
                  <FacebookLogin
                    textButton="Login with facebook"
                    appId={FACEBOOK_APP_ID}
                    fields="name,email,picture"
                    callback={this.useFacebook}
                    isDisabled
                    render={renderProps => (
                      <a href="#" onClick={renderProps.onClick} className="btn-facebook"><i className="fab fa-facebook" aria-hidden="true" /> Facebook</a>
                    )}
                  />
                  <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Login with google"
                    onSuccess={this.useGoogle}
                    onFailure={this.useGoogle}
                    disabled
                    render={renderProps => (
                      <a href="#" onClick={renderProps.onClick} className="btn-google"><i className="fab fa-google" aria-hidden="true" /> Google</a>
                    )}
                  />
                </div>
                <div className="sign-up">
                  <p className="m-0">Vous avez déjà un compte? <a href="#" onClick={this.switchModals} className="pink">Se connecter</a></p>
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

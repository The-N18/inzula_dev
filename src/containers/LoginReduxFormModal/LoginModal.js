import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import styles from './login.css';
import {
  Segment,
  Button,
  Grid,
  Header,
  Modal,
  Icon
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { authLogin } from "../../store/actions/auth";
import { connect } from "react-redux";
import { validate } from "./validation";
import { openLoginModal, closeLoginModal } from "../../store/actions/loginModal";
import { openForgotPasswordModal} from "../../store/actions/forgotPasswordModal";
import { closeLoginParentModal } from "../../store/actions/loginParentModal";
import { openSignupParentModal } from "../../store/actions/signupParentModal";
import {renderField} from "../../containers/ReduxForm/renderField";
import {FormattedMessage} from 'react-intl'


class LoginForm extends Component {

  submitForm = (val) => {
    this.props.login(val['username'], val['password']);
  }

  handleSignup = () => {
    this.props.closeLoginModal();
    this.props.closeLoginParentModal();
    this.props.openSignupParentModal();
  }

  handleForgotPassword = () => {
    this.props.openForgotPasswordModal();
  }

  render () {
    const {handleSubmit, token, loading, pristine, reset, submitting, invalid, open} = this.props;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-form">
        <form>
          <Field
            name="username"
            component="input"
            type="text"
            placeholder="Saisir nom d'utilisateur"
            component={renderField}
          />
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Saisir mot de passe"
            component={renderField}
          />
        </form>
        <div className="form-btn">
          <a href="" onClick={handleSubmit(this.submitForm)} className={`nir-btn ${invalid?'disabled':''}`}>CONNEXION</a>
        </div>
        <div className="form-group mb-0 form-checkbox mt-3">
          <input type="checkbox" /> Se souvenir de moi | <a href="#" className>Mot de passe oublié ?</a>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    open: state.loginModal.open,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(authLogin(username, password)),
    openLoginModal: () => dispatch(openLoginModal()),
    closeLoginModal: () => dispatch(closeLoginModal()),
    closeLoginParentModal: () => dispatch(closeLoginParentModal()),
    openSignupParentModal: () => dispatch(openSignupParentModal()),
    openForgotPasswordModal: () => dispatch(openForgotPasswordModal()),
  };
};

let LoginFormConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

LoginFormConnected = reduxForm ({
  form: 'login',
  validate
}) (LoginFormConnected);

export default LoginFormConnected;

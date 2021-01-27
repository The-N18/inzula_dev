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
      <Modal
      closeIcon
        centered={false}
        open={open}
        onClose={() => this.props.closeLoginModal()}
        onOpen={() => this.props.openLoginModal()}
        size='large'
      >
        <Modal.Header>
          <FormattedMessage
            id="login.title"
            defaultMessage="Login with account"
          />
        </Modal.Header>
        <Modal.Content scrolling>
      <Segment style={{ padding: "1em 0em" }} vertical>
      <Grid
        textAlign="center"
        style={{ height: "50vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h4" className={"headercolor"} textAlign="center">
            <FormattedMessage
              id="login.title"
              defaultMessage="Log-in to your account"
            />
          </Header>
          <React.Fragment>
      <form onSubmit={handleSubmit(this.submitForm)}>
      <Segment raised className={"logincard"}>
        <div>
          <label for="username">
            <FormattedMessage
              id="login.username"
              defaultMessage="Username"
            />
          </label>
          <Field
            name="username"
            component="input"
            type="text"
            component={renderField}
          />
        </div>
        <div>
          <label for="username">
            <FormattedMessage
              id="login.password"
              defaultMessage="Password"
            />
          </label>
          <Field
            name="password"
            component="input"
            type="password"
            component={renderField}
          />
        </div>
        <Button
          type="submit"
          size="large"
          className={"buttoncolor"}
          disabled={invalid}
          loading={loading}
        >
        <FormattedMessage
          id="login.login_btn"
          defaultMessage="Login"
        />
        </Button>
        </Segment>
      </form>
      <Segment raised className={"logincard"}>
        <FormattedMessage
          id="login.new"
          defaultMessage="New to Inzula?"
        /><span className={"mimic-anchor"} onClick={this.handleSignup.bind(this)}>
        <FormattedMessage
          id="login.signup_btn"
          defaultMessage="Sign up"
        /></span>
      </Segment>
      <Segment raised className={"logincard"}>
        <span className={"mimic-anchor"} onClick={this.handleForgotPassword.bind(this)}>
        <FormattedMessage
          id="login.forgot_password"
          defaultMessage="Forgot password?"
        /></span>
      </Segment>
    </React.Fragment>
  </Grid.Column>
</Grid>
</Segment>
</Modal.Content>
<Modal.Actions>
  <Button negative onClick={() => this.props.closeLoginModal()} primary>
    <FormattedMessage
      id="login.cancel"
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

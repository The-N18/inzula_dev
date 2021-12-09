import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
// import styles from './login.css';
import {
  Segment,
  Button,
  Grid,
  Header,
  Modal,
  Icon
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { validate } from "./validation";
import { forgotPassword } from "../../store/actions/auth";
import { closeForgotPasswordModal, openForgotPasswordModal} from "../../store/actions/forgotPasswordModal";
import { closeLoginModal } from "../../store/actions/loginModal";
import { closeLoginParentModal } from "../../store/actions/loginParentModal";
import { openSignupParentModal } from "../../store/actions/signupParentModal";
import {renderField} from "../../containers/ReduxForm/renderField";
import {FormattedMessage} from 'react-intl';
import CSRFToken from "../../containers/CSRFToken";
import DjangoCSRFToken from 'django-react-csrftoken';


class ForgotPasswordForm extends Component {

  submitForm = (val) => {
    this.props.forgotPassword(val['email']);
  }

  handleSignup = () => {
    this.props.closeForgotPasswordModal();
    this.props.closeLoginModal();
    this.props.closeLoginParentModal();
    this.props.openSignupParentModal();
  }

  render () {
    const {handleSubmit, token, loading, invalid, open} = this.props;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <Modal
      closeIcon
        centered={false}
        open={open}
        onClose={() => this.props.closeForgotPasswordModal()}
        onOpen={() => this.props.openForgotPasswordModal()}
        size='large'
      >
        <Modal.Header>
          <FormattedMessage
            id="forgot_password.title"
            defaultMessage="Forgot your password?"
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
              id="forgot_password.title"
              defaultMessage="Reset your password."
            />
          </Header>
          <React.Fragment>
      <form onSubmit={handleSubmit(this.submitForm)}>
      <CSRFToken/>
      <DjangoCSRFToken/>
      <Segment raised className={"logincard"}>
        <div>
          <label for="email">
            <FormattedMessage
              id="forgot_password.username"
              defaultMessage="Email Address"
            />
          </label>
          <Field
            name="email"
            component="input"
            type="email"
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
          id="forgot_password.reset_btn"
          defaultMessage="Reset password"
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
    </React.Fragment>
  </Grid.Column>
</Grid>
</Segment>
</Modal.Content>
<Modal.Actions>
  <Button negative onClick={() => this.props.closeForgotPasswordModal()} primary>
    <FormattedMessage
      id="forgot_password.cancel"
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
    open: state.forgotPasswordModal.open,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    forgotPassword: (email) => dispatch(forgotPassword(email)),
    openForgotPasswordModal: () => dispatch(openForgotPasswordModal()),
    closeForgotPasswordModal: () => dispatch(closeForgotPasswordModal()),
    closeLoginModal: () => dispatch(closeLoginModal()),
    closeLoginParentModal: () => dispatch(closeLoginParentModal()),
    openSignupParentModal: () => dispatch(openSignupParentModal()),
  };
};

let ForgotPasswordFormConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordForm);

ForgotPasswordFormConnected = reduxForm ({
  form: 'forgot_password',
  validate
}) (ForgotPasswordFormConnected);

export default ForgotPasswordFormConnected;

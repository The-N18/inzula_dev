import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import styles from './login.css';
import {
  Segment,
  Form,
  Button,
  Grid,
  Header,
  Modal,
  Icon
} from "semantic-ui-react";
import { NavLink, Redirect } from "react-router-dom";
import { authLogin } from "../../store/actions/auth";
import { connect } from "react-redux";
import { validate } from "./validation";
import { openLoginModal, closeLoginModal } from "../../store/actions/loginModal";
import { closeLoginParentModal } from "../../store/actions/loginParentModal";
import { openSignupParentModal } from "../../store/actions/signupParentModal";



class LoginForm extends Component {

  submitForm = (val) => {
    console.log("submit");
    console.log(val);
    this.props.login(val['username'], val['password']);
  }

  renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      {/*<label>{label}</label>*/}
      <div>
        <input {...input} placeholder={label} type={type} className={"custom-field"}/>
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );

  handleSignup = () => {
    this.props.closeLoginModal();
    this.props.closeLoginParentModal();
    this.props.openSignupParentModal();
  }

  render () {
    const {handleSubmit, token, loading, pristine, reset, submitting, invalid, open} = this.props;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <Modal
        centered={false}
        open={open}
        onClose={() => this.props.closeLoginModal()}
        onOpen={() => this.props.openLoginModal()}
        size='large'
      >
        <Modal.Header>
        Login with account
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
            Log-in to your account
          </Header>
          <React.Fragment>
      <form onSubmit={handleSubmit(this.submitForm)}>
      <Segment raised className={"logincard"}>
        <Field
          name="username"
          component="input"
          type="text"
          placeholder="Username"
          label="Username"
          className={"custom-field"}
          component={this.renderField.bind(this)}
        />
        <Field
          name="password"
          component="input"
          type="password"
          placeholder="Password"
          label="Password"
          className={"custom-field"}
          component={this.renderField.bind(this)}
        />
        <Button
          type="submit"
          size="large"
          className={"buttoncolor"}
          disabled={invalid}
          loading={loading}
        >
          Login
        </Button>
        </Segment>
      </form>
      <Segment raised className={"logincard"}>
        New to Inzula? <span className={"mimic-anchor"} onClick={this.handleSignup.bind(this)}>Sign up</span>
      </Segment>
    </React.Fragment>
  </Grid.Column>
</Grid>
</Segment>
</Modal.Content>
<Modal.Actions>
  <Button negative onClick={() => this.props.closeLoginModal()} primary>
    Cancel <Icon name='cancel right' />
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

import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import styles from './signup.css';
import {
  Segment,
  Form,
  Button,
  Grid,
  Header,
  Icon,
  Modal
} from "semantic-ui-react";
import { NavLink, Redirect } from "react-router-dom";
import { authSignup, authSetDiscountText } from "../../store/actions/auth";
import { openSignupModal, closeSignupModal } from "../../store/actions/signupModal";
import { openLoginParentModal } from "../../store/actions/loginParentModal";
import { closeSignupParentModal } from "../../store/actions/signupParentModal";
import { connect } from "react-redux";
import { validate } from "./validation";
import Recaptcha from 'react-recaptcha';
import {renderField} from "../../containers/ReduxForm/renderField";


class RegistrationForm extends Component {

  submitForm = (val) => {
    this.props.signup(val['first_name'], val['last_name'], val['username'], val['email'], val['password1'], val['password2'], val['terms_conditions']);
  }

  handleSignin = () => {
    this.props.closeSignupModal();
    this.props.closeSignupParentModal();
    this.props.openLoginParentModal();
  }

  render () {
    const {handleSubmit, token, loading, pristine, reset, submitting, invalid, discountText, open} = this.props;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <Modal
        centered={false}
        open={open}
        onClose={() => this.props.closeSignupModal()}
        onOpen={() => this.props.openSignupModal()}
        size='large'
      >
        <Modal.Header>
        Signup
        </Modal.Header>
        <Modal.Content scrolling>
      <Segment vertical>
      <Grid
        textAlign="center"
        style={{ height: "60vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {discountText !== null ? <Header as="h4" textAlign="center" color="teal" className={"discountheader"}>
            {discountText}
          </Header> : ''}
          <React.Fragment>
      <form onSubmit={handleSubmit(this.submitForm)}>
      <Segment raised className={"signupcard"}>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} tablet={16} computer={8}>
          <Field
            name="first_name"
            component="input"
            type="text"
            placeholder="First name"
            label="First name"
            className={"custom-field"}
            component={renderField}
          />
          </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={8}>
          <Field
            name="last_name"
            component="input"
            type="text"
            placeholder="Last name"
            label="Last name"
            className={"custom-field"}
            component={renderField}
          />
        </Grid.Column>
        </Grid.Row>
      </Grid>
      <Field
        name="username"
        component="input"
        type="text"
        placeholder="Username"
        label="Username"
        className={"custom-field"}
        component={renderField}
      />
        <Field
          name="email"
          component="input"
          type="email"
          placeholder="Email address"
          label="Email address"
          className={"custom-field"}
          component={renderField}
        />
        <Field
          name="password1"
          component="input"
          type="password"
          placeholder="Password"
          label="Password"
          className={"custom-field"}
          component={renderField}
        />
        <Field
          name="password2"
          component="input"
          type="password"
          placeholder="Confirm Password"
          label="Confirm Password"
          className={"custom-field"}
          component={renderField}
        />
        <div className={"push-left"}>
            <Field name="terms_conditions" id="terms_conditions" component="input" type="checkbox"/>
            <label htmlFor="terms_conditions">I agree to the Terms and Conditions</label>
        </div>
        <Button
          type="submit"
          size="large"
          className={"buttoncolor"}
          loading={loading}
          disabled={invalid}
        >
          Signup
        </Button>
        </Segment>
      </form>
      <Segment raised className={"signupcard"}>
        Already have an account? <span className={"mimic-anchor"} onClick={this.handleSignin.bind(this)}>Login</span>
      </Segment>
    </React.Fragment>
  </Grid.Column>
</Grid>
</Segment>
</Modal.Content>
<Modal.Actions>
  <Button negative onClick={() => this.props.closeSignupModal()} primary>
    Cancel <Icon name='cancel' />
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
    discountText: state.auth.discountText,
    open: state.signupModal.open,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (first_name, last_name, username, email, password1, password2, terms_conditions) =>
      dispatch(authSignup(first_name, last_name, username, email, password1, password2, terms_conditions)),
    setDiscountText: (discountText) => dispatch(authSetDiscountText(discountText)),
    openSignupModal: () => dispatch(openSignupModal()),
    closeSignupModal: () => dispatch(closeSignupModal()),
    closeSignupParentModal: () => dispatch(closeSignupParentModal()),
    openLoginParentModal: () => dispatch(openLoginParentModal()),
  };
};

let RegistrationFormConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);

RegistrationFormConnected = reduxForm ({
  form: 'signup',
  validate
}) (RegistrationFormConnected);

export default RegistrationFormConnected;

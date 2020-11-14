import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import styles from './signup.css';
import {
  Segment,
  Form,
  Button,
  Grid,
  Header
} from "semantic-ui-react";
import { NavLink, Redirect } from "react-router-dom";
import { authSignup, authSetDiscountText } from "../../store/actions/auth";
import { connect } from "react-redux";
import { validate } from "./validation";
import Recaptcha from 'react-recaptcha';


class RegistrationForm extends Component {

  submitForm = (val) => {
    this.props.signup(val['first_name'], val['last_name'], val['username'], val['email'], val['password1'], val['password2'], val['terms_conditions']);
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

  render () {
    const {handleSubmit, token, loading, pristine, reset, submitting, invalid, discountText} = this.props;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <Segment style={{ padding: "2em 0em" }} vertical>
      <Grid
        textAlign="center"
        style={{ height: "80vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {discountText !== null ? <Header as="h4" textAlign="center" color="teal" className={"discountheader"}>
            {discountText}
          </Header> : <Header as="h2" className={"headercolor"} textAlign="center">
            Signup to Inzula
          </Header>}
          <React.Fragment>
      <form onSubmit={handleSubmit(this.submitForm)}>
      <Segment raised className={"signupcard"}>
      <Field
        name="first_name"
        component="input"
        type="text"
        placeholder="First name"
        label="First name"
        className={"custom-field"}
        component={this.renderField.bind(this)}
      />
      <Field
        name="last_name"
        component="input"
        type="text"
        placeholder="Last name"
        label="Last name"
        className={"custom-field"}
        component={this.renderField.bind(this)}
      />
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
          name="email"
          component="input"
          type="email"
          placeholder="Email address"
          label="Email address"
          className={"custom-field"}
          component={this.renderField.bind(this)}
        />
        <Field
          name="password1"
          component="input"
          type="password"
          placeholder="Password"
          label="Password"
          className={"custom-field"}
          component={this.renderField.bind(this)}
        />
        <Field
          name="password2"
          component="input"
          type="password"
          placeholder="Confirm Password"
          label="Confirm Password"
          className={"custom-field"}
          component={this.renderField.bind(this)}
        />
        <div>
          <label htmlFor="terms_conditions">I agree to the Terms and Conditions</label>
          <div>
            <Field name="terms_conditions" id="terms_conditions" component="input" type="checkbox"/>
          </div>
        </div>
        <Button
          type="submit"
          size="large"
          className={"buttoncolor"}
          loading={loading}
          disabled={invalid}
        >
          Login
        </Button>
        </Segment>
      </form>
      <Segment raised className={"signupcard"}>
        Already have an account? <NavLink to="/login">Login</NavLink>
      </Segment>
    </React.Fragment>
  </Grid.Column>
</Grid>
</Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    discountText: state.auth.discountText,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (first_name, last_name, username, email, password1, password2, terms_conditions) =>
      dispatch(authSignup(first_name, last_name, username, email, password1, password2, terms_conditions)),
    setDiscountText: (discountText) => dispatch(authSetDiscountText(discountText)),
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

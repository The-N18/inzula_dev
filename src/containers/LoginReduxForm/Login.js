import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import styles from './login.css';
import {
  Segment,
  Form,
  Button,
  Grid,
  Header
} from "semantic-ui-react";
import { NavLink, Redirect } from "react-router-dom";
import { authLogin } from "../../store/actions/auth";
import { connect } from "react-redux";
import { validate } from "./validation";
import {renderField} from "../../containers/ReduxForm/renderField";


class LoginForm extends Component {

  submitForm = (val) => {
    console.log("submit");
    console.log(val);
    this.props.login(val['username'], val['password']);
  }

  render () {
    const {handleSubmit, token, loading, pristine, reset, submitting, invalid} = this.props;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <Segment style={{ padding: "1em 0em" }} vertical>
      <Grid
        textAlign="center"
        style={{ height: "80vh" }}
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
          component={renderField}
        />
        <Field
          name="password"
          component="input"
          type="password"
          placeholder="Password"
          label="Password"
          component={renderField}
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
        New to Inzula? <NavLink to="/signup">Sign Up</NavLink>
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
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(authLogin(username, password))
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

import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Select,
  Icon,
  Card
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authSignup } from "../../store/actions/auth";
import styles from './signup.css';

const user_options = [
  { key: 'C', text: 'Carrier', value: 'Carrier' },
  { key: 'S', text: 'Sender', value: 'Sender' },
]

class RegistrationForm extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password1: "",
    password2: "",
    user_type: "",
    terms_conditions: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { first_name, last_name, username, email, password1, password2, user_type, terms_conditions } = this.state;
    this.props.signup(first_name, last_name, username, email, password1, password2, user_type, terms_conditions);
  };

  handleChange = e => {
    console.log(e.target);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeSelect = (e, data) => {
    console.log(e.target);
    console.log(data.value);
    this.setState({ [data.name]: data.value });
  };

  handleToggleCheckbox = () => {
  const terms_conditions = !(this.state.terms_conditions);
  this.setState({terms_conditions});
}

  render() {
    const { first_name, last_name, username, email, password1, password2, user_type, terms_conditions } = this.state;
    const { error, loading, token } = this.props;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <Segment style={{ padding: "2em 0em" }} vertical>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" className={"headercolor"} textAlign="center">
            Signup to Inzula
          </Header>
          {error && <p>{this.props.error.message}</p>}

          <React.Fragment>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment raised className={"signupcard"}>
              <Form.Input
                onChange={this.handleChange}
                value={first_name}
                name="first_name"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="First name"
                required
              />
              <Form.Input
                onChange={this.handleChange}
                value={last_name}
                name="last_name"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Last name"
                required
              />
              <Form.Input
                onChange={this.handleChange}
                value={username}
                name="username"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                required
              />
                <Form.Input
                  onChange={this.handleChange}
                  value={email}
                  name="email"
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail address"
                  required
                />
                <Form.Input
                  onChange={this.handleChange}
                  fluid
                  value={password1}
                  name="password1"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  required
                />
                <Form.Input
                  onChange={this.handleChange}
                  fluid
                  value={password2}
                  name="password2"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm password"
                  type="password"
                  required
                />
                {/*<Form.Field
                  control={Select}
                  name="user_type"
                  label='User type'
                  options={user_options}
                  placeholder='User type'
                  onChange={this.handleChangeSelect}
                />*/}

                <Form.Checkbox
                  name="terms_conditions"
                  label='I agree to the Terms and Conditions'
                  required
                  onChange={this.handleToggleCheckbox}/>

                <Button
                  className={"buttoncolor"}
                  size="large"
                  loading={loading}
                  disabled={loading}
                >
                  Signup
                </Button>
              </Segment>
            </Form>
            <Segment raised className={"signupcard"}>
              <Header as="h5">Login with</Header>
              <Icon size="big" circular name='facebook' className={"facebookicon"} />
              <Icon size="big" circular name='twitter' className={"facebookicon"} />
              <Icon size="big" circular name='mail' className={"gmail"} />
            </Segment>
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
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (first_name, last_name, username, email, password1, password2, user_type, terms_conditions) =>
      dispatch(authSignup(first_name, last_name, username, email, password1, password2, user_type, terms_conditions))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);

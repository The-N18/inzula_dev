import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Icon,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authSignup } from "../../store/actions/auth";
// import styles from './contactusform.css';
import Recaptcha from 'react-recaptcha';

const user_options = [
  { key: 'C', text: 'Carrier', value: 'Carrier' },
  { key: 'S', text: 'Sender', value: 'Sender' },
]

class ContactUsForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);

  }

  recaptchaLoaded() {
    console.log('capcha successfully loaded');
  }

  handleSubscribe() {
    if (this.state.isVerified) {
      alert('You have successfully subscribed!');
    } else {
      alert('Please verify that you are a human!');
    }
  }

  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true
      })
    }
  }

  state = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password1: "",
    password2: "",
    terms_conditions: false,
    isVerified: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { first_name, last_name, username, email, password1, password2, terms_conditions } = this.state;
    this.props.signup(first_name, last_name, username, email, password1, password2, terms_conditions);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeSelect = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  handleToggleCheckbox = () => {
  const terms_conditions = !(this.state.terms_conditions);
  this.setState({terms_conditions});
}

  render() {
    const { first_name, last_name, username, email, password1, password2 } = this.state;
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
              <Form.Group widths='equal'>
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
              </Form.Group>
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
                <Form.Checkbox
                  name="terms_conditions"
                  label='I agree to the Terms and Conditions'
                  required
                  onChange={this.handleToggleCheckbox}/>
                <Recaptcha
                  sitekey="6LfycNoZAAAAADPAHBVK7JjxT8V6AvayfwhVaHQa"
                  render="explicit"
                  onloadCallback={this.recaptchaLoaded}
                  verifyCallback={this.verifyCallback}
                />
                <Button
                  className={"buttoncolor"}
                  size="large"
                  loading={loading}
                  disabled={!this.state.isVerified}
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
    signup: (first_name, last_name, username, email, password1, password2, terms_conditions) =>
      dispatch(authSignup(first_name, last_name, username, email, password1, password2, terms_conditions))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUsForm);

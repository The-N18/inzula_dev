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
import { authLogin } from "../../store/actions/auth";
import styles from './login.css';
import Recaptcha from 'react-recaptcha';

class LoginForm extends React.Component {
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
    username: "",
    password: "",
    isVerified: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
  };

  render() {
    const { error, loading, token } = this.props;
    const { username, password } = this.state;
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
          <Header as="h2" className={"headercolor"} textAlign="center">
            Log-in to your account
          </Header>
          {error && <p>{this.props.error.message}</p>}

          <React.Fragment>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment raised className={"logincard"}>
                <Form.Input
                  onChange={this.handleChange}
                  value={username}
                  name="username"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                />
                <Form.Input
                  onChange={this.handleChange}
                  fluid
                  value={password}
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                {/*<Recaptcha
                  sitekey="6LfycNoZAAAAADPAHBVK7JjxT8V6AvayfwhVaHQa"
                  render="explicit"
                  onloadCallback={this.recaptchaLoaded}
                  verifyCallback={this.verifyCallback}
                /> */}
                <Button
                  size="large"
                  loading={loading}
                  disabled={this.state.isVerified}
                  className={"buttoncolor"}
                >
                  Login
                </Button>
              </Segment>
            </Form>
            {/*<Segment raised className={"logincard"}>
              <Header as="h5">Login with</Header>
              <Icon size="big" circular name='facebook' className={"facebookicon"} />
              <Icon size="big" circular name='twitter' className={"facebookicon"} />
              <Icon size="big" circular name='mail' className={"gmail"} />
            </Segment> */}
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
    error: state.auth.error,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

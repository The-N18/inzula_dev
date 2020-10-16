import React from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import { backend_url } from "../../configurations";
import styles from './layout.css';

class CustomLayout extends React.Component {

  handleOnClick = (item) => this.props.history.push(item);

  render() {
    const { authenticated } = this.props;
    const options = [
      { key: 'user', text: 'Account', icon: 'user' },
      { key: 'settings', text: 'Settings', icon: 'settings' },
      { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
    ];
    return (
      <div>
        <Menu fixed="top" className={"menuclass"} secondary>
          <Menu.Item
            onClick={this.handleOnClick.bind(this, '/')}>
            <Image size='small' src= {backend_url() + '/static/images/logo.png'} />
          </Menu.Item>
          <Menu.Menu position='right'>
              <Menu.Item
              onClick={this.handleOnClick.bind(this, '/dispatch')}
              header>
              Dispatch
              </Menu.Item>
              <Menu.Item
              header
              onClick={this.handleOnClick.bind(this, '/transport')}>
              Transport
              </Menu.Item>
            {authenticated ? (
              <Menu.Item>
                <Dropdown item text='My profile'>
                  <Dropdown.Menu>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>Reservation</Dropdown.Item>
                    <Dropdown.Item>Messaging</Dropdown.Item>
                    <Dropdown.Item>Alerts</Dropdown.Item>
                    <Dropdown.Item>Finances</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.props.logout()}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            ) : (
              <React.Fragment>
                  <Menu.Item
                  header
                  onClick={this.handleOnClick.bind(this, '/login')}>
                  Login
                  </Menu.Item>
                  <Menu.Item
                  onClick={this.handleOnClick.bind(this, '/signup')}
                  header>
                  Signup
                  </Menu.Item>
              </React.Fragment>
            )}
          </Menu.Menu>
        </Menu>

        {this.props.children}

        <Segment
          inverted
          vertical
          style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
        >
          <Container textAlign="center">
            <Grid divided inverted stackable>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Group 1" />
                <List link inverted>
                  <List.Item as="a">Link One</List.Item>
                  <List.Item as="a">Link Two</List.Item>
                  <List.Item as="a">Link Three</List.Item>
                  <List.Item as="a">Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Group 2" />
                <List link inverted>
                  <List.Item as="a">Link One</List.Item>
                  <List.Item as="a">Link Two</List.Item>
                  <List.Item as="a">Link Three</List.Item>
                  <List.Item as="a">Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Group 3" />
                <List link inverted>
                  <List.Item as="a">Link One</List.Item>
                  <List.Item as="a">Link Two</List.Item>
                  <List.Item as="a">Link Three</List.Item>
                  <List.Item as="a">Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header inverted as="h4" content="Footer Header" />
                <p>
                  Extra space for a call to action inside the footer that could
                  help re-engage users.
                </p>
              </Grid.Column>
            </Grid>

            <Divider inverted section />
            <Image centered size="mini" src="/logo.png" />
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="#">
                Site Map
              </List.Item>
              <List.Item as="a" href="#">
                Contact Us
              </List.Item>
              <List.Item as="a" href="#">
                Terms and Conditions
              </List.Item>
              <List.Item as="a" href="#">
                Privacy Policy
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);

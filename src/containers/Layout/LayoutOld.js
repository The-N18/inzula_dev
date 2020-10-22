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
  Segment,
  Icon
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import { backend_url } from "../../configurations";
import styles from './layout.css';
import $ from "jquery";
// import Footer from "./containers/Footer/Footer";


class CustomLayout extends React.Component {

  handleOnClick = (item) => this.props.history.push(item);

  handleScroll = () => {
    console.log("on scroll");
    $(window).scroll(function() {
        if ($(window).scrollTop() > 10) {
            $('.menuclass').addClass('floatingNav');
        } else {
            $('.menuclass').removeClass('floatingNav');
        }
    });
  }

  handleScreenSize = () => {
    console.log($(window).width());
    console.log(window.innerWidth);
    if($(window).width() <= 360) {
      console.log("Is mobile");
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScreenSize);
  }

  render() {
    const { authenticated } = this.props;
    const options = [
      { key: 'user', text: 'Account', icon: 'user' },
      { key: 'settings', text: 'Settings', icon: 'settings' },
      { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
    ];
    return (
      <Container className="main">
      <header className="header">
        <a href="" className="logo" onClick={this.handleOnClick.bind(this, '/')}>
          <Image size='small' src= {backend_url() + '/static/images/logo.png'} />
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" for="menu-btn"><span className="navicon"></span></label>
        <ul className="menu">
          <li><a href="" onClick={this.handleOnClick.bind(this, '/dispatch')}>Our Work</a></li>
          <li><a href="" onClick={this.handleOnClick.bind(this, '/transport')}>About</a></li>
          <li><a href="#careers">Careers</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </header>
      <Container className={"layoutcontainer"}>

        {/* <Menu fixed="top" className={"menuclass"} secondary>
        // <Container className={"layoutcontainer"}>
        //   <Menu.Item
        //     className={"menulogoitemstyle"}
        //     onClick={this.handleOnClick.bind(this, '/')}>
        //     <Image size='small' src= {backend_url() + '/static/images/logo.png'} />
        //   </Menu.Item>
        //   <Menu.Menu position='right' className={"right-menu"}>
        //       <Menu.Item
        //         className={"menuitemstyle"}
        //         onClick={this.handleOnClick.bind(this, '/dispatch')}
        //         header>
        //         Dispatch
        //       </Menu.Item>
        //       <Menu.Item
        //         header
        //         className={"menuitemstyle"}
        //         onClick={this.handleOnClick.bind(this, '/transport')}>
        //         Transport
        //       </Menu.Item>
        //     {authenticated ? (
        //       <Menu.Item>
        //         <Dropdown item text='My profile'
        //         className={"menuitemstyle"}>
        //           <Dropdown.Menu>
        //             <Dropdown.Item className={"dropdownitemstyle"}>Profile</Dropdown.Item>
        //             <Dropdown.Item className={"dropdownitemstyle"}>Reservation</Dropdown.Item>
        //             <Dropdown.Item className={"dropdownitemstyle"}>Messaging</Dropdown.Item>
        //             <Dropdown.Item className={"dropdownitemstyle"}>Alerts</Dropdown.Item>
        //             <Dropdown.Item className={"dropdownitemstyle"}>Finances</Dropdown.Item>
        //             <Dropdown.Item  className={"dropdownitemstyle"}onClick={() => this.props.logout()}>Logout</Dropdown.Item>
        //           </Dropdown.Menu>
        //         </Dropdown>
        //       </Menu.Item>
        //     ) : (
        //       <React.Fragment>
        //           <Menu.Item
        //             header
        //             className={"menuitemstyle"}
        //             onClick={this.handleOnClick.bind(this, '/login')}>
        //             Login
        //           </Menu.Item>
        //           <Menu.Item
        //             className={"menuitemstyle"}
        //             onClick={this.handleOnClick.bind(this, '/signup')}
        //             header>
        //             Signup
        //           </Menu.Item>
        //       </React.Fragment>
        //     )}
        //   </Menu.Menu>
        //   </Container>
        // </Menu>
        //
        // {this.props.children}
        // <Divider section />
        // <Segment
        //   vertical
        //   style={{ margin: "1em 0em 0em", padding: "2em 0em" }}
        // >
        //   <Container textAlign="center" className={"footercontainer"}>
        //     <Grid>
        //       <Grid.Column mobile={16} tablet={8} computer={4}>
        //         <List link>
        //           <List.Item as="a" href="#" className={"linkstyle"}>Who we are</List.Item>
        //           <List.Item as="a" href="#" className={"linkstyle"}>How it works</List.Item>
        //           <List.Item as="a" href="#" className={"linkstyle"}>Blog</List.Item>
        //           <List.Item as="a" href="#" className={"linkstyle"}>Frequently asked questions</List.Item>
        //         </List>
        //       </Grid.Column>
        //       <Grid.Column mobile={16} tablet={8} computer={4}>
        //         <List link>
        //           <List.Item as="a" href="#" className={"linkstyle"}>Contact us</List.Item>
        //           <List.Item as="a" href="#" className={"linkstyle"}>Insurance</List.Item>
        //           <List.Item as="a" href="#" className={"linkstyle"}>Legal information</List.Item>
        //           <List.Item as="a" href="#" className={"linkstyle"}>Transparency</List.Item>
        //         </List>
        //       </Grid.Column>
        //     </Grid>
        //
        //     <Divider section />
        //     <Grid>
        //       <Grid.Column mobile={16} tablet={8} computer={6} floated="left">
        //         <List horizontal divided link size="small">
        //           <List.Item as="a" href="#">
        //             <Icon size="big" name='facebook' className={"footer-icons"} />
        //           </List.Item>
        //           <List.Item as="a" href="#">
        //             <Icon size="big" name='twitter' className={"footer-icons"} />
        //           </List.Item>
        //           <List.Item as="a" href="#">
        //             <Icon size="big" name='instagram' className={"footer-icons"} />
        //           </List.Item>
        //           <List.Item as="a" href="#">
        //             <Icon size="big" name='youtube' className={"footer-icons"}/>
        //           </List.Item>
        //           <List.Item as="a" href="#">
        //             <Icon size="big" name='whatsapp' className={"footer-icons"} />
        //           </List.Item>
        //         </List>
        //       </Grid.Column>
        //       <Grid.Column mobile={16} tablet={8} computer={6} floated="right">
        //         <List horizontal divided link size="small">
        //           <List.Item className={"reserved"}>
        //             All rights reserved
        //           </List.Item>
        //           <List.Item as="a" href="#">
        //             Terms and Conditions
        //           </List.Item>
        //           <List.Item as="a" href="#">
        //             Privacy Policy
        //           </List.Item>
        //         </List>
        //       </Grid.Column>
        //     </Grid>
        //   </Container>
        // </Segment>*/}
      </Container>
      </Container>
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

// export default CSSModules(CustomLayout, styles);

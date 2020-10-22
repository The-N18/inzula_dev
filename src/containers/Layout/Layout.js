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
import Footer from "../../containers/Footer/Footer";


class CustomLayout extends React.Component {

  handleOnClick = (item) => this.props.history.push(item);

  handleScroll = () => {
    console.log("on scroll");
    $(window).scroll(function() {
        if ($(window).scrollTop() > 10) {
            $('.menuheader').addClass('stickyshadow');
        } else {
            $('.menuheader').removeClass('stickyshadow');
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
        <header className="menuheader">
          <div>
            <a href="" className="logo" onClick={this.handleOnClick.bind(this, '/')}>
              <Image size='small' src= {backend_url() + '/static/images/logo.png'} />
            </a>
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <label className="menu-icon" for="menu-btn"><span className="navicon"></span></label>
            <ul className="menu">
              <li><a href="" onClick={this.handleOnClick.bind(this, '/dispatch')}>Dispatch</a></li>
              <li><a href="" onClick={this.handleOnClick.bind(this, '/transport')}>Transport</a></li>
              {authenticated ? (<li><a href="">My profile</a></li>) :
              (<span>
                <li><a href="" onClick={this.handleOnClick.bind(this, '/login')}>Login</a></li>
                <li><a href="" onClick={this.handleOnClick.bind(this, '/signup')}>Sign up</a></li>
              </span>
            )}
            </ul>
          </div>
        </header>
        <Container className={"layoutcontainer"}>
          {this.props.children}
        </Container>
        <Footer/>
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

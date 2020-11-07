import React from "react";
import {
  Container,
  Image,
  Dropdown
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import { clearUserInfo } from "../../store/actions/userInfo"
import { setLang } from "../../store/actions/appConfig";
import { backend_url } from "../../configurations";
import styles from './layout.css';
import $ from "jquery";
import Footer from "../../containers/Footer/Footer";
import LanguageSwitcherSelector from "../../containers/LanguageSwitcherSelector/LanguageSwitcherSelector";
import 'react-redux-notify/dist/ReactReduxNotify.css';
import { Notify } from 'react-redux-notify';
import {FormattedMessage} from 'react-intl'


class CustomLayout extends React.Component {

  state = {
    isMobile: false
  }

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
    if($(window).width() <= 768) {
      this.setState({ isMobile: true });
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

  logoutUtil = () => {
    this.props.logout();
    this.props.clearUserInfo();
    this.props.history.push('/');
    window.location.href = '/'
  }

  changeLanguageHandler = (lang) => {
    this.props.setLang(lang);
  }




  render() {
    const { authenticated, profile_pic } = this.props;

    let mobileMenu = this.state.isMobile ? (
      <span><li><a onClick={this.handleOnClick.bind(this, '/profile')}>
      <FormattedMessage
        id="layout.profile"
        defaultMessage="Profile"
      /></a></li>
      <li><a >
      <FormattedMessage
        id="layout.booking"
        defaultMessage="Reservation"
      />
      </a></li>
      <li><a >
      <FormattedMessage
        id="layout.messages"
        defaultMessage="Messaging"
      />
      </a></li>
      <li><a >
      <FormattedMessage
        id="layout.alerts"
        defaultMessage="Alerts"
      />
      </a></li>
      <li><a >
      <FormattedMessage
        id="layout.finances"
        defaultMessage="Finances"
      />
      </a></li>
      <li><a onClick={this.logoutUtil.bind(this)}>
      <FormattedMessage
        id="layout.logout"
        defaultMessage="Logout"
      />
      </a></li></span>) : (
        <li>
          <a href="">
            <Image bordered circular size='small' className={"profile-image"} src={profile_pic !== null ? backend_url() + profile_pic : backend_url() + '/static/images/user_avatar.png'} />
          </a>
          <ul>
              <li><a onClick={this.handleOnClick.bind(this, '/profile')}>
              <FormattedMessage
                id="layout.profile"
                defaultMessage="Profile"
              />
              </a></li>
              <li><a >
              <FormattedMessage
                id="layout.booking"
                defaultMessage="Reservation"
              />
              </a></li>
              <li><a >
              <FormattedMessage
                id="layout.messages"
                defaultMessage="Messaging"
              />
              </a></li>
              <li><a >
              <FormattedMessage
                id="layout.alerts"
                defaultMessage="Alerts"
              />
              </a></li>
              <li><a >
              <FormattedMessage
                id="layout.finances"
                defaultMessage="Finances"
              />
              </a></li>
              <li><a onClick={this.logoutUtil.bind(this)}>
              <FormattedMessage
                id="layout.logout"
                defaultMessage="Logout"
              /></a></li>
          </ul>
          </li>
      );

    return (
      <Container className="main">
      <Notify />
        <header className="menuheader">
          <div>
            <a href="" className="logo" onClick={this.handleOnClick.bind(this, '/')}>
              <Image size='small' src={backend_url() + '/static/images/logo.png'} />
            </a>
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
            <ul className="menu">
              <li><a  className="red" href="" onClick={this.handleOnClick.bind(this, '/signupdiscount')}>
              <FormattedMessage
                id="layout.discount"
                defaultMessage="15% discount"
              /></a></li>
              <li><a href="" onClick={this.handleOnClick.bind(this, '/dispatch')}>
              <FormattedMessage
                id="layout.dispatch"
                defaultMessage="Dispatch"
              />
              </a></li>
              <li><a href="" onClick={this.handleOnClick.bind(this, '/transport')}>
              <FormattedMessage
                id="layout.transport"
                defaultMessage="Transport"
              /></a></li>
              {authenticated ? (mobileMenu) :
              (<span>
                <li><a href="" onClick={this.handleOnClick.bind(this, '/login')}>
                <FormattedMessage
                  id="layout.login"
                  defaultMessage="Login"
                />
                </a></li>
                <li><a href="" onClick={this.handleOnClick.bind(this, '/signup')}>
                <FormattedMessage
                  id="layout.signup"
                  defaultMessage="Sign up"
                /></a></li>
              </span>
            )}
            <li><LanguageSwitcherSelector
              lang={this.props.lang}
              handleChangeLanguage={this.changeLanguageHandler}
            /></li>
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
    authenticated: state.auth.token !== null,
    profile_pic: state.userInfo.profile_pic,
    lang: state.appConfig.lang
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    clearUserInfo: () => dispatch(clearUserInfo())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);

// export default CSSModules(CustomLayout, styles);

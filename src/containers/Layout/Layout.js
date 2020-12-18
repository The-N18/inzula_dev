import React from "react";
import {
  Container,
  Image,
  Dropdown
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import { clearUserInfo } from "../../store/actions/userInfo";
import { setLang } from "../../store/actions/appConfig";
import { backend_url, get_img_url } from "../../configurations";
import styles from './layout.css';
import $ from "jquery";
import Footer from "../../containers/Footer/Footer";
import SignupParentModal from "../../containers/SignupParentModal/SignupParentModal";
import PaymentOptions from "../../containers/PaymentOptions/PaymentOptions";
import SelectCreditCard from "../../containers/SelectCreditCard/SelectCreditCard";
import SignupModal from "../../containers/SignupReduxFormModal/SignupModal";

import LoginParentModal from "../../containers/LoginParentModal/LoginParentModal";
import LoginModal from "../../containers/LoginReduxFormModal/LoginModal";
import DeleteBookingConfirm from "../../containers/DeleteBookingConfirm/DeleteBookingConfirm";
import DeleteTripConfirm from "../../containers/DeleteTripConfirm/DeleteTripConfirm";
import UpdateTripForm from "../../containers/UpdateTripFormModal/UpdateTripForm";
import UpdateBooking from "../../containers/UpdateBookingModal/UpdateBooking";
import ProposePriceOnBooking from "../../containers/ProposePriceOnBooking/ProposePriceOnBooking";
import PaymentFormModal from "../../containers/PaymentFormModal/PaymentFormModal";
import ConfirmBookingPrice from "../../containers/ConfirmBookingPrice/ConfirmBookingPrice";
import DeclineBooking from "../../containers/DeclineBooking/DeclineBooking";
import ValidateBooking from "../../containers/ValidateBooking/ValidateBooking";
import DeleteAccount from "../../containers/DeleteAccount/DeleteAccount";

import LanguageSwitcherSelector from "../../containers/LanguageSwitcherSelector/LanguageSwitcherSelector";
import 'react-redux-notify/dist/ReactReduxNotify.css';
import { Notify } from 'react-redux-notify';
import {FormattedMessage} from 'react-intl'
import { setActiveIndex } from "../../store/actions/myProfile";
import { openSignupParentModal } from "../../store/actions/signupParentModal";
import { openLoginParentModal } from "../../store/actions/loginParentModal";

class CustomLayout extends React.Component {

  state = {
    isMobile: false
  }

  handleOnClick = (item) => this.props.history.push(item);

  handleOnProfileClick = () => {
    this.props.history.push("/profile");
    this.props.setActiveIndex(0);
  }

  handleOnReservationClick = () => {
    this.props.history.push("/profile");
    this.props.setActiveIndex(1);
  }

  handleOnAlertClick = () => {
    this.props.history.push("/profile");
    this.props.setActiveIndex(2);
  }

  handleOnFinanceClick = () => {
    this.props.history.push("/profile");
    this.props.setActiveIndex(3);
  }

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

  handleOnModalOpen = (item) => {
    switch (item) {
      case "signup":
        this.props.openSignupModal();
        break;
      case "login":
        this.props.openLoginModal();
        break;
      default:

    }
  }




  render() {
    const { authenticated, profile_pic, profileType } = this.props;

    let mobileMenu = this.state.isMobile ? (
      <span><li><a onClick={this.handleOnProfileClick.bind(this)}>
      <FormattedMessage
        id="layout.profile"
        defaultMessage="Profile"
      /></a></li>
      <li><a onClick={this.handleOnReservationClick.bind(this)}>
      {profileType === "sender" ? <FormattedMessage
        id="layout.booking"
        defaultMessage="Reservation"
      /> : <FormattedMessage
        id="layout.trips"
        defaultMessage="Trips"
      />}
      </a></li>
      <li><a onClick={this.handleOnAlertClick.bind(this)}>
      <FormattedMessage
        id="layout.alerts"
        defaultMessage="Alerts"
      />
      </a></li>
      <li><a onClick={this.handleOnFinanceClick.bind(this)}>
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
        <a className={"pad-13"}>
          <Image bordered circular size='small' className={"profile-image"} onClick={this.handleOnProfileClick.bind(this)} src={profile_pic !== null && profile_pic !== "null" ? get_img_url(profile_pic) : backend_url() + '/static/images/user_avatar.png'} />
        </a>
        <ul>
            <li><a onClick={this.handleOnProfileClick.bind(this)}>
            <FormattedMessage
              id="layout.profile"
              defaultMessage="Profile"
            />
            </a></li>
            <li><a onClick={this.handleOnReservationClick.bind(this)}>
            {profileType === "sender" ? <FormattedMessage
              id="layout.booking"
              defaultMessage="Reservation"
            /> : <FormattedMessage
              id="layout.trips"
              defaultMessage="Trips"
            />}
            </a></li>
            <li><a onClick={this.handleOnAlertClick.bind(this)}>
            <FormattedMessage
              id="layout.alerts"
              defaultMessage="Alerts"
            />
            </a></li>
            <li><a onClick={this.handleOnFinanceClick.bind(this)}>
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
      <SignupParentModal />
      <SignupModal />
      <LoginParentModal />
      <LoginModal />
      <DeleteBookingConfirm />
      <DeleteTripConfirm />
      <UpdateTripForm />
      <UpdateBooking />
      <ProposePriceOnBooking />
      <ConfirmBookingPrice />
      <PaymentOptions />
      <SelectCreditCard />
      <PaymentFormModal />
      <DeclineBooking />
      <ValidateBooking />
      <DeleteAccount />
      <Notify />
        <header className="menuheader">
          <div>
            <a className="logo" onClick={this.handleOnClick.bind(this, '/')}>
              <Image size='small' src={backend_url() + '/static/images/logo.png'} />
            </a>
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
            <ul className="menu">
              <li><a  className="red" onClick={this.handleOnClick.bind(this, '/signupdiscount')}>
              <FormattedMessage
                id="layout.discount"
                defaultMessage="15% discount"
              /></a></li>
              <li><a onClick={this.handleOnClick.bind(this, '/dispatch')}>
              <FormattedMessage
                id="layout.dispatch"
                defaultMessage="Dispatch"
              />
              </a></li>
              <li><a onClick={this.handleOnClick.bind(this, '/transport')}>
              <FormattedMessage
                id="layout.transport"
                defaultMessage="Transport"
              /></a></li>
              {authenticated ? (mobileMenu) :
              (<span>
                <li><a onClick={this.handleOnModalOpen.bind(this, 'login')}>
                <FormattedMessage
                  id="layout.login"
                  defaultMessage="Login"
                />
                </a></li>
                <li><a onClick={this.handleOnModalOpen.bind(this, 'signup')}>
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
    lang: state.appConfig.lang,
    profileType: state.userInfo.profileType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    clearUserInfo: () => dispatch(clearUserInfo()),
    setActiveIndex: (activeIndex) => dispatch(setActiveIndex(activeIndex)),
    openSignupModal: () => dispatch(openSignupParentModal()),
    openLoginModal: () => dispatch(openLoginParentModal()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);

// export default CSSModules(CustomLayout, styles);

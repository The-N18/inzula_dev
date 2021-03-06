import React from "react";

import {
  Container,
  Image,
} from "semantic-ui-react";


import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import { clearUserInfo } from "../../store/actions/userInfo";
import { backend_url, get_img_url } from "../../configurations";
import styles from './layout.css';
import Footer from "../../containers/Footer/Footer";
import SignupParentModal from "../../containers/SignupParentModal/SignupParentModal";
import PaymentOptions from "../../containers/PaymentOptions/PaymentOptions";
import SelectCreditCard from "../../containers/SelectCreditCard/SelectCreditCard";
import LoginParentModal from "../../containers/LoginParentModal/LoginParentModal";
import ForgotPasswordModal from "../../containers/ForgotPasswordForm/ForgotPasswordForm";
import DeleteBookingConfirm from "../../containers/DeleteBookingConfirm/DeleteBookingConfirm";
import DeleteTripConfirm from "../../containers/DeleteTripConfirm/DeleteTripConfirm";
import UpdateTripForm from "../../containers/UpdateTripFormModal/UpdateTripForm";
import UpdateBooking from "../../containers/UpdateBookingModal/UpdateBooking";
import ProposePriceOnBooking from "../../containers/ProposePriceOnBooking/ProposePriceOnBooking";
import PaymentFormModal from "../../containers/PaymentFormModal/PaymentFormModal";
import BankAccountFormModal from "../../containers/BankAccountFormModal/BankAccountFormModal";
import ConfirmBookingPrice from "../../containers/ConfirmBookingPrice/ConfirmBookingPrice";
import DeclineBooking from "../../containers/DeclineBooking/DeclineBooking";
import ValidateBooking from "../../containers/ValidateBooking/ValidateBooking";
import CancelBooking from "../../containers/CancelBooking/CancelBooking";
import DeleteAccount from "../../containers/DeleteAccount/DeleteAccount";
import CompleteProfileModal from "../../containers/CompleteProfileModal/CompleteProfileModal";
import ProductDeliveryModal from "../../containers/ProductDeliveryModal/ProductDeliveryModal";
import VerifyYourEmailModal from "../../containers/VerifyYourEmailModal/VerifyYourEmailModal";
import LanguageSwitcherSelector from "../../containers/LanguageSwitcherSelector/LanguageSwitcherSelector";
import 'react-redux-notify/dist/ReactReduxNotify.css';
import 'semantic-ui-css/semantic.min.css';
import { Notify } from 'react-redux-notify';
import {FormattedMessage} from 'react-intl'
import { setActiveIndex } from "../../store/actions/myProfile";
import { openSignupParentModal } from "../../store/actions/signupParentModal";
import { openLoginParentModal } from "../../store/actions/loginParentModal";
import SendPackageModal from "../../containers/SendPackageModal/SendPackageModal";
import AddTripModal from "../../containers/AddTripModal/AddTripModal";

import $ from "jquery";
import BookingDetailsModal from "../BookingDetailsModal/BookingDetailsModal";
import SelectProposalTripModal from "../SelectProposalTripModal/SelectProposalTripModal";
import CanclePriceProposalConfirm from "../CanclePriceProposalConfirm/CanclePriceProposalConfirm";
import SelectPriceProposalModal from "../SelectPriceProposalModal/SelectPriceProposalModal";

window.jQuery = $;


class CustomLayout extends React.Component {

  state = {
    isMobile: false,
    load:true
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

    this.setState({
      load:false
    })

    // setTimeout(()=>{
    //   this.setState({
    //     load:false
    //   })
    // }, 10000)


    // BACK TO TOP -------------
    $(document).on('click', '#back-to-top, .back-to-top', () => {
      $('html, body').animate({
          scrollTop: 0
      }, '500');
      return false;
      });
    $(window).on('scroll', () => {
        if ($(window).scrollTop() > 500) {
            $('#back-to-top').fadeIn(200);
        } else {
            $('#back-to-top').fadeOut(200);
        }
    });

    // bubbles ----------------- 
    var bArray = [];
    var sArray = [2, 4, 6, 8];
    for (var i = 0; i < $('.bubbles').width(); i++) {
        bArray.push(i);
    }
    function randomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    setInterval(function () {
        var size = randomValue(sArray);
        $('.bubbles').append('<div class="individual-bubble" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');
        $('.individual-bubble').animate({
            'bottom': '100%',
            'opacity': '-=0.7'
        }, 4000, function () {
            $(this).remove()
        });
    }, 350);



  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScreenSize);
  }

  logoutUtil = () => {
    console.log(" IN LOGOUT")
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
    const location =this.props.history.location.pathname;
    console.log("Props HISTORY",this.props.history)

    let mobileMenu = (
      <ul className="nav navbar-nav" id="responsive-menu">
        <li className={location=='/'&& "active"}><a onClick={this.handleOnClick.bind(this, '/')} >
          <FormattedMessage
            id="layout.dispatch"
            defaultMessage="Dispatch"
          />
        </a></li>
        <li className={location=='/transport'&& "active"}><a onClick={this.handleOnClick.bind(this, '/transport')}>
          <FormattedMessage
            id="layout.transport"
            defaultMessage="Transport"
          />
        </a></li>
      </ul>
    );

    return (
      <div>
      <SelectPriceProposalModal />
      <CanclePriceProposalConfirm />
      <SelectProposalTripModal />
      <SignupParentModal />
      <LoginParentModal />
      <BookingDetailsModal/>
      <ForgotPasswordModal />
      {/* <DeleteBookingConfirm /> */}
      <DeleteTripConfirm />
      <UpdateTripForm />
      <UpdateBooking />
      <ProposePriceOnBooking />
      <ConfirmBookingPrice />
      <PaymentOptions />
      <SelectCreditCard />
      <PaymentFormModal />
      <BankAccountFormModal />
      <DeclineBooking />
      <ValidateBooking />
      <DeleteAccount />
      <SendPackageModal/>
      <AddTripModal />
      <CompleteProfileModal />
      <ProductDeliveryModal />
      <CancelBooking />
      <VerifyYourEmailModal />
      <Notify position={"BottomLeft"}/>
        {/* Preloader */}
          <div id="preloader" style={{display:this.state.load?'block':'none'}}>
            <div id="status"></div>
          </div>
        {/* Preloader Ends */}

        {/* header starts */}
        <header className="main_header_area headerstye-1">
          {/* Navigation Bar */}
          <div className="header_menu" id="header_menu">
            <nav className="navbar navbar-default">
              <div className="container">
                <div className="navbar-flex d-flex align-items-center justify-content-between w-100 pb-2 pt-2">
                  {/* Brand and toggle get grouped for better mobile display */}
                  <div className="navbar-header">
                    <a className="navbar-brand">
                      <img src="/static/images/inzula_fr.png" alt="image" />
                      <img src="/static/images/inzula_fr.png" alt="image" />
                    </a>
                  </div>
                  <div className="navbar-lang">
                    <LanguageSwitcherSelector/>
                  </div>
                  {/* Collect the nav links, forms, and other content for toggling */}
                  <div className="navbar-collapse1 d-flex align-items-center" id="bs-example-navbar-collapse-1">
                      {authenticated ? (mobileMenu) :
                        (
                        <ul className="nav navbar-nav" id="responsive-menu">
                          <li className={location=='/'&& "active"}><a  onClick={this.handleOnClick.bind(this, '/')}>
                            <FormattedMessage
                              id="layout.dispatch"
                              defaultMessage="Dispatch"
                            />
                          </a></li>
                          <li className={location=='/transport'&& "active"}><a  onClick={this.handleOnClick.bind(this, '/transport')}>
                            <FormattedMessage
                              id="layout.transport"
                              defaultMessage="Transport"
                            />
                          </a></li>
                          <li><a  className="mr-2" data-toggle="modal" data-target="#register"><i className="icon-user mr-1" />
                            <FormattedMessage
                                id="layout.signup"
                                defaultMessage="signup"
                              />
                          </a></li>
                          <li><a  data-toggle="modal" data-target="#login"><i className="icon-login mr-1" /> 
                            <FormattedMessage
                                  id="layout.login"
                                  defaultMessage="login"
                                />
                          </a></li>
                        </ul>
                      )}
                    
                    {/*<div class="header_sidemenu">
                              <div class="mhead">
                                  <span class="menu-ham">
                                      <a href="#" class="cart-icon d-flex align-items-center ml-1"><i class="icon-basket-loaded"></i><span class="cart-label">3</span></a>
                                  </span>
                              </div>
                          </div>*/}
                  </div>{/* /.navbar-collapse */}

                  {authenticated ? (
                    <div className="register-login">
                      <div className="dropdown">
                        <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          {/* <i className="fa fa-user-circle" /> Mon compte */}
                          <img className={"profile-image"} src={profile_pic !== null && profile_pic !== "null" ? get_img_url(profile_pic) : backend_url() + '/static/images/user_avatar.png'}  alt="" /> Mon compte
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a className="dropdown-item" href="#"><i className="sl sl-icon-settings" /> Param??tres</a>
                          <a className="dropdown-item" onClick={this.handleOnClick.bind(this, '/dashboard/profile')}><i className="sl sl-icon-user" /> Profil</a>
                          <a className="dropdown-item" onClick={this.logoutUtil.bind(this)} ><i className="sl sl-icon-power"/> D??connexion</a>
                        </div>
                      </div>
                    </div>) : ""
                    }
                  
                  {/* <div class="register-login">
                            <a href="#" class="mr-2" data-toggle="modal" data-target="#register"><i class="icon-user mr-1"></i> Register</a>
                            <a href="#" data-toggle="modal" data-target="#login"><i class="icon-login mr-1"></i> Login</a>
                        </div>*/}
                  <div id="slicknav-mobile" />
                </div>
              </div>{/* /.container-fluid */}
            </nav>
          </div>
          {/* Navigation Bar Ends */}
        </header>
        {/* header ends */}

        {this.props.children}   

        {/* footer starts */}
        <Footer/>
        {/* footer ends */}

        {/* Back to top start */}
        <div id="back-to-top">
          <a href="#" />
        </div>
        {/* Back to top ends */}



      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // authenticated: state.auth.token !== null,
    authenticated: localStorage.getItem("token") !== null,
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

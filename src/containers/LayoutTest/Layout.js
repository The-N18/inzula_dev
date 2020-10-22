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
      <div>
      <header id="header-wrap">
        <nav class="navbar navbar-expand-md bg-inverse fixed-top scrolling-navbar">
          <div class="container">
            <a href="index.html" class="navbar-brand"><img src="./images/Picture1.png" alt=""/></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
              aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <i class="lni-menu"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav mr-auto w-100 justify-content-end clearfix">
                <li class="nav-item active">
                  <a class="nav-link" >
                    Benefit from a 15% reduction
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" >
                    Dispatch
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="transport.html">
                    Transport
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="registration.html">
                    Registration
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="login.html">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div id="hero-area" class="hero-area-bg">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div class="contents">
                  <h2 class="head-title">Send parcels to your loved ones, via contacts in your network </h2>
                  <p>INZULA connects travelers with kgs available and people in their network wanting to ship at low cost
                  </p>
                  <div class="header-button">
                    <a rel="nofollow" href="#" class="btn btn-common">Earn money while traveling </a>
                    <a href="#" class="btn btn-common">Ship via your loved ones </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12" id="intro-img">
                <div class="intro-img">
                  <a href="#" class="btn btn-border video-popup">1 minute video to watch here! </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </header>

      <div class="about-area section-padding bg-gray">
        <div class="container">
          <div class="row">
            <div class="about-wrapper wow fadeInLeft" data-wow-delay="0.3s">
              <div>
                <div class="site-heading">
                  <h2 class="section-title">How INZULA works</h2>
                  <p class="mb-3">For shippers: </p>
                </div>
                <div class="content">
                  <p>
                    Send packages to loved ones all over the world inexpensively through people in your network. This saves
                    you up to 70% of the price you would have paid using a traditional parcel delivery service. The bonus?
                    Your packages are insured and you have the choice of carrier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="features" class="section-padding">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="section-title wow fadeInDown" data-wow-delay="0.3s">How INZULA works for shippers</h2>
            <div class="shape wow fadeInDown" data-wow-delay="0.3s"></div>
          </div>
          <div class="box-item wow fadeInRight" data-wow-delay="0.3s">
            <div class="row">
              <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <div class="text">
                  <h4>1 - Tell us more about your package</h4>
                  <p> With INZULA, you can ship your packages anywhere in the world. To get started, create your profile and
                    fill
                    in as much information as possible about the package you want.hate to ship, that is to say the nature of
                    the
                    package to be shipped, the place where you want to ship your package, information on the recipient of
                    the
                    package, the desired date of dispatch. An estimate of the cost of transporting the package will be
                    offered to
                    you on the platform.
                  </p>
                </div>
              </div>
              <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <img src="./images/homepage/Picture3.png" />
              </div>
            </div>
          </div>

          <div class="box-item wow fadeInRight" data-wow-delay="0.6s">
            <div class="row">
              <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <div class="text">
                  <h4>2- Wait for carriers to make offers to you</h4>
                  <p> Once you have published your offer, we will share it with our community. Travelers interested in this
                    destination will contact you to make offers of parcel transport.
                  </p>
                </div>
              </div>
              <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <img src="./images/homepage/Picture4.png" />
              </div>
            </div>
          </div>

          <div class="box-item wow fadeInRight" data-wow-delay="0.9s">
            <div class="row">
              <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <div class="text">
                  <h4>3 - Agree on a reward amount with the traveler </h4>
                  <p>INZULA will automatically calculate all charges applicable to the transport of the package, including:
                    - the amount agreed with the carrier
                    - the insurance costs of your package
                    - platform management fees
                    If for any reason the traveler cancels their trip, you will receive a full refund.
                  </p>
                </div>
              </div>
              <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <img src="./images/homepage/Picture5.png" />
              </div>
            </div>
          </div>

          <div class="box-item wow fadeInRight" data-wow-delay="0.3s">
            <div class="row">
              <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <div class="text">
                  <h4>4- Agree on a place to meet the traveler </h4>
                  <p>Once the transaction is settled, agree on a time and a public place to deliver your package to the
                    traveler.
                    During the delivery of the package, remember:
                    - to take a picture of yourself with the carrier to certify the delivery of the package to the latter
                    - to verify the identity document of the person to whom youhand over the package
                    - confirm delivery of the package to the traveler
                  </p>
                </div>
              </div>
              <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <img src="./images/homepage/Picture6.png" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="about-area section-padding bg-gray">
        <div class="container">
          <div class="row">
            <div class="about-wrapper wow fadeInLeft" data-wow-delay="0.3s">
              <div>
                <div class="site-heading">
                  <h2 class="section-title">How INZULA works</h2>
                  <p class="mb-3">For carriers:</p>
                </div>
                <div class="content">
                  <p>
                    Fund your trip every time you travel with INZULA. Our travelers usually deliver a handful of packages
                    and write off their plane ticket. Not only will you make money traveling, but you will meet amazing
                    people along the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="features" class="section-padding">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="section-title wow fadeInDown" data-wow-delay="0.3s">How INZULA works for carriers</h2>
            <div class="shape wow fadeInDown" data-wow-delay="0.3s"></div>
          </div>
          <div class="box-item wow fadeInRight" data-wow-delay="0.3s">
            <div class="row">
              <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <div class="text">
                  <h4>1 - Find a shipment request and make a transport proposal </h4>
                  <p> Find a shipment request that matches your next trip. Make an offer and set your
                    Traveler Reward - the amount your buyer will pay you for the delivery of their item.
                  </p>
                </div>
              </div>
              <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <img src="./images/homepage/Picture7.png" />
              </div>
            </div>
          </div>

          <div class="box-item wow fadeInRight" data-wow-delay="0.6s">
            <div class="row">
              <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <div class="text">
                  <h4>2- Agree on a place to meet the sender </h4>
                  <p>
                    Once yourth proposition validated, uUse the INZULA courier to arrange a location to pick up the package.
                    During the delivery of the package, remember:
                    - to take a picture of yourself with the sender to certify that the package has been delivered to you
                    - to check the identity document of the person who gives you the parcel.
                  </p>
                </div>
              </div>
              <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <img src="./images/homepage/Picture8.png" />
              </div>
            </div>
          </div>

          <div class="box-item wow fadeInRight" data-wow-delay="0.9s">
            <div class="row">
              <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <div class="text">
                  <h4>3 - Meet the recipient of the package where you are going </h4>
                  <p>
                    Once at destination, you have 3 days from your arrival in the country to contact
                    the recipient of the package. Arrange an appointment in a public place to deliver the
                    package to the recipient and remember to take a photo of yourself with the latter to
                    certify the delivery.
                  </p>
                </div>
              </div>
              <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <img src="./images/homepage/Picture9.png" />
              </div>
            </div>
          </div>

          <div class="box-item wow fadeInRight" data-wow-delay="0.3s">
            <div class="row">
              <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <div class="text">
                  <h4>4- Receive your payment </h4>
                  <p>
                    Once the package has been delivered, validate the discount on the site.
                    The sender then has 2 days to confirm the delivery by hand to the recipient, and you
                    will then receive your payment.
                  </p>
                </div>
              </div>
              <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <img src="./images/homepage/Picture10.png" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" class="section-padding">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="section-title wow fadeInDown" data-wow-delay="0.3s">We are proud to offer you a service </h2>
            <div class="shape wow fadeInDown" data-wow-delay="0.3s"></div>
          </div>
          <div class="row">
            <div class="col-md-6 col-lg-4 col-xs-12">
              <div class="services-item wow fadeInRight" data-wow-delay="0.3s">
                <img src="./images/homepage/Picture11.png" />
                <div class="services-content">
                  <h3><a href="#">Convenient</a></h3>
                  <p>Quickly and easily find a car-pooling nearby among those proposed destinations </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 col-xs-12">
              <div class="services-item wow fadeInRight" data-wow-delay="0.6s">
                <img src="./images/homepage/Picture12.png" />
                <div class="services-content">
                  <h3><a href="#">With various payment methods </a></h3>
                  <p>To make your life easier, we accept various payment methods including Visa, MasterCard, Orange Money,
                    other options to come </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 col-xs-12">
              <div class="services-item wow fadeInRight" data-wow-delay="0.9s">
                <img src="./images/homepage/Picture13.png" />
                <div class="services-content">
                  <h3><a href="#">Economic </a></h3>
                  <p>Send your parcels anywhere in the world, at a much cheaper price than those offered on the market</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 col-xs-12">
              <div class="services-item wow fadeInRight" data-wow-delay="1.2s">
                <img src="./images/homepage/Picture14.png" />
                <div class="services-content">
                  <h3><a href="#">Verified user community </a></h3>
                  <p>INZULA is more than a platform, it is a community.
                    We know each of our members. How? 'Or' What ? We check profiles, reviews, IDs and theft. So you know who
                    you're talking to
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 col-xs-12">
              <div class="services-item wow fadeInRight" data-wow-delay="1.5s">
                <img src="./images/homepage/Picture15.png" />
                <div class="services-content">
                  <h3><a href="#">security </a></h3>
                  <p>Protection insurance for your goods is offered to you based on the declared value of the goods you want
                    to ship </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4 col-xs-12">
              <div class="services-item wow fadeInRight" data-wow-delay="1.8s">
                <img src="./images/homepage/Picture16.png" />
                <div class="services-content">
                  <h3><a href="#">Customer service at your disposal</a></h3>
                  <p> Our customer service is at your disposal to respond to your problems that may arise during
                    transactions. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="footer" class="footer-area section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
              <ul class="footer-link">
                <li><a href="#">Why are we?</a></li>
                <li><a href="#">How it works</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">INZULA Blog</a></li>
                <li><a href="#">frequently asked Questions </a></li>
                <li><a href="#">Insurance</a></li>
              </ul>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
              <ul class="footer-link">
                <li><a href="#">Rules of benevolence</a></li>
                <li><a href="#">legal information</a></li>
                <li><a href="#">Platform transparency </a></li>
                <li><a href="#">Platform transparency</a></li>
              </ul>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
              <ul class="address">
                <li> <a href="#">Payment logos </a> </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="copyright">
          <div class="container">
            <div class="row">
              <div class="col-md-8">
                <div class="copyright-content">
                  <div class="social-icon">
                    <i class="fa fa-facebook" aria-hidden="true"></i>
                    <i class="fa fa-whatsapp" aria-hidden="true"></i>
                    <i class="fa fa-twitter" aria-hidden="true"></i>
                    <a><i class="fa fa-instagram" aria-hidden="true"></i></a>
                    <a><i class="fa fa-youtube" aria-hidden="true"></i></a>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="copyright-content">
                  <p><a>All Right Reserved</a> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <a href="#" class="back-to-top">
        <i class="lni-arrow-up"></i>
      </a>

      <div id="preloader">
        <div class="loader" id="loader-1"></div>
      </div>
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

// export default CSSModules(CustomLayout, styles);

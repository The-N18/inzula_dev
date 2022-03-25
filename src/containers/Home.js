import PropTypes from "prop-types";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Responsive,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import styles from "./Home.module.css";
import HomeServiceSection from "../containers/HomeServiceSection/HomeServiceSection";
import HomeHowInzulaWorksSection from "../containers/HomeHowInzulaWorksSection/HomeHowInzulaWorksSection";
import HomeTextVideo from "../containers/HomeTextVideo/HomeTextVideo";
import SearchTripsForm from "../containers/SearchTripsReduxFormDummy/SearchTripsForm";
import SelectReservationsModal from "../containers/SelectReservationsModal/SelectReservationsModal";
import Counters from "./Counters/Counters";
import Slider from "react-slick";
import {FormattedMessage} from 'react-intl'

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        />
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        {children}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};
 
const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};








class HomepageLayout extends React.Component {

  constructor(props) {
    super(props)

  }

render(){

  const settings = {
    arrows:false,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase:'linear'
  };

  return (
    // <ResponsiveContainer>
    //   <HomeTextVideo/>
    //   <SelectReservationsModal/>
    //   <SearchTripsForm/>
    //   <HomeHowInzulaWorksSection/>
    //   <HomeServiceSection/>
    // </ResponsiveContainer>
  
    <React.Fragment>
      <HomeTextVideo/>
      {/* section 2 starts */}
      {/* banner starts */}
      <section id="search_trips_section" className="banner overflow-hidden" style={{backgroundImage: 'url(/static/images/flights/travel1.jpg)'}}>
        <div className="banner-main">
          <div className="banner-image" style={{backgroundImage: 'url(/static/images/flights/travel1.jpg)'}} />
          <div className="banner-content">
            <h1 className="white mb-2">
              <FormattedMessage
                id="home_search_trips_section.title"
                defaultMessage=""
              />
            </h1>
            <p className="white mb-4">
              <FormattedMessage
                id="home_search_trips_section.subtitle"
                defaultMessage=""
              />
            </p>
            <a onClick={()=>{this.props.history.push('/how-does-it-work')}} className="per-btn">
              <span className="white">
                <FormattedMessage
                  id="home_search_trips_section.how_it_works"
                  defaultMessage=""
                />
              </span><i className="fa fa-arrow-right white" />
            </a><br /><br /><br /><br />
          </div>
        </div>
        {/*<div class="overlay"></div>*/}
      </section>
      {/* banner ends */}
      <SearchTripsForm/>
      {/* How it works Starts */}
      <section className="trending destination bg-grey pb-6 pt-9" style={{backgroundImage: 'url(/static/images/bg/bg4.jpg)'}}>
        <div className="container">
          <div className="section-title section-title-w text-center mb-5 pb-2 w-50 mx-auto">
            <h2 className="m-0 ">
              <FormattedMessage
                  id="how_inzula_works.title"
                  values={{ span:(value) => <span  className='pink'>{value}</span> ,
                    strong: (value) => <strong>{value}</strong>}}
                  defaultMessage=""
                />
            </h2>
            <p className="mb-0 ">
                <FormattedMessage
                  id="how_inzula_works.subtitle1"
                  values={{strong: (value) => <strong>{value}</strong>}}
                  defaultMessage=""
                />
            </p>
            <p className="mb-0 ">
                <FormattedMessage
                  id="how_inzula_works.subtitle2"
                  values={{strong: (value) => <strong>{value}</strong>}}
                  defaultMessage=""
                />
            </p>
          </div>  
          <div className="trend-box">
            <div className="price-navtab text-center mb-4">
              <ul className="nav nav-tabs">
                <li className="active"><a data-toggle="tab" href="#expediteur">
                  <FormattedMessage
                    id="how_inzula_works.sender"
                    defaultMessage=""
                  />
                </a></li>
                <li><a data-toggle="tab" href="#transporteur">
                  <FormattedMessage
                    id="how_inzula_works.carrier"
                    defaultMessage=""
                  />
                </a></li>
              </ul>
            </div>
            <div className="tab-content">
              <div id="expediteur" className="tab-pane fade in active">
                <div className="row">
                  <div className="col-lg-3 col-md-6 p-1">
                    <div className="trend-item">
                      <div className="trend-image">
                        <img src="/static/images/howitworks/expediteur1.png" alt="image" />
                      </div>
                      <div className="trend-content-main">
                        <div className="trend-content">
                          <h4><a href="#">
                            <FormattedMessage
                              id="how_inzula_works.tell_pkg"
                              defaultMessage=""
                            />
                          </a></h4>
                          <br/>
                        </div>
                        <div className="trend-last-main">
                          <div className={`${styles['how-it-works-text']}`}>
                            <p className="mb-0 trend-para">
                              <FormattedMessage
                                id="how_inzula_works.tell_pkg_desc"
                                defaultMessage=""
                              />
                            </p>
                          </div>
                          <div className="trend-last d-flex align-items-center justify-content-between">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 p-1">
                    <div className="trend-item">
                      <div className="trend-image">
                        <img src="/static/images/howitworks/expediteur2.png" alt="image" />
                      </div>
                      <div className="trend-content-main">
                        <div className="trend-content">
                          <h4><a href="#">
                            <FormattedMessage
                              id="how_inzula_works.wait_carr"
                              values={{span: (value) => <span>{value}<br/><br/></span>}}
                              defaultMessage=""
                            />
                          </a></h4>
                        </div>
                        <div className="trend-last-main">
                          <div className={`${styles['how-it-works-text']}`}>
                            <p className="mb-0 trend-para">
                              <FormattedMessage
                                id="how_inzula_works.wait_carr_desc"
                                defaultMessage=""
                              />
                            </p>
                          </div>
                          <div className="trend-last d-flex align-items-center justify-content-between">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 p-1">
                    <div className="trend-item">
                      <div className="trend-image">
                        <img src="/static/images/howitworks/expediteur3.png" alt="image" />
                      </div>
                      <div className="trend-content-main">
                        <div className="trend-content">
                          <h4><a href="#">
                            <FormattedMessage
                                id="how_inzula_works.reward_carr"
                                values={{span: (value) => <span>{value}<br/><br/></span>}}
                                defaultMessage=""
                              />
                           </a></h4>
                        </div>
                        <div className="trend-last-main">
                          <div className={`${styles['how-it-works-text']}`}>
                            <FormattedMessage
                              id="how_inzula_works.reward_carr_desc"
                              values={{li: (value) => <li>{value}</li>,
                                ul:(value) => <ul className={`${styles['how-it-works-ul']}`}>{value}<br/></ul>,
                                p: (value) => <p className="mb-0 trend-para">{value}</p>}}
                              defaultMessage=""
                            />
                          </div>
                          <div className="trend-last d-flex align-items-center justify-content-between">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 p-1">
                    <div className="trend-item">
                      <div className="trend-image">
                        <img src="/static/images/howitworks/expediteur4.png" alt="image" />
                      </div>
                      <div className="trend-content-main">
                        <div className="trend-content">
                          <h4><a href="#">
                            <FormattedMessage
                              id="how_inzula_works.meet_carr"
                              values={{span: (value) => <span>{value}<br/><br/></span>}}
                              defaultMessage=""
                            />
                            </a></h4>
                        </div>
                        <div className="trend-last-main">
                          <div className={`${styles['how-it-works-text']}`}>
                            <FormattedMessage
                              id="how_inzula_works.meet_carr_desc"
                              values={{li: (value) => <li>{value}</li>,
                                ul:(value) => <ul className={`${styles['how-it-works-ul']}`}>{value}<br/></ul>,
                                p: (value) => <p className="mb-0 trend-para">{value}</p>}}
                              defaultMessage=""
                            />
                          </div> 
                          <div className="trend-last d-flex align-items-center justify-content-between">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="transporteur" className="tab-pane fade">
                <div className="row">
                  <div className="col-lg-3 col-md-6 p-1">
                    <div className="trend-item">
                      <div className="trend-image">
                        <img src="/static/images/howitworks/transporteur1.png" alt="image" />
                      </div>
                      <div className="trend-content-main">
                        <div className="trend-content">
                          <h4><a href="#">
                            <FormattedMessage
                                id="how_inzula_works.find_request"
                                defaultMessage=""
                              />
                           </a></h4>
                        </div>
                        <div className="trend-last-main">
                          <div className={`${styles['how-it-works-text']}`}>
                            <p className="mb-0 trend-para">
                              <FormattedMessage
                                  id="how_inzula_works.find_request_desc"
                                  defaultMessage=""
                                />
                            </p><br /><br />
                          </div>
                          <div className="trend-last d-flex align-items-center justify-content-between">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 p-1">
                    <div className="trend-item">
                      <div className="trend-image">
                        <img src="/static/images/howitworks/transporteur2.png" alt="image" />
                      </div>
                      <div className="trend-content-main">
                        <div className="trend-content">
                          <h4><a href="#">
                            <FormattedMessage
                                id="how_inzula_works.place"
                                defaultMessage=""
                              />
                            <br/><br/></a></h4>
                          <br/>
                        </div>
                        <div className="trend-last-main">
                          <div className={`${styles['how-it-works-text']}`}>
                            <FormattedMessage
                              id="how_inzula_works.place_desc"
                              values={{li: (value) => <li>{value}</li>,
                                ul:(value) => <ul className={`${styles['how-it-works-ul']}`}>{value}</ul>,
                                p: (value) => <p className="mb-0 trend-para">{value}</p>}}
                              defaultMessage=""
                            />
                          </div>
                          <div className="trend-last d-flex align-items-center justify-content-between">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 p-1">
                    <div className="trend-item">
                      <div className="trend-image">
                        <img src="/static/images/howitworks/transporteur3.png" alt="image" />
                        <br/>
                      </div>
                      <div className="trend-content-main">
                        <div className="trend-content">
                          <h4><a href="#">
                            <FormattedMessage
                                id="how_inzula_works.sender_title"
                                defaultMessage=""
                              />
                          </a></h4>
                          <br/>
                        </div>
                        <div className="trend-last-main">
                          <div className={`${styles['how-it-works-text']}`}>
                            <FormattedMessage
                              id="how_inzula_works.sender_desc"
                              values={{li: (value) => <li>{value}</li>,
                                ul:(value) => <ul className={`${styles['how-it-works-ul']}`}>{value}</ul>,
                                p: (value) => <p className="mb-0 trend-para">{value}</p>}}
                              defaultMessage=""
                            />
                          </div>
                          <div className="trend-last d-flex align-items-center justify-content-between">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 p-1">
                    <div className="trend-item">
                      <div className="trend-image">
                        <img src="/static/images/howitworks/transporteur4.png" alt="image" />
                      </div>
                      <div className="trend-content-main">
                        <div className="trend-content">
                          <h4><a href="#">
                            <FormattedMessage
                              id="how_inzula_works.pay"
                              values={{span: (value) => <span>{value}<br/><br/></span>}}
                              defaultMessage=""
                            />
                          </a></h4>
                          <br/>
                        </div>
                        <div className="trend-last-main">
                          <div className={`${styles['how-it-works-text']}`}>
                            <p className="mb-0 trend-para">
                              <FormattedMessage
                                id="how_inzula_works.pay_desc"
                                defaultMessage=""
                              />
                            </p><br /><br /><br /><br /><br /><br /><br /><br /><br />
                          </div>
                          <div className="trend-last d-flex align-items-center justify-content-between">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>    
        </div>
        {/*  <div class="dot-overlay"></div>*/}
      </section>
      {/* How it works Ends */}
  
          {/* payments mode starts */}
          
          <div className="partners bordernone pt-5 pb-5">
            <div className="container">
            <Slider {...settings} >
              {/* <div className="row attract-slider"> */}
                
                  <div className="client-logo item">
                    <a href="#">
                      <img src="/static/images/payments/amex.png" alt="" />
                    </a>
                  </div>
                  <div className="client-logo item">
                    <a href="#">
                      <img src="/static/images/payments/Mastercard.svg" alt="" />
                    </a>
                  </div>
                  <div className="client-logo item">
                    <a href="#">
                      <img src="/static/images/payments/paypallogo.png" alt="" />
                    </a>
                  </div>
                  <div className="client-logo item">
                    <a href="#">
                      <img src="/static/images/payments/visa.png" alt="" />
                    </a>
                  </div>
                  <div className="client-logo item">
                    <a href="#">
                      <img src="/static/images/payments/orange.png" alt="" />
                    </a>
                  </div>
                  <div className="client-logo item">
                    <a href="#">
                      <img src="/static/images/payments/mtn.png" alt="" />
                    </a>
                  </div>
                  <div className="client-logo item">
                    <a href="#">
                      <img src="/static/images/payments/moneygram.png" alt="" />
                    </a>
                  </div>
                  <div className="client-logo item">
                    <a href="#">
                      <img src="/static/images/payments/WU.png" alt="" />
                    </a>
                  </div>
                  <div className="client-logo item">
                    <a href="#">
                      <img src="/static/images/payments/amex.png" alt="" />
                    </a>
                  </div>
                  <div className="client-logo item">
                    <a href="#">
                      <img src="/static/images/payments/Mastercard.svg" alt="" />
                    </a>
                  </div>
                  <div className="client-logo item">
                    <a href="#">
                      <img src="/static/images/payments/paypallogo.png" alt="" />
                    </a>
                  </div>
                  <div className="client-logo item">
                    <a href="#">
                      <img src="/static/images/payments/visa.png" alt="" />
                    </a>
                  </div>
                  <div className="client-logo item">
                    <a href="#">
                      <img src="/static/images/payments/orange.png" alt="" />
                    </a>
                  </div>
                  <div className="client-logo item">
                    <a href="#">
                      <img src="/static/images/payments/mtn.png" alt="" />
                    </a>
                  </div>
                  <div className="client-logo item">
                    <a href="#">
                      <img src="/static/images/payments/moneygram.png" alt="" />
                    </a>
                  </div>
                  <div className="client-logo item">
                    <a href="#">
                      <img src="/static/images/payments/WU.png" alt="" />
                    </a>
                  </div>
              {/* </div> */}
          </Slider>
            </div>
          

          </div>
          {/* payments mode ends */}
          {/* Our gurantee starts */}
          <section className="featured-us bg-grey pb-6">
            <div className="container">
              <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
                <h4 className="mb-0 pink">
                  <FormattedMessage
                    id="home_service.promise"
                    defaultMessage=""
                  />
                </h4>
                <h2 className="m-0">
                <FormattedMessage
                  id="home_service.title"
                  values={{span: (value) => <span>{value}</span>}}
                  defaultMessage=""
                />
                </h2>
                <p className="mb-0">
                  <FormattedMessage
                    id="home_service.subtitle1"
                    defaultMessage=""
                  />
                  <br />
                  <FormattedMessage
                    id="home_service.subtitle2"
                    defaultMessage=""
                  />
                  </p>
              </div>
              <div className="featured-us-box">
                <div className="row">
                  <div className="col-lg mb-4">
                    <div className="featured-us-item">
                      <div className="featured-us-icon bg-transparent d-inline">
                        <i className="fa fa-laugh-beam pink" />
                      </div>
                      <div className="featured-us-content w-100">
                        <h4 className="mb-1 text-uppercase"><a href="#">
                        <FormattedMessage
                          id="home_service.customer_service"
                          defaultMessage=""
                        />
                          </a></h4>
                        <p className="mb-0">
                        <FormattedMessage
                          id="home_service.customer_service_desc"
                          defaultMessage=""
                        />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg mb-4">
                    <div className="featured-us-item">
                      <div className="featured-us-icon bg-transparent d-inline">
                        <i className="fa fa-hand-holding-usd pink" />
                      </div>
                      <div className="featured-us-content w-100">
                        <h4 className="mb-1 text-uppercase"><a href="#">
                        <FormattedMessage
                          id="home_service.pay_methods"
                          defaultMessage=""
                        />
                          </a></h4>
                        <p className="mb-0">
                        <FormattedMessage
                          id="home_service.pay_methods_desc"
                          defaultMessage=""
                        />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg mb-4">
                    <div className="featured-us-item">
                      <div className="featured-us-icon bg-transparent d-inline">
                        <i className="fa fa-piggy-bank pink" />
                      </div>
                      <div className="featured-us-content w-100">
                        <h4 className="mb-1 text-uppercase"><a href="#">
                        <FormattedMessage
                          id="home_service.eco"
                          defaultMessage=""
                        />
                          </a></h4>
                        <p className="mb-0">
                        <FormattedMessage
                          id="home_service.eco_desc"
                          defaultMessage=""
                        />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg mb-4">
                    <div className="featured-us-item">
                      <div className="featured-us-icon bg-transparent d-inline">
                        <i className="fa fa-user-check pink" />
                      </div>
                      <div className="featured-us-content w-100">
                        <h4 className="mb-1 text-uppercase"><a href="#">
                        <FormattedMessage
                          id="home_service.user_comm"
                          defaultMessage=""
                        />
                          </a></h4>
                        <p className="mb-0">
                        <FormattedMessage
                          id="home_service.user_comm_desc"
                          defaultMessage=""
                        />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg mb-4">
                    <div className="featured-us-item">
                      <div className="featured-us-icon bg-transparent d-inline">
                        <i className="fa fa-shield-alt pink" />
                      </div>
                      <div className="featured-us-content w-100">
                        <h4 className="mb-1 text-uppercase"><a href="#">
                        <FormattedMessage
                          id="home_service.security"
                          defaultMessage=""
                        />
                          </a></h4>
                        <p className="mb-0">
                        <FormattedMessage
                          id="home_service.security_desc"
                          defaultMessage=""
                        />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg mb-4">
                    <div className="featured-us-item">
                      <div className="featured-us-icon bg-transparent d-inline">
                        <i className="fas fa-headset pink" />
                      </div>
                      <div className="featured-us-content w-100">
                        <h4 className="mb-1 text-uppercase"><a href="#">
                        <FormattedMessage
                          id="home_service.customer_support"
                          defaultMessage=""
                        />
                          </a></h4>
                        <p className="mb-0">
                        <FormattedMessage
                          id="home_service.customer_support_desc"
                          defaultMessage=""
                        />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Our gurantee ends */}
          <Counters/>
    </React.Fragment>
  )
} 
}

export default withRouter(HomepageLayout);

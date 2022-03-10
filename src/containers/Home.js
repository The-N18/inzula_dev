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
            <h1 className="white mb-2">Avec INZULA, la sérénité et la facilité à garder le contact avec vos proches!</h1>
            <p className="white mb-4">Soyez à votre aise et serein en expédiant avec nous !!</p>
            <a onClick={()=>{this.props.history.push('/how-does-it-work')}} className="per-btn">
              <span className="white">Comment ca marche</span><i className="fa fa-arrow-right white" />
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
            <h2 className="m-0 ">Comment <strong><span className="pink">INZULA fonctionne ?</span></strong></h2>
            <p className="mb-0 "><strong>Expédiez</strong> à bas coûts et de sereinement un colis à vos proches via notre communauté.</p>
            <p className="mb-0 "><strong>Financez</strong> votre voyage en transportant des colis de particuliers souhaitant faire des économies</p>
          </div>  
          <div className="trend-box">
            <div className="price-navtab text-center mb-4">
              <ul className="nav nav-tabs">
                <li className="active"><a data-toggle="tab" href="#expediteur">Expediteur</a></li>
                <li><a data-toggle="tab" href="#transporteur">Transporteur</a></li>
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
                          <h4><a href="#">1 - Dites nous en plus sur votre colis</a></h4>
                          <br/>
                        </div>
                        <div className="trend-last-main">
                          <div className={`${styles['how-it-works-text']}`}>
                            <p className="mb-0 trend-para">Pour commencer, créez votre profil et renseignez le maximum d’informations sur le colis que vous souhaitez expédier.
                              Une estimation du coût du transport du colis vous sera proposée sur la plateforme.</p>
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
                          <h4><a href="#">2- Attendez que des transporteurs vous fassent des offres</a></h4>
                        </div>
                        <div className="trend-last-main">
                          <div className={`${styles['how-it-works-text']}`}>
                            <p className="mb-0 trend-para">Une fois que vous aurez publié votre offre, nous là partagerons avec notre communauté. Les voyageurs intéressés par cette destination vous feront des offres de transport de colis.</p>
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
                          <h4><a href="#">3 - Convenez d’un montant de récompense avec le voyageur</a></h4>
                        </div>
                        <div className="trend-last-main">
                          <div className={`${styles['how-it-works-text']}`}>
                            <p className="mb-0 trend-para">INZULA calculera automatiquement tous les frais applicables incluant :</p>
                            <ul className={`${styles['how-it-works-ul']}`}>
                              <li>le montant convenu</li>
                              <li>les  frais d’assurance du colis</li>
                              <li>les frais de gestion de la plateforme</li>
                            </ul><br />
                            <p className="mb-0 trend-para">Ces frais seront à régler sur la plateforme</p>
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
                          <h4><a href="#">4- Convenez d’un lieu pour rencontrer le voyageur</a></h4>
                        </div>
                        <div className="trend-last-main">
                          <div className={`${styles['how-it-works-text']}`}>
                            <p className="mb-0 trend-para">Après avoir régler sur le site, remettez votre colis au voyageur. 
                              Durant la remise du colis, pensez bien :
                            </p>
                            <ul className={`${styles['how-it-works-ul']}`}>
                              <li>à vous prendre en photo avec le transporteur</li>
                              <li>à vérifier la pièce d’identité de celui à qui vous remettez le colis</li>
                              <li>confirmer la remise du colis au voyageur à notre équipe.</li>
                            </ul>
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
                          <h4><a href="#">1 - Trouve une demande d'expédition et fais une offre</a></h4>
                        </div>
                        <div className="trend-last-main">
                          <div className={`${styles['how-it-works-text']}`}>
                            <p className="mb-0 trend-para">Trouvez une demande d'expédition qui correspond à votre prochain voyage.
                              Faites une offre et proposez le montant que l'expéditeur vous paierait pour la livraison du colis.
                              Si vous ne trouvez aucune demande, enregistrez votre vol pour être mis en relation avec un futur expéditeur.</p><br /><br />
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
                          <h4><a href="#">2- Rencontrez l’expéditeur</a></h4>
                          <br/>
                        </div>
                        <div className="trend-last-main">
                          <div className={`${styles['how-it-works-text']}`}>
                            <p className="mb-0 trend-para">Une fois la transaction réglée, convenez d’un rdv pour récupérer le colis au voyageur. Durant le retrait du colis, pensez bien : 
                            </p>
                            <ul className={`${styles['how-it-works-ul']}`}>
                              <li>à vous prendre en photo avec l’expéditeur</li>
                              <li>à vérifier la pièce d’identité de celui à qui vous récupérez  le colis</li>
                              <li>confirmer le retrait du colis  à notre équipe.</li>
                            </ul>
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
                          <h4><a href="#">3 – Livrez le colis  au destinataire</a></h4>
                          <br/>
                        </div>
                        <div className="trend-last-main">
                          <div className={`${styles['how-it-works-text']}`}>
                            <p className="mb-0 trend-para">Une fois à destination, contactez le destinataire du colis pour le livrer le colis. 
                              Durant le retrait du colis, pensez bien à : 
                            </p>
                            <ul className={`${styles['how-it-works-ul']}`}>
                              <li>rendre une photo de vous avec ce dernier pour certifier la livraison</li>
                              <li>prendre une photo de la pièce d’identité du destinataire.</li>
                              <li>Récupérer le code qui vous donnera accès à votre paiement sur la plateforme</li>
                            </ul>
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
                          <h4><a href="#">4- Recevez votre paiement</a></h4>
                          <br/>
                        </div>
                        <div className="trend-last-main">
                          <div className={`${styles['how-it-works-text']}`}>
                            <p className="mb-0 trend-para">Une fois le code d’accès récupéré au destinataire du colis, Saisis le sur la plateforme et reçois le paiement sous 7 jrs ouvrables.</p><br /><br /><br /><br /><br /><br /><br /><br /><br />
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
                <h4 className="mb-0 pink">Notre promesse</h4>
                <h2 className="m-0">Fiers de vous proposer <span>Un service</span></h2>
                <p className="mb-0">Pour l’expéditeur c'est un moyen facile et serein de rester en contact avec ses proches.<br />
                  Pour le voyageur, vous vous faites facilement de l'argent en parcourant le monde.</p>
              </div>
              <div className="featured-us-box">
                <div className="row">
                  <div className="col-lg mb-4">
                    <div className="featured-us-item">
                      <div className="featured-us-icon bg-transparent d-inline">
                        <i className="fa fa-laugh-beam pink" />
                      </div>
                      <div className="featured-us-content w-100">
                        <h4 className="mb-1 text-uppercase"><a href="#">Pratique</a></h4>
                        <p className="mb-0">Trouvez rapidement et facilement un covalisage à proximité parmi les destinations proposées</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg mb-4">
                    <div className="featured-us-item">
                      <div className="featured-us-icon bg-transparent d-inline">
                        <i className="fa fa-hand-holding-usd pink" />
                      </div>
                      <div className="featured-us-content w-100">
                        <h4 className="mb-1 text-uppercase"><a href="#">Avec divers moyens de paiment</a></h4>
                        <p className="mb-0">Afin de vous faciliter la vie, nous acceptons divers moyens de paiements incluant Visa, MasterCard, Orange Money, Western Union d’autres options à venir</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg mb-4">
                    <div className="featured-us-item">
                      <div className="featured-us-icon bg-transparent d-inline">
                        <i className="fa fa-piggy-bank pink" />
                      </div>
                      <div className="featured-us-content w-100">
                        <h4 className="mb-1 text-uppercase"><a href="#">Economique</a></h4>
                        <p className="mb-0">Envoyez vos colis partout dans le monde à bas prix</p>
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
                        <h4 className="mb-1 text-uppercase"><a href="#">Communauté d'utilisateurs vérifiés</a></h4>
                        <p className="mb-0">INZULA c’est plus qu’une plateforme, c’est une communauté. Nous connaissons chacun de nos membres. Comment? Nous vérifions profils, avis, identité et billet d’avion. Vous savez ainsi avec qui vous échangez</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg mb-4">
                    <div className="featured-us-item">
                      <div className="featured-us-icon bg-transparent d-inline">
                        <i className="fa fa-shield-alt pink" />
                      </div>
                      <div className="featured-us-content w-100">
                        <h4 className="mb-1 text-uppercase"><a href="#">Sécurité</a></h4>
                        <p className="mb-0">Une assurance protection de vos biens est systématiquement proposé en fonction de la valeur déclarative des biens que vous souhaitez expédier</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg mb-4">
                    <div className="featured-us-item">
                      <div className="featured-us-icon bg-transparent d-inline">
                        <i className="fas fa-headset pink" />
                      </div>
                      <div className="featured-us-content w-100">
                        <h4 className="mb-1 text-uppercase"><a href="#">Un service client disponible</a></h4>
                        <p className="mb-0">Un numéro Whatsapp à votre disposition pour répondre à toutes vos questions sur nos services et vos transactions.</p>
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

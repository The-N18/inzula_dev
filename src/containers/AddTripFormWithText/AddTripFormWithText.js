import React from "react";

// import $ from "jquery";

import Slider from "react-slick";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { tripAddition, toggleCheck } from "../../store/actions/addTrip";
// import styles from './addtripformwithtext.css';
import {NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';
import { createNotif } from "../../store/actions/appConfig";
import {formValueSelector} from 'redux-form';
import { openLoginParentModal } from "../../store/actions/loginParentModal";
import {FormattedMessage} from 'react-intl'
import AddTripForm from "../../containers/AddTripFormRedux/AddTripForm";

import CountUp, {startAnimation} from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor';

// window.jQuery = $;

class AddTripFormWithText extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isVerified: false,
      didViewCountUp: false
    };

    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);

    this.onVisibilityChange = this.onVisibilityChange.bind(this);

  }



  onVisibilityChange = isVisible => {
    if (isVisible) {
      this.setState({didViewCountUp: true});
    }
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


  // state = {
  //   isVerified: false,
  // };


  submitForm = (val) => {
    const {userId, authenticated, trip_type_check} = this.props;
    const createdBy = {"user": userId};
    if(authenticated) {
      const departureLocation = val['departure_location'] ? val['departure_location']['pk'] : null;
      const destinationLocation = val['destination_location'] ? val['destination_location']['pk'] : null;
      const depdate = val['depart_date'];
      const cbdate = val['comeback_date'] ? val['comeback_date'] : '';
      this.props.addTrip(createdBy, departureLocation, destinationLocation, depdate, cbdate, trip_type_check);
    } else {
      this.props.createNotif("add_trip.login_msg", "Please login to add a new trip", NOTIFICATION_TYPE_WARNING);
      this.props.openLoginModal();
    }
  }

  handleDateTimeChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleOnClick = (item) => {
    this.props.history.push(item);
  };

  toggleCheck = (k) => {
    this.props.toggleCheck(this.props.trip_type_check);
  }

  componentDidMount() {
    this.props.toggleCheck("round_trip");

    console.log('IN COMPONENT DID MOUNT')

    // $.getScript('https://cdnjs.cloudflare.com/ajax/libs/Counter-Up/1.0.0/jquery.counterup.min.js', function(data, textStatus) {
    //   $('.value').counterUp({
    //     delay: 50,
    //     time: 1000
    // });
    // }) ;

    
  }


  render() {
    const { loading, userId, handleSubmit, pristine, reset, submitting, invalid, trip_type_check } = this.props;
    const { departure_location, destination_location, depart_date, comeback_date, trip_type } = this.state;

    const settings = {
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000
    };

    return (
      <div>
      <section className="about-us p-0">
        <div className="container">
          <div className="about-image-box">
            <div className="row">
              <br /><br /><br /><br /><br /><br />
            </div>
            <div className="row">
              <div className="col-lg-7 col-sm-12">
                <div className="about-content pt-9">
                  <h4 className="mb-1 blue font-weight-normal">Avec Inzula</h4>
                  <h2>Gagnez de l’argent à chaque fois que vous voyagez</h2>
                  <p className="mb-0">Identifiez-vous sur la plateforme pour accéder aux <strong>demandes d’expéditions correspondant</strong> à votre voyage.
                    Vous ne trouvez pas votre bonheur ? alors souscrivez votre voyage et vous serez mis en contact avec un expéditeur rapidement.</p>
                </div>
              </div>
              <div className="col-lg-5 col-sm-12">
                <AddTripForm />
              </div>
            </div>
          </div>
        </div>
      </section>


    {/* about-us starts */}
    <section className="about-us pb-0" style={{backgroundImage: 'url(images/travels/transporterbg.png)'}}>
      <div className="container">
        <div className="about-image-box">
          <div className="row">
            <div className="col-lg-7 col-sm-12">
              <div className="about-content">
                {/*<h4 class="mb-1 white font-weight-normal">Comment ça marche ?</h4>*/}
                <a href="#" className="per-btn">
                  <span className="white">Comment ca marche</span><i className="fa fa-arrow-right white" />
                </a><br /><br />
                <h2 className="white">Gagnez du temps ! Vérifiez les demandes d’expéditions disponibles sur le site.</h2>
                <p className="mb-2 white">Ajoutez les détails de votre voyage ci-dessous pour accéder aux demandes d’expédition disponibles</p>
                <br /><br /><br /><br />
              </div>
            </div>
            {/*<div class="col-lg-5 col-sm-12">
                    <div class="about-image-desti mt-5">
                        <img src="images/howitworks/transporteur1.png" alt="">
                    </div>*/}
          </div>
        </div>
      </div>
      <div className="overlay" />
    </section>
    {/* about-us ends */}
    {/* form main starts */}
    <div className="form-main">
      <div className="container">
        <div className="form-content w-100"> 
          <h3 className="form-title text-center d-inline white">Trouvez un colis à expédier</h3>
          <div className="d-lg-flex align-items-center justify-content-between">
            <div className="form-group pr-4 m-0">
              <div className="input-box">
                <i className="fa fa-map-marker" />
                <select className="niceSelect">
                  <option value={1}>Lieu de départ</option>
                  <option value={2}>Argentina</option>
                  <option value={3}>Belgium</option>
                  <option value={4}>Canada</option>
                  <option value={5}>Denmark</option>
                </select>
              </div>                            
            </div>
            <div className="form-group pr-4 m-0">
              <div className="input-box">
                <i className="fa fa-map-marker" />
                <select className="niceSelect">
                  <option value={1}>Lieu d'arrivée</option>
                  <option value={2}>Argentina</option>
                  <option value={3}>Belgium</option>
                  <option value={4}>Canada</option>
                  <option value={5}>Denmark</option>
                </select>
              </div>                            
            </div>
            <div className="form-group pr-4 m-0">
              <div className="input-box">
                <i className="fa fa-calendar" />
                <input id="date-range1" type="text" placeholder="Date du voyage" />
              </div>                            
            </div>
            <div className="form-group m-0">
              <a href="#" className="nir-btn w-100"><i className="fa fa-search" /> Rechercher</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* form main ends */}
    {/* why us starts */}
    <section className="why-us bg-grey pt-10 pb-6">
      <div className="container">
        <div className="why-us-box pt-9">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="why-us-item text-center">
                <div className="why-us-icon mb-2">
                  <i className="far fa-thumbs-up pink" />
                </div>
                <div className="why-us-content">
                  <h4><a href="#">Paiement garantie</a></h4>
                  <p className="mb-0">Les expéditeurs règlent sur la plateforme dès accord sur votre commission</p><br />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="why-us-item text-center">
                <div className="why-us-icon mb-2">
                  <i className="fas fa-money-bill-wave pink" />
                </div>
                <div className="why-us-content">
                  <h4><a href="#">Paiement disponible</a></h4>
                  <p className="mb-0">Le paiement est disponible sous 3 à 10 jours ouvrables suivant la confirmation de livraison sur la plateforme </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="why-us-item text-center">
                <div className="why-us-icon mb-2">
                  <i className="fab fa-creative-commons-nc-eu pink" />
                </div>
                <div className="why-us-content">
                  <h4><a href="#">Aucun frais</a></h4>
                  <p className="mb-0">Il n’y a aucun frais pour les voyageurs utilisant INZULA – uniquement des gains</p><br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* why us ends */}
    {/* place to visit starts */}
    <section className="top-deals pt-9">
      <div className="container">
        <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
          <h2 className="m-0">Trouvez votre prochaine destination et <span>financez votre voyage</span></h2>
          <p className="mb-0">Besoin d’inspiration pour votre prochaine destination ? Voyager nous aide à appréhender le sens de la vie  et à devenir de meilleures personnes. N’hésitez pas à lire  les articles pour trouver vos prochaines destinations.</p>
        </div>

        <Slider {...settings} className="row team-slider">
          {/* <div className="row team-slider">  */}
          <div className="slider-item">
            <div className="slider-image">
              <img src="images/travels/cameroun1.png" alt="image" />
            </div>
            <div className="slider-content">
              <h6 className="font-weight-normal"><i className="fa fa-map-marker-alt" /> Cameroun</h6>
              <h4><a href="#">Oveng Lodge</a></h4>
              <p>A 1h30 de la capitale de Yaoundé, Oveng Lodge est l'endroit idéal pour vous ressourcer en immersion dans la forêt équatoriale, à l’abri de l'effervescence de la capitale.</p>
              {/* <div class="deal-price">
                        <p class="price font-weight-bold pink mb-0">From <span>$250.00</span></p>
                    </div> */}
            </div>
          </div>
          <div className="slider-item">
            <div className="slider-image">
              <img src="images/travels/rwanda1.png" alt="image" />
            </div>
            <div className="slider-content">
              <h6 className="font-weight-normal"><i className="fa fa-map-marker-alt" /> Rwanda</h6>
              <h4><a href="#">Karongi</a></h4>
              <p>C'est un endroit où on peut s’évader et être apaisé, en contemplant les oiseaux ou les couleurs changeantes sur le lac alors que le soleil se couche de l'autre côté.</p><br />
              {/* <div class="deal-price">
                        <p class="price font-weight-bold pink mb-0">From <span>$250.00</span></p>
                    </div> */}
            </div>
          </div>
          <div className="slider-item">
            <div className="slider-image">
              <img src="images/travels/ghana1.png" alt="image" />
            </div>
            <div className="slider-content">
              <h6 className="font-weight-normal"><i className="fa fa-map-marker-alt" /> Ghana</h6>
              <h4><a href="#">WLI Waterfalls</a></h4>
              <p>Les cascades de Wli sont la plus haute chute d'eau d'Afrique de l'Ouest. Elles sont situées dans la municipalité Hohoe de la région de la Volta, à environ 280 kilomètres de la capitale Accra</p>
              {/* <div class="deal-price">
                        <p class="price font-weight-bold pink mb-0">From <span>$250.00</span></p>
                    </div> */}
            </div>
          </div>
          <div className="slider-item">
            <div className="slider-image">
              <img src="images/travels/senegal1.png" alt="image" />
            </div>
            <div className="slider-content">
              <h6 className="font-weight-normal"><i className="fa fa-map-marker-alt" /> Senegal</h6>
              <h4><a href="#">Lac rose</a></h4>
              <p>Le lac Rose, de son vrai nom lac Retba, est l'un des sites les plus visités du Sénégal. Il est situé à 35 km au Nord-Est de Dakar et sa visite en vaut le détour.</p><br />
              {/* <div class="deal-price">
                        <p class="price font-weight-bold pink mb-0">From <span>$250.00</span></p>
                    </div> */}
            </div>
          </div>
          <div className="slider-item">
            <div className="slider-image">
              <img src="images/travels/namibie1.png" alt="image" />
            </div>
            <div className="slider-content">
              <h6 className="font-weight-normal"><i className="fa fa-map-marker-alt" /> Namibie</h6>
              <h4><a href="#">Grand Canyon</a></h4>
              <p>2ème plus grand Canyon du monde après son homologue américain, le Fish River Canyon désigne à la fois une rivière longue de 800 km et un canyon de 160 km de long – A visiter de toute urgence donc</p>
              {/* <div class="deal-price">
                        <p class="price font-weight-bold pink mb-0">From <span>$250.00</span></p>
                    </div> */}
            </div>
          </div>
        {/* </div>  */}
        </Slider>

      </div>
    </section>
    {/* place to visit ends */}
    {/* why us starts */}
    <section className="featured-us bg-grey pb-6">
      <div className="container">
        <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
          <h4 className="mb-0 pink">Comment ca marche</h4>
          <h2 className="m-0">Comment <span>gagner de l’argent en voyageant ?</span></h2>
          <p className="mb-0">Voyager nous aide à appréhender le sens de la vie  et à devenir de meilleures personnes. </p>
        </div>
        <div className="featured-us-box">
          <div className="row">
            <div className="col-lg mb-4">
              <div className="featured-us-item">
                <div className="featured-us-icon bg-transparent d-inline">
                  <i className="fas fa-plane-departure pink" />
                </div>
                <div className="featured-us-content w-100">
                  <h4 className="mb-1 text-uppercase"><a href="#">Ajoutez un voyage</a></h4>
                  <p className="mb-0"><br />Vérifiez d’abord s’il y a une demande d’expédition correspondant à votre voyage – Si tel n’est pas le cas alors ajoutez votre voyage pour être informé des prochaines demandes</p>
                </div>
              </div>
            </div>
            <div className="col-lg mb-4">
              <div className="featured-us-item">
                <div className="featured-us-icon bg-transparent d-inline">
                  <i className="fas fa-comments-dollar pink" />
                </div>
                <div className="featured-us-content w-100">
                  <h4 className="mb-1 text-uppercase"><a href="#">Faites des propositions de transport</a></h4>
                  <p className="mb-0">Définissez avec les expéditeurs les montants de commission de transport qui vous conviennent</p>
                </div>
              </div>
            </div>
            <div className="col-lg mb-4">
              <div className="featured-us-item">
                <div className="featured-us-icon bg-transparent d-inline">
                  <i className="fas fa-people-carry pink" />
                </div>
                <div className="featured-us-content w-100">
                  <h4 className="mb-1 text-uppercase"><a href="#">Récupérez le colis</a></h4>
                  <p className="mb-0"><br />Convenez d’un Rdv avec l’expéditeur et récupérez le colis à expédier – pensez à bien confirmer à la plateforme la réception</p>
                </div>
              </div>
            </div>
            <div className="col-lg mb-4">
              <div className="featured-us-item">
                <div className="featured-us-icon bg-transparent d-inline">
                  <i className="fas fa-wallet pink" />
                </div>
                <div className="featured-us-content w-100">
                  <h4 className="mb-1 text-uppercase"><a href="#">Livrez le colis et faites vous payer</a></h4>
                  <p className="mb-0">Rencontrez le destinataire du colis -  livrez le colis et récupérez le code d’accès qui vous permettra de vous faire payer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* why us ends */}
    <div className="container">
      <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
        <br />
        <h2 className="m-0">Rejoignez notre  <span>Grande communauté</span></h2>
        <p className="mb-0">Nous sommes présents sur plusieurs réseaux sociaux – rejoignez nous sur celui de votre choix</p>
      </div></div>
    {/* Counter */}
    <section className="counter-main pt-0 pb-6">
      <div className="container">
        <div className="counter text-center">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
              <div className="counter-item bg-pink">
                <a href="https://www.facebook.com/Inzula.pro" target="_blank"><i className="fab fa-facebook-f white mb-1" /></a>
                <h3 className="value mb-0 white">
                <VisibilitySensor onChange={this.onVisibilityChange} offset={{
                  top:
                    10
                }} delayedCall>
                  <CountUp start={0} end={this.state.didViewCountUp ? 561 : 0} duration={2} />
                </VisibilitySensor>
                </h3>
                <h4 className="m-0 white">Heureux Inzula’s peps</h4>
              </div>    
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
              <div className="counter-item bg-pink">
                <a href="https://wa.me/message/XC3A55H7FC4TL1 " target="_blank"><i className="fab fa-whatsapp white mb-1" /></a>
                <h3 className="value mb-0 white">
                  <CountUp start={0} end={this.state.didViewCountUp ? 250 : 0} duration={2} />
                </h3>
                <h4 className="m-0 white">Incroyables whatsapeurs</h4>
              </div>    
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
              <div className="counter-item bg-pink">
                <a href="https://www.instagram.com/inzula.pro/" target="_blank"><i className="fab fa-instagram white mb-1" /></a>
                <h3 className="value mb-0 white">
                  <CountUp start={0} end={this.state.didViewCountUp ? 103 : 0} duration={2} />
                </h3>
                <h4 className="m-0 white">Au courant en temps réel</h4>
              </div>    
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
              <div className="counter-item bg-pink">
                <a href="https://www.linkedin.com/company/inzula" target="_blank"><i className="fab fa-linkedin-in white mb-1" /></a>
                <h3 className="value mb-0 white">
                  <CountUp start={0} end={this.state.didViewCountUp ? 76 : 0} duration={2} />
                </h3>
                <h4 className="m-0 white">D’un fort soutien </h4>
              </div>    
            </div>
          </div>
        </div> 
      </div>
    </section>
    {/* End Counter */}
    {/* footer starts */}
    <footer className="pt-10 bubbles footermain">
      <div className="footer-upper pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-4">
              <div className="footer-about bg-white p-4">
                <img src="images/inzula_fr.png" alt="" />
                <p className="mt-3">
                  Plate-forme digitale et collaborative mettant en relation des expéditeurs de colis avec des voyageurs souhaitant amortir leurs frais de voyages via leurs kgs disponibles!
                </p>
                <ul>
                  <li><strong>Whatsapp:</strong> +33 7 82 29 45 91</li>
                  <li><strong>Email:</strong> inzula.pro@gmail.com</li>
                  <li><strong>Website:</strong> www.inzula.app</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12 col-xs-12 mb-4">
              <div className="footer-links">
                <h4 className="white">Entreprise</h4>
                <ul>
                  <li><a href="about-us.html">Qui sommes nous?</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Informations legales</a></li>
                  <li><a href="#">Contactez-nous</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12 col-xs-12 mb-4">
              <div className="footer-links">
                <h4 className="white">Services</h4>
                <ul>
                  <li><a href="#">Comment ça marche?</a></li>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">Assurance</a></li>
                  <li><a href="#">Charte de bonne conduite</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-4">
              <div className="footer-links">
                <h4 className="white">Newsletter</h4>
                <p>Pour rester informé de notre actualité, souscrivez votre email ci-dessous.</p>
                <div className="newsletter-form">
                  <form>
                    <input type="email" placeholder="Saisissez votre email" />
                    <input type="submit" className="nir-btn mt-2 w-100" defaultValue="Souscrire" />
                  </form>
                </div> 
              </div>     
            </div>
          </div>
        </div>
      </div>
      <div className="footer-payment">
        <div className="container">
          <div className="footer-pay d-md-flex align-items-center justify-content-between pt-2 pb-2">
            <div className="footer-payment-nav">
              <ul className="d-md-flex align-items-center">
                <li className="mr-2">Nous acceptons:</li>
                <li className="mr-2"><i className="fab fa-cc-mastercard" /></li>
                <li className="mr-2"><i className="fab fa-cc-paypal" /></li>
                <li className="mr-2"><i className="fab fa-cc-visa" /></li>
                <li className="mr-2"><i className="fas fa-wallet" /></li>
              </ul>
            </div>
            {/*<div class="footer-payment-nav mb-0">
                    <ul>
                        <li>
                            <select>
                                <option>Franc CFA</option>
                                <option>Euros</option>                                
                                <option>Dollars</option>
                                <option>Pounds</option>
                                <option>Franc Suisse</option>
                            </select>
                        </li>
                        <li>
                            <select>
                                <option>$ FCFA</option>
                                <option>$ EUR</option>
                                <option>$ USD</option>
                                <option>$ GBP</option>
                                <option>$ CHF</option>
                            </select>
                        </li>
                    </ul>
                </div>*/}
          </div>    
        </div>
      </div>
      <div className="footer-copyright pt-2 pb-2">
        <div className="container">
          <div className="copyright-inner d-md-flex align-items-center justify-content-between">
            <div className="copyright-text">
              <p className="m-0 white">2021 INZULA. All rights reserved.</p>
            </div>
            <div className="social-links">
              <ul>  
                <li><a href="https://www.facebook.com/Inzula.pro" target="_blank"><i className="fab fa-facebook" aria-hidden="true" /></a></li>
                <li><a href="https://wa.me/message/XC3A55H7FC4TL1" target="_blank"><i className="fab fa-whatsapp" aria-hidden="true" /></a></li>
                <li><a href="https://www.instagram.com/inzula.pro/" target="_blank"><i className="fab fa-instagram" aria-hidden="true" /></a></li>
                <li><a href="https://www.linkedin.com/company/inzula" target="_blank"><i className="fab fa-linkedin" aria-hidden="true" /></a></li>
              </ul>
            </div>
          </div>    
        </div>
      </div>
    </footer>
    {/* footer ends */}
    {/* Back to top start */}
    <div id="back-to-top">
      <a href="#" />
    </div>
    {/* Back to top ends */}
    {/* Register Modal */}
    <div className="modal fade" id="register" tabIndex={-1} role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header bordernone p-0">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body p-0">
            <div className="login-content p-4 text-center">
              <div className="login-title section-border">
                <h3 className="pink mb-1">Inscrivez vous sur Inzula</h3>  
                <p>Et rejoignez notre communauté</p>                  
              </div>
              <div className="login-form text-center">
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Prénom" />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Nom" />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Adresse mail" />
                  </div>
                  <div className="form-group">
                    <input type="password" placeholder="Mot de passe" />
                  </div>
                  <div className="form-group">
                    <input type="password" placeholder="Confirmation mot de passe" />
                  </div>
                  <div className="input-box">
                    <select className="niceSelect">
                      <option value={1}>Profil par défaut</option>
                      <option value={2}>Expéditeur</option>
                      <option value={3}>Transporteur</option>
                    </select>
                  </div><br />                            
                </form>
                <div className="form-btn">
                  <a href="#" className="nir-btn">Inscrivez-vous</a>
                </div>
                <div className="form-group mb-0 form-checkbox mt-3">
                  <input type="checkbox" /> J'ai lu et je m'engage à respecter les<a href="#" className style={{color: '#a10115'}}> règles de bienveillance</a> du site et j'accepte l'utilisation des cookies
                </div>
              </div>
              <div className="login-social border-t mt-3 pt-2 mb-3">
                <p className="mb-2">Ou continuer avec</p>
                <a href="#" className="btn-facebook"><i className="fab fa-facebook" aria-hidden="true" /> Facebook</a>
                <a href="#" className="btn-google"><i className="fab fa-google" aria-hidden="true" /> Google</a>
              </div>
              <div className="sign-up">
                <p className="m-0">Vous avez déjà un compte? <a href="login.html" className="pink">Se connecter</a></p>
              </div>                
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* login Modal */}
    <div className="modal fade" id="login" tabIndex={-1} role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header bordernone p-0">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body p-0">
            <div className="login-content p-4 text-center">
              <div className="login-title section-border">
                <h3 className="pink">Se connecter</h3>                    
              </div>
              <div className="login-form">
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Saisir nom d'utilisateur" />
                  </div>
                  <div className="form-group">
                    <input type="password" placeholder="Saisir mot de passe" />
                  </div>
                </form>
                <div className="form-btn">
                  <a href="#" className="nir-btn">CONNEXION</a>
                </div>
                <div className="form-group mb-0 form-checkbox mt-3">
                  <input type="checkbox" /> Se souvenir de moi | <a href="#" className>Mot de passe oublié ?</a>
                </div>
              </div>
              <div className="login-social border-t mt-3 pt-2 mb-3">
                <p className="mb-2">Ou continuer avec</p>
                <a href="#" className="btn-facebook"><i className="fab fa-facebook" aria-hidden="true" /> Facebook</a>
                <a href="#" className="btn-google"><i className="fab fa-google" aria-hidden="true" /> Google</a>
              </div>
              <div className="sign-up">
                <p className="m-0">Vous n'avez pas de compte? <a href="login.html" className="pink">S'inscrire</a></p>
              </div>                
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

    );
  }
}

const selector = formValueSelector('add_trip')

const mapStateToProps = state => {
  const trip_type = selector(state, 'trip_type')
  const depart_date = selector(state, 'depart_date')
  return {
    loading: state.addTrip.loading,
    error: state.addTrip.error,
    trip_type_check: state.addTrip.trip_type_check,
    token: state.auth.token,
    userId: state.userInfo.userId,
    userProfileId: state.userInfo.userProfileId,
    username: state.userInfo.username,
    authenticated: state.auth.token !== null,
    trip_type: trip_type,
    depart_date: depart_date,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTrip: (created_by, departure_location, destination_location, depart_date, comeback_date, trip_type) => dispatch(tripAddition(created_by, departure_location, destination_location, depart_date, comeback_date, trip_type)),
    openLoginModal: () => dispatch(openLoginParentModal()),
    createNotif: (key, default_text, type) => dispatch(createNotif(key, default_text, type)),
    toggleCheck: (trip_type) => dispatch(toggleCheck(trip_type)),
  };
};

// export default withRouter(
// connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AddTripForm)
// );

// let AddTripFormConnected = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AddTripForm);
//
// AddTripFormConnected = reduxForm ({
//   form: 'add_trip',
//   validate
// }) (AddTripFormConnected);
//
// export default AddTripFormConnected;


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTripFormWithText));

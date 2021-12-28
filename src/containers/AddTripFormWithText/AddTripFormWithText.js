import React from "react";

import Slider from "react-slick";

import { withRouter } from "react-router-dom";
// import styles from './addtripformwithtext.css';

// import "../../bootstrap.min.css";

import {FormattedMessage} from 'react-intl'
import AddTripForm from "../../containers/AddTripFormRedux/AddTripForm";

import SearchBookingRequestsForm from "../../containers/SearchBookingRequestsReduxForm/SearchBookingRequestsForm";

import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor';
import Counters from "../Counters/Counters";


class AddTripFormWithText extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      didViewCountUp: false
    };

    this.onVisibilityChange = this.onVisibilityChange.bind(this);

  }



  onVisibilityChange = isVisible => {
    if (isVisible) {
      this.setState({didViewCountUp: true});
    }
  }


  render() {

    const settings = {
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000
    };

    return (
      <React.Fragment>
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

      <SearchBookingRequestsForm inNewPage={false}/>
      
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
      <Counters/>
    </React.Fragment>

    );
  }
}


export default withRouter(AddTripFormWithText);

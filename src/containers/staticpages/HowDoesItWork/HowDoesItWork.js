import React from "react";

import { withRouter } from "react-router-dom";
// import styles from './howdoesitwork.module.css';


import {FormattedMessage} from 'react-intl'

import Counters from "../../Counters/Counters";
import $ from "jquery";


class HowDoesItWork extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      
    };


  }

  componentDidMount(){
    $(window).scrollTop(0);

  }




  render() {

    return (
      <React.Fragment>

        {/* section 1 starts */}
        {/* banner starts */}
        <section className="banner overflow-hidden" style={{backgroundImage: 'url(/static/images/howitworks/howItWorks1.png)'}}>
          <div className="banner-main">
            <div className="banner-image" style={{backgroundImage: 'url(/static/images/howitworks/howItWorks1.svg)'}} />
            <div className="banner-content">
              <h1 className="white mb-2">Avec INZULA, la sérénité et la facilité à garder le contact avec vos proches!</h1>
              <p className="white mb-4">Soyez à votre aise et serein en expédiant avec nous !!</p>
              <br /><br /><br /><br />
            </div>
          </div>
          {/*<div class="overlay"></div>*/}
        </section>
        {/* banner ends */}
        {/* section 1 ends */}
        {/* section 2 starts */}
        <section className=" call-to-action call-to-action1 pb-6 pt-10" style={{backgroundImage: 'url(/static/images/slider/12.jpg)'}}>
          <div className="call-main">
            <div className="container">
              <div className="row d-flex align-items-center justify-content-between">
                <div className="col-lg-6 mb-4">
                  <div className="video-button">
                    {/*<div class="call-button text-center">*/}
                    <video width="100%" controls>
                      <source src="/static/images/howitworks/HowToShipFR.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <div className="video-figure" />
                </div>  
                {/*<div class="play-btn js-video-button"><br><br><br>

                            <img src="images/slider/10.jpg" alt=""> 
							<!--<iframe width="720" height="405" src="images/howitworks/HowToShip.mp4" title="How to ship?" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>*/}
                {/* <div class="call-button text-center"><br><br><br>
                                <button type="button" class="play-btn js-video-button" data-video-id="Ul5v0NPsfa0" data-channel="youtube">
                                    <i class="fa fa-play"></i>
                                </button>

                            </div>*/}
                {/*<div class="video-figure"></div> </div>*/}
                <div className="col-lg-6 mb-4 col-sm-12">
                  <div className="action-content"><br /><br /><br /><br />
                    <h4 className="mb-1 blue font-weight-normal">Comment expédier avec INZULA ?</h4>
                    <p><span className="pink"> <strong>1 Initier une demande d’expédition </strong></span></p>
                    <p>Saisis les détails du colis que tu souhaites expédier à ton proche</p>
                    <p><span className="pink"> <strong>2 Reçois des propositions de livraison de voyageurs</strong></span></p>
                    <p>Les voyageurs d’Inzula se rendant dans votre ville feront des offres pour livrer votre colis. Sélectionnez l'offre qui vous convient.</p>
                    <p><span className="pink"> <strong>3 Réglez vos envois en toute sécurité</strong></span></p>
                    <p>Choisis l'offre qui te convient pour le transport et règle sur la plateforme utilisant avec le mode de paiement sécurisé INZULA. Votre paiement est garanti par INZULA jusqu'à ce que ton colis soit reçu par ton destinataire</p>
                    <p><span className="pink"> <strong>4 Livre ton colis au voyageur</strong></span></p>
                    <p>Prends rendez-vous avec le voyageur et livre-lui ton colis</p>						
                    <br /><a onClick={()=>{this.props.history.push('/')}} className="nir-btn-black">Expédier maintenant <i className="fa fa-arrow-right white pl-1" /></a>
                  </div> 
                </div>                       					
              </div>
            </div>   
          </div>
        </section>
        {/* section 2 ends */}
        {/* section 3 starts */}
        <section className=" call-to-action call-to-action1 pb-6 pt-10" style={{backgroundImage: 'url(/static/images/slider/12.jpg)'}}>
          <div className="call-main">
            <div className="container">
              <div className="row d-flex align-items-center justify-content-between">
                <div className="col-lg-6 mb-4">
                  <div className="video-button">
                    <video width="100%" controls>
                      <source src="/static/images/howitworks/HowtoTravelFR.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <div className="video-figure" />
                </div>
                <div className="col-lg-6 mb-4 col-sm-12">
                  <div className="action-content"><br /><br /><br /><br />
                    <h4 className="mb-1 blue font-weight-normal">Comment voyager et se faire de l’argent avec INZULA?</h4>
                    <p><span className="pink"> <strong>1 Ajouter votre voyage </strong></span></p>
                    <p>Créer un voyage depuis votre profil</p>
                    <p><span className="pink"> <strong>2 Fixez un RDV avec l'expédieur et récupérez le colis</strong></span></p>
                    <p>Une fois le lieu de rdv (lieu public) choisi, rencontrez l'expéditeur à la date prévue</p>
                    <p><span className="pink"> <strong>3 Faites des offres de transport</strong></span></p>
                    <p>Faites des offres de transport</p>
                    <p><span className="pink"> <strong>4 Livrez le paquet et soyez payé</strong></span></p>
                    <p>Prendre le vol vers la destination et remettre le colis sur place au destinataire</p>						
                    <br /><a onClick={()=>{this.props.history.push('/transport')}} className="nir-btn-black">Voyager maintenant <i className="fa fa-arrow-right white pl-1" /></a>
                  </div> 
                </div> 
              </div>
            </div>   
          </div>
        </section>
        {/* section 3 ends */}
        {/* Our gurantee starts */}
        <section className="featured-us bg-grey pb-6">
          <div className="container">
            <div className="section-title text-center mb-5 pb-2 w-50 mx-auto">
              <h2 className="m-0">Comment le <span>paiement</span> fonctionne</h2>
            </div>
            <div className="featured-us-box">
              <div className="row">
                <div className="col-lg mb-4">
                  <div className="featured-us-item">
                    <div className="featured-us-icon bg-transparent d-inline">
                      <i className="far fa-credit-card pink" />
                    </div>
                    <div className="featured-us-content w-100">
                      <h4 className="mb-1 text-uppercase"><a href="#">L'expéditeur effectuera le paiement sur la plateforme</a></h4>
                      <p className="mb-0">Lorsque l'expéditeur émet une demande d'envoi de colis et valide la commission de livraison du voyageur, il effectuera le paiement lié à la transaction sur la plateforme. INZULA mettra alors le paiement en attente et ne le restituera au voyageur que lorsque l'article sera livré</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg mb-4">
                  <div className="featured-us-item">
                    <div className="featured-us-icon bg-transparent d-inline">
                      <i className="fa fa-hand-holding-usd pink" />
                    </div>
                    <div className="featured-us-content w-100">
                      <h4 className="mb-1 text-uppercase"><a href="#">Livraison du colis expéditeurs - voyageurs dans un lieu public</a></h4>
                      <p className="mb-0">Les deux conviendront de se rencontrer dans un lieu public pour la livraison du colis. L'expéditeur confirmera la livraison du colis à l'équipe INZULA</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg mb-4">
                  <div className="featured-us-item">
                    <div className="featured-us-icon bg-transparent d-inline">
                      <i className="fas fa-plane pink" />
                    </div>
                    <div className="featured-us-content w-100">
                      <h4 className="mb-1 text-uppercase"><a href="#">Le voyageur recevra du destinataire son code de paiement</a></h4>
                      <p className="mb-0">Une fois dans le pays de destination, le voyageur et le destinataire du colis prendront contact pour la livraison du colis. Le voyageur recevra du destinataire, le code de paiement à enregistrer sur la plateforme pour obtenir son paiement.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg mb-4">
                  <div className="featured-us-item">
                    <div className="featured-us-icon bg-transparent d-inline">
                      <i className="fa fa-user-check pink" />
                    </div>
                    <div className="featured-us-content w-100">
                      <h4 className="mb-1 text-uppercase"><a href="#">Le paiement est libéré dans un délai de 3 à 10 jours ouvrables.</a></h4>
                      <p className="mb-0">Le voyageur enregistre son code de paiement sur la plateforme et le paiement est effectué sous 3 à 10 jours ouvrés sur son compte.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Our gurantee ends */}
        
        {/* Counter */}
        <Counters/>
        {/* End Counter */}
        
      </React.Fragment>

    );
  }
}


export default withRouter(HowDoesItWork);

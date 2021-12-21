import React from "react";
import {
  Grid,
  Segment,
  Icon,
  List,
  Divider,
  Container,
  Image
} from "semantic-ui-react";
import { connect } from "react-redux";
import { backend_url } from "../../configurations";
import { withRouter } from "react-router-dom";
import {FormattedMessage} from 'react-intl'


class Footer extends React.Component {

  handleOnTermsClick = () => {
    this.props.history.push("/terms");
  }

  handleOnUserAgreementClick = () => {
    this.props.history.push("/useragreement");
  }

  handleOnFaqsClick = () => {
    this.props.history.push("/faqs");
  }

  handleOnInsuranceClick = () => {
    this.props.history.push("/insurance");
  }

  handleOnLegalInformationClick = () => {
    this.props.history.push("/legal");
  }

  handleOnTransparencyClick = () => {
    this.props.history.push("/transparency");
  }

  render() {
    return (
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
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer));

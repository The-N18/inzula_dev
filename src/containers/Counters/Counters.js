import React from "react";
import { withRouter } from "react-router-dom";
// import styles from './counters.css';

import {FormattedMessage} from 'react-intl'

import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor';


class Counters extends React.Component {

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


    return (
      <React.Fragment>
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
      </React.Fragment>

    );
  }
}


export default withRouter(Counters);

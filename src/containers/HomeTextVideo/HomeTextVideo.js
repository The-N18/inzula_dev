import React from "react";
import {
  Button,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './hometextvideo.css';
import ReactPlayer from 'react-player'
import { withRouter } from "react-router-dom";
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-scroll';

class HomeTextVideo extends React.Component {

  handleOnClick = (item) => this.props.history.push(item);

  render() {
    const {lang} = this.props;
    return (

      <section className=" call-to-action call-to-action1 pb-6 pt-10" style={{backgroundImage: 'url(images/slider/12.jpg)'}}>
        <div className="call-main">
          <div className="container">
            <div className="row d-flex align-items-center justify-content-between">
              <div className="col-lg-6 mb-4 col-sm-12">
                <div className="action-content"><br /><br /><br /><br />
                  <h4 className="mb-1 blue font-weight-normal">
                    <FormattedMessage
                      id="home_text_video.with_inzula"
                      defaultMessage="With Inzula"
                    />
                  </h4>
                  <h2>
                    <FormattedMessage
                      id="home_text_video.your_copacking"
                      defaultMessage=""
                    />
                  </h2>
                  <p className="mb-3">
                    <FormattedMessage
                      id="home_text_video.send_parcels"
                      values={{ strong: (value) => <strong>{value}<br/></strong>}}
                      defaultMessage=""
                    />
                  </p>
                  <Link to="search_trips_section" spy={true} smooth={true}>
                    <a  className="nir-btn" style={{margin: '0.5rem'}}>
                      <FormattedMessage
                        id="home_text_video.ship_now"
                        defaultMessage=""
                      />
                    </a>
                  </Link>
                  <a  onClick={this.handleOnClick.bind(this, '/transport')} className="nir-btn" style={{margin: '0.5rem'}}>
                   <FormattedMessage
                      id="home_text_video.earn_money"
                      defaultMessage=""
                    />
                  </a>
                </div> 
              </div>
              <div className="col-lg-6 mb-4">
                <div className="video-button"><br /><br /><br /> 
                  {/*<img src="images/slider/10.jpg" alt=""> */}
                  <iframe width={720} height={405} src="https://www.youtube.com/embed/Ul5v0NPsfa0" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  {/* <div class="call-button text-center"><br><br><br>
                              <button type="button" class="play-btn js-video-button" data-video-id="Ul5v0NPsfa0" data-channel="youtube">
                                  <i class="fa fa-play"></i>
                              </button>

                          </div>*/}
                  <div className="video-figure" />
                </div> 
              </div>
            </div>   
          </div>
        </div>
        {/*<div class="dot-overlay"></div>*/}
      </section>

    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.appConfig.lang
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeTextVideo)
);

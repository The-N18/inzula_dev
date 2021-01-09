import React from "react";
import {
  Button,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './hometextvideo.css';
import ReactPlayer from 'react-player'
import { withRouter } from "react-router-dom";
import {FormattedMessage} from 'react-intl'


class HomeTextVideo extends React.Component {

  handleOnClick = (item) => this.props.history.push(item);

  render() {
    const {lang} = this.props;
    return (
      <Segment style={{ padding: "2em 0em" }} vertical>
        <Segment basic className={"home-text-video-section"}>
        <Grid verticalAlign="middle">
          <Grid.Row verticalAlign="middle" className={"add-trip-grid"}>
            <Grid.Column  mobile={16} tablet={16} computer={8} textAlign="center" verticalAlign="middle" className={"add-trip-grid-column"}>
              <Segment basic>
              <Header as="h1" textAlign="center">
              <FormattedMessage
                id="home_text_video.send_parcels"
                defaultMessage="Send parcels to your loved ones, via contacts in your network"
              />

              </Header>
              <Header textAlign="center">
              <FormattedMessage
                id="home_text_video.inzula_use"
                defaultMessage="INZULA connects travelers with kgs available and people in their network wanting to ship at low cost"
              />
              </Header>
              <Button
                size="small"
                className={"buttoncolor homevideo-button"}
                onClick={this.handleOnClick.bind(this, '/transport')}
              >
              <FormattedMessage
                id="home_text_video.earn_money"
                defaultMessage="Earn money while travelling"
              />
              </Button>
              <Button
                size="small"
                className={"buttoncolor homevideo-button"}
                onClick={this.handleOnClick.bind(this, '/dispatch')}
              >
              <FormattedMessage
                id="home_text_video.ship_now"
                defaultMessage="Ship items now"
              />
              </Button>
              </Segment>
            </Grid.Column>
            <Grid.Column  mobile={16} tablet={16} computer={8}>
              <div className={"player-wrapper"}>
                <ReactPlayer
                  url={lang === 'fr' ? 'https://www.youtube.com/watch?v=Ul5v0NPsfa0' : 'https://www.youtube.com/watch?v=gubjwSynppo'}
                  loop={true}
                  playing={false}
                  pip={true}
                  controls={true}
                  width='100%'
                  height='100%'
                  className={"react-player"} />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Segment>
      </Segment>
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

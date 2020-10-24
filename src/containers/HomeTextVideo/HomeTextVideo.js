import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Select,
  Icon,
  Card,
  List,
  Divider,
  Container,
  Image
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styles from './hometextvideo.css';
import { backend_url } from "../../configurations";
import ReactPlayer from 'react-player'


class HomeTextVideo extends React.Component {

  render() {
    return (
      <Segment style={{ padding: "2em 0em" }} vertical>
        <Segment basic className={"home-text-video-section"}>
        <Grid verticalAlign="middle">
          <Grid.Row verticalAlign="middle" className={"add-trip-grid"}>
            <Grid.Column  mobile={16} tablet={16} computer={8} textAlign="center" verticalAlign="middle" className={"add-trip-grid-column"}>
              <Segment basic>
              <Header as="h1" textAlign="center">
                Send parcels to your loved ones, via contacts in your network
              </Header>
              <Header textAlign="center">
                INZULA connects travelers with kgs available and people in their network wanting to ship at low cost
              </Header>
              <Button
                size="small"
                className={"buttoncolor homevideo-button"}
              >
                Earn money while travelling
              </Button>
              <Button
                size="small"
                className={"buttoncolor homevideo-button"}
              >
                Ship items now
              </Button>
              </Segment>
            </Grid.Column>
            <Grid.Column  mobile={16} tablet={16} computer={8}>
              <div className={"player-wrapper"}>
                <ReactPlayer
                  url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                  loop='true'
                  playing='false'
                  pip='true'
                  controls='true'
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
};

const mapDispatchToProps = dispatch => {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeTextVideo);

import React from "react";
import {
  Grid,
  Header,
  Segment,
  Divider,
  Image
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './transporthowtomakemoney.css';
import { backend_url } from "../../configurations";


class TransportHowToMakeMoney extends React.Component {

  render() {
    return (
      <Segment basic className={"services-section"}>
      <Divider/>
      <Header as='h1' textAlign="center">We are proud to offer these services</Header>
      <Grid className={"services-section-grid"}>
        <Grid.Row columns={4}>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Segment basic className={"servicescard"}>
              <Image centered src= {backend_url() + '/static/images/convenient.png'} />
              <Segment basic textAlign="center">
              <Header as='h4' className={"service-title"}>ADD YOUR TRIP</Header>
              </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Segment basic className={"servicescard"}>
            <Image centered src= {backend_url() + '/static/images/paymethods.png'} />
            <Segment basic textAlign="center">
            <Header as='h4' className={"service-title"}>MAKE TRANSPORT OFFERS</Header>
            </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Segment basic className={"servicescard"}>
            <Image centered src= {backend_url() + '/static/images/economy.png'} />
            <Segment basic textAlign="center">
            <Header as='h4' className={"service-title"}>MEETING WITH THE SENDER - COLLECT THE PACKAGE</Header>
            </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Segment basic className={"servicescard"}>
            <Image centered src= {backend_url() + '/static/images/usercommunity.png'} />
            <Segment basic textAlign="center">
            <Header as='h4' className={"service-title"}>DELIVER THE PACKAGE AND GET PAID</Header>
            </Segment>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransportHowToMakeMoney);

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
import styles from './homeservicesection.css';
import { backend_url } from "../../configurations";


class HomeServiceSection extends React.Component {

  render() {
    return (
      <Segment basic className={"services-section"}>
      <Divider/>
      <Header as='h1' textAlign="center">We are proud to offer these services</Header>
      <Grid className={"services-section-grid"}>
        <Grid.Row columns={3}>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Segment basic className={"servicescard"}>
              <Image centered src= {backend_url() + '/static/images/convenient.png'} />
              <Segment basic textAlign="center">
              <Header as='h4' className={"service-title"}>CUSTOMER SERVICE AT YOUR DISPOSAL</Header>
                Quickly and easily find a car-pooling nearby among those proposed destinations
              </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Segment basic className={"servicescard"}>
            <Image centered src= {backend_url() + '/static/images/paymethods.png'} />
            <Segment basic textAlign="center">
            <Header as='h4' className={"service-title"}>VARIOUS PAYMENT METHODS</Header>
              To make your life easier, we accept various payment methods including Visa, MasterCard, Orange Money, other options to come
            </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Segment basic className={"servicescard"}>
            <Image centered src= {backend_url() + '/static/images/economy.png'} />
            <Segment basic textAlign="center">
            <Header as='h4' className={"service-title"}>ECONOMIC</Header>
              Send your parcels anywhere in the world, at a much cheaper price than those offered on the market
            </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Segment basic className={"servicescard"}>
            <Image centered src= {backend_url() + '/static/images/usercommunity.png'} />
            <Segment basic textAlign="center">
            <Header as='h4' className={"service-title"}>VERIFIED USER COMMUNITY</Header>
              INZULA is more than a platform, it is a community. We know each of our members. How? 'Or' What ? We check profiles, reviews, IDs and theft. So you know who you're talking to
            </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Segment basic className={"servicescard"}>
            <Image centered src= {backend_url() + '/static/images/security.png'} />
            <Segment basic textAlign="center">
            <Header as='h4' className={"service-title"}>SECURITY</Header>
              Protection insurance for your goods is offered to you based on the declared value of the goods you want to ship
            </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Segment basic className={"servicescard"}>
            <Image centered src= {backend_url() + '/static/images/customerservice.png'} />
            <Segment basic textAlign="center">
            <Header as='h4' className={"service-title"}>CUSTOMER SERVICE AT YOUR DISPOSAL</Header>
              Our customer service is at your disposal to respond to your problems that may arise during transactions.
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
};

const mapDispatchToProps = dispatch => {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeServiceSection);

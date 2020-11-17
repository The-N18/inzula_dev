import React from "react";
import {
  Grid,
  Header,
  Segment,
  Divider,
  Image
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './homeservicesection.css';
import { backend_url } from "../../configurations";
import {FormattedMessage} from 'react-intl';


class HomeServiceSection extends React.Component {

  render() {
    return (
      <Segment basic className={"services-section"}>
      <Divider/>
      <Header as='h1' textAlign="center">
        <FormattedMessage
          id="home_service.title"
          defaultMessage="We are proud to offer these services"
        />
      </Header>
      <Grid className={"services-section-grid"}>
        <Grid.Row columns={3}>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Segment basic className={"servicescard"}>
              <Image centered src= {backend_url() + '/static/images/convenient.png'} />
              <Segment basic textAlign="center">
              <Header as='h4' className={"service-title"}>
                <FormattedMessage
                  id="home_service.customer_service"
                  defaultMessage="CUSTOMER SERVICE AT YOUR DISPOSAL"
                />
              </Header>
              <FormattedMessage
                id="home_service.customer_service_desc"
                defaultMessage="Quickly and easily find a car-pooling nearby among those proposed destinations"
              />
              </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Segment basic className={"servicescard"}>
            <Image centered src= {backend_url() + '/static/images/paymethods.png'} />
            <Segment basic textAlign="center">
            <Header as='h4' className={"service-title"}>
              <FormattedMessage
                id="home_service.pay_methods"
                defaultMessage="VARIOUS PAYMENT METHODS"
              />
            </Header>
            <FormattedMessage
              id="home_service.pay_methods_desc"
              defaultMessage="To make your life easier, we accept various payment methods including Visa, MasterCard, Orange Money, other options to come"
            />
            </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Segment basic className={"servicescard"}>
            <Image centered src= {backend_url() + '/static/images/economy.png'} />
            <Segment basic textAlign="center">
            <Header as='h4' className={"service-title"}>
              <FormattedMessage
                id="home_service.eco"
                defaultMessage="ECONOMIC"
              />
            </Header>
            <FormattedMessage
              id="home_service.eco_desc"
              defaultMessage="Send your parcels anywhere in the world, at a much cheaper price than those offered on the market"
            />
            </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Segment basic className={"servicescard"}>
            <Image centered src= {backend_url() + '/static/images/usercommunity.png'} />
            <Segment basic textAlign="center">
            <Header as='h4' className={"service-title"}>
              <FormattedMessage
                id="home_service.user_comm"
                defaultMessage="VERIFIED USER COMMUNITY"
              />
            </Header>
            <FormattedMessage
              id="home_service.user_comm_desc"
              defaultMessage="INZULA is more than a platform, it is a community. We know each of our members. How? 'Or' What ? We check profiles, reviews, IDs and theft. So you know who you're talking to"
            />
            </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Segment basic className={"servicescard"}>
            <Image centered src= {backend_url() + '/static/images/security.png'} />
            <Segment basic textAlign="center">
            <Header as='h4' className={"service-title"}>
              <FormattedMessage
                id="home_service.security"
                defaultMessage="SECURITY"
              />
            </Header>
            <FormattedMessage
              id="home_service.security_desc"
              defaultMessage="Protection insurance for your goods is offered to you based on the declared value of the goods you want to ship"
            />
            </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Segment basic className={"servicescard"}>
            <Image centered src= {backend_url() + '/static/images/customerservice.png'} />
            <Segment basic textAlign="center">
            <Header as='h4' className={"service-title"}>
              <FormattedMessage
                id="home_service.customer_support"
                defaultMessage="CUSTOMER SERVICE AT YOUR DISPOSAL"
              />
            </Header>
            <FormattedMessage
              id="home_service.customer_support_desc"
              defaultMessage="Our customer service is at your disposal to respond to your problems that may arise during transactions."
            />
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
)(HomeServiceSection);

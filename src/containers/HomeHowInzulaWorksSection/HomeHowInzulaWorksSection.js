import React from "react";
import {
  Grid,
  Header,
  Segment,
  Tab
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './homehowinzulaworkssection.css';
import HomeTextImgCard from "../../containers/HomeTextImgCard/HomeTextImgCard";
import {FormattedMessage} from 'react-intl';

class HomeHowInzulaWorksSection extends React.Component {


  render() {
    const {lang} = this.props;
    const panes = [
    {
      menuItem: lang === 'fr' ? 'Pour expéditeurs' : 'For shippers',
      render: () => <Tab.Pane attached={false} className={"how-it-works-tabpane"}>
      <Header as='h4' textAlign="center">
        <FormattedMessage
          id="how_inzula_works.send"
          defaultMessage="Send packages to loved ones all over the world inexpensively through people in your network. This saves you up to 70% of the price you would have paid using a traditional parcel delivery service. The bonus? Your packages are insured and you have the choice of carrier."
        />
      </Header>
      <Header as='h2' textAlign="center">
        <FormattedMessage
          id="how_inzula_works.ship"
          defaultMessage="For Shippers"
        />
      </Header>
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column fluid="true">
            <HomeTextImgCard title={<FormattedMessage
              id="how_inzula_works.tell_pkg"
              defaultMessage="1 - Tell us more about your package"
            />}
            description={<FormattedMessage
              id="how_inzula_works.tell_pkg_desc"
              defaultMessage="With INZULA, you can ship your packages anywhere in the world. To get started, create your profile and fill in as much information as possible about the package you want.hate to ship, that is to say the nature of the package to be shipped, the place where you want to ship your package, information on the recipient of the package, the desired date of dispatch. An estimate of the cost of transporting the package will be offered to you on the platform."
            />}  img="/static/images/package.png"/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column fluid="true">
            <HomeTextImgCard title={<FormattedMessage
              id="how_inzula_works.wait_carr"
              defaultMessage="2- Wait for carriers to make offers to you"
            />} description={<FormattedMessage
              id="how_inzula_works.wait_carr_desc"
              defaultMessage="Once you have published your offer, we will share it with our community. Travelers interested in this destination will contact you to make offers of parcel transport."
            />} img="/static/images/offers.png"/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column fluid="true">
            <HomeTextImgCard title={<FormattedMessage
              id="how_inzula_works.reward_carr"
              defaultMessage="3 - Agree on a reward amount with the traveler"
            />} description={<FormattedMessage
              id="how_inzula_works.reward_carr_desc"
              defaultMessage="INZULA will automatically calculate all charges applicable to the transport of the package, including: - the amount agreed with the carrier - the insurance costs of your package - platform management fees If for any reason the traveler cancels their trip, you will receive a full refund."
            />} img="/static/images/price.png"/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column fluid="true">
            <HomeTextImgCard title={<FormattedMessage
              id="how_inzula_works.meet_carr"
              defaultMessage="4- Agree on a place to meet the traveler"
            />} description={<FormattedMessage
              id="how_inzula_works.meet_carr_desc"
              defaultMessage="Once the transaction is settled, agree on a time and a public place to deliver your package to the traveler. During the delivery of the package, remember: - to take a picture of yourself with the carrier to certify the delivery of the package to the latter - to verify the identity document of the person to whom youhand over the package - confirm delivery of the package to the traveler"
            />} img="/static/images/place.png"/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Tab.Pane>,
    },
    {
      menuItem: lang === 'fr' ? 'Pour transporteurs' : 'For carriers',
      render: () => <Tab.Pane attached={false} className={"how-it-works-tabpane"}>
      <Header as='h4' textAlign="center">
        <FormattedMessage
          id="how_inzula_works.fund_trip"
          defaultMessage="Fund your trip every time you travel with INZULA. Our travelers usually deliver a handful of packages and write off their plane ticket. Not only will you make money traveling, but you will meet amazing people along the way."
        />
      </Header>
      <Header as='h2' textAlign="center">
        <FormattedMessage
          id="how_inzula_works.carry"
          defaultMessage="For Carriers"
        />
      </Header>
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column fluid="true">
            <HomeTextImgCard title={<FormattedMessage
              id="how_inzula_works.find_request"
              defaultMessage="1 - Find a shipment request and make a transport proposal"
            />} description={<FormattedMessage
              id="how_inzula_works.find_request_desc"
              defaultMessage="Find a shipment request that matches your next trip. Make an offer and set your Traveler Reward - the amount your buyer will pay you for the delivery of their item."
            />} img="/static/images/request.png"/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column fluid="true">
            <HomeTextImgCard title={<FormattedMessage
              id="how_inzula_works.place"
              defaultMessage="2- Agree on a place to meet the sender"
            />} description={<FormattedMessage
              id="how_inzula_works.place_desc"
              defaultMessage="Once yourth proposition validated, uUse the INZULA courier to arrange a location to pick up the package. During the delivery of the package, remember: - to take a picture of yourself with the sender to certify that the package has been delivered to you - to check the identity document of the person who gives you the parcel."
            />} img="/static/images/agree.png"/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column fluid="true">
            <HomeTextImgCard title={<FormattedMessage
              id="how_inzula_works.sender"
              defaultMessage="3 - Meet the recipient of the package where you are going"
            />} description={<FormattedMessage
              id="how_inzula_works.sender_desc"
              defaultMessage="Once at destination, you have 3 days from your arrival in the country to contact the recipient of the package. Arrange an appointment in a public place to deliver the package to the recipient and remember to take a photo of yourself with the latter to certify the delivery."
            />} img="/static/images/meet.png"/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column fluid="true">
            <HomeTextImgCard title={<FormattedMessage
              id="how_inzula_works.pay"
              defaultMessage="4- Receive your payment"
            />} description={<FormattedMessage
              id="how_inzula_works.pay_desc"
              defaultMessage="Once the package has been delivered, validate the discount on the site. The sender then has 2 days to confirm the delivery by hand to the recipient, and you will then receive your payment."
            />} img="/static/images/payment.png"/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Tab.Pane>,
    }
  ]

    return (
      <div id="howitworks">
        <Segment basic className={"how-it-works-section"}>
          <Header as='h1' textAlign="center">{
            <FormattedMessage
              id="how_inzula_works.title"
              defaultMessage="How Inzula works"
            />}</Header>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} className={"how-it-works-tab"}/>
        </Segment>
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeHowInzulaWorksSection);

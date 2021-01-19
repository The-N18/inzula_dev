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
      <div className={"footercontainer"}>
      <Divider section />
      <Segment
        vertical
        style={{ margin: "1em 0em 0em", padding: "2em 0em" }}
      >
        <Container textAlign="center">
          <Grid>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <List link>
                <List.Item as="a" href="#" className={"linkstyle"}>
                  <FormattedMessage
                    id="footer.who_we_are"
                    defaultMessage="Who we are"
                  /></List.Item>
                <List.Item as="a" href="/" className={"linkstyle"}>
                  <FormattedMessage
                    id="footer.how_it_works"
                    defaultMessage="How it works"
                  /></List.Item>
                <List.Item as="a" href="#" className={"linkstyle"}>
                  <FormattedMessage
                    id="footer.blog"
                    defaultMessage="Blog"
                  /></List.Item>
                <List.Item as="a" onClick={this.handleOnFaqsClick.bind(this)} className={"linkstyle"}>
                  <FormattedMessage
                    id="footer.faqs"
                    defaultMessage="Frequently asked questions"
                  /></List.Item>
              </List>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <List link>
                <List.Item as="a" href="#" className={"linkstyle"}>
                  <FormattedMessage
                    id="footer.contact"
                    defaultMessage="Contact us"
                  /></List.Item>
                <List.Item as="a" onClick={this.handleOnInsuranceClick.bind(this)} className={"linkstyle"}>
                  <FormattedMessage
                    id="footer.insurance"
                    defaultMessage="Insurance"
                  /></List.Item>
                <List.Item as="a" onClick={this.handleOnLegalInformationClick.bind(this)} className={"linkstyle"}>
                  <FormattedMessage
                    id="footer.legal"
                    defaultMessage="Legal information"
                  /></List.Item>
                <List.Item as="a" onClick={this.handleOnTransparencyClick.bind(this)} className={"linkstyle"}>
                  <FormattedMessage
                    id="footer.trans"
                    defaultMessage="Transparency"
                  /></List.Item>
              </List>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={8} textAlign="center">
              <List>
                <Image size="tiny" inline centered className={"footer-payment-image"} src= {backend_url() + '/static/images/amex.svg'} />
                <Image size="tiny" inline centered className={"footer-payment-image"} src= {backend_url() + '/static/images/mastercard.svg'} />
                <Image size="tiny" inline centered className={"footer-payment-image"} src= {backend_url() + '/static/images/paypal.svg'} />
                <Image size="tiny" inline centered src= {backend_url() + '/static/images/mtn.jpg'} />
                <Image size="tiny" inline centered src= {backend_url() + '/static/images/visa.svg'} />
                <Image size="tiny" inline centered src= {backend_url() + '/static/images/orange.png'} />
              </List>
            </Grid.Column>
          </Grid>

          <Divider section />
          <Grid>
            <Grid.Column mobile={16} tablet={8} computer={6} floated="left">
              <List horizontal divided link size="small">
                <List.Item as="a" href="#">
                  <Icon size="big" name='facebook' className={"footer-icons"} />
                </List.Item>
                <List.Item as="a" href="#">
                  <Icon size="big" name='twitter' className={"footer-icons"} />
                </List.Item>
                <List.Item as="a" href="#">
                  <Icon size="big" name='instagram' className={"footer-icons"} />
                </List.Item>
                <List.Item as="a" href="#">
                  <Icon size="big" name='youtube' className={"footer-icons"}/>
                </List.Item>
                <List.Item as="a" href="#">
                  <Icon size="big" name='whatsapp' className={"footer-icons"} />
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={6} floated="right">
              <List horizontal divided link size="small">
                <List.Item className={"reserved"}>
                  <FormattedMessage
                    id="footer.rights"
                    defaultMessage="All rights reserved"
                  />
                </List.Item>
                <List.Item as="a" onClick={this.handleOnTermsClick.bind(this)}>
                  <FormattedMessage
                    id="footer.terms"
                    defaultMessage="Terms and Conditions"
                  />
                </List.Item>
                <List.Item as="a" onClick={this.handleOnUserAgreementClick.bind(this)}>
                  <FormattedMessage
                    id="footer.privacy_policy"
                    defaultMessage="Privacy Policy"
                  />
                </List.Item>
              </List>
            </Grid.Column>
          </Grid>
        </Container>
      </Segment>
      </div>
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

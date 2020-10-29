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
import styles from './footer.css';
import { backend_url } from "../../configurations";



class Footer extends React.Component {

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
                <List.Item as="a" href="#" className={"linkstyle"}>Who we are</List.Item>
                <List.Item as="a" href="#" className={"linkstyle"}>How it works</List.Item>
                <List.Item as="a" href="#" className={"linkstyle"}>Blog</List.Item>
                <List.Item as="a" href="#" className={"linkstyle"}>Frequently asked questions</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <List link>
                <List.Item as="a" href="#" className={"linkstyle"}>Contact us</List.Item>
                <List.Item as="a" href="#" className={"linkstyle"}>Insurance</List.Item>
                <List.Item as="a" href="#" className={"linkstyle"}>Legal information</List.Item>
                <List.Item as="a" href="#" className={"linkstyle"}>Transparency</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={8} textAlign="center">
              <List>
                <Image size="tiny" inline centered className={"footer-payment-image"} src= {backend_url() + '/static/images/amex.svg'} />
                <Image size="tiny" inline centered className={"footer-payment-image"} src= {backend_url() + '/static/images/mastercard.svg'} />
                <Image size="tiny" inline centered className={"footer-payment-image"} src= {backend_url() + '/static/images/paypal.svg'} />
                <Image size="tiny" inline centered src= {backend_url() + '/static/images/visa.svg'} />
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
                  All rights reserved
                </List.Item>
                <List.Item as="a" href="#">
                  Terms and Conditions
                </List.Item>
                <List.Item as="a" href="#">
                  Privacy Policy
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);

import React from "react";
import PropTypes from "prop-types";
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
  Image,
  Tab
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styles from './hometextimgcard.css';
import { backend_url } from "../../configurations";


class HomeTextImgCard extends React.Component {


  render() {

    const {title, description, img} = this.props;

    return (
      <Segment basic>
      <Grid className={"home-text-img-card-grid"}>
        <Grid.Row columns={2}>
          <Grid.Column fluid>
            <Segment basic textAlign="left">
              <Header as='h4' className={"home-text-img-card-title"}>{title}</Header>
              {description}
            </Segment>
          </Grid.Column>
          <Grid.Column fluid>
            <Segment basic textAlign="right">
              <Image centered src= {backend_url() + img} />
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

HomeTextImgCard.propTypes = {
  title: PropTypes.string,
  desctiption: PropTypes.string,
  img: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeTextImgCard);

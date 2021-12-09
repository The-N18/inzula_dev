import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Header,
  Segment,
  Image,
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './hometextimgcard.css';
import { backend_url } from "../../configurations";


class HomeTextImgCard extends React.Component {

  render() {

    const {title, description, img} = this.props;

    return (
      <Segment basic>
      <Grid className={"home-text-img-card-grid"}>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <Segment basic textAlign="left">
              <Header as='h4' className={"home-text-img-card-title"}>{title}</Header>
              <span className={"home-text-img-card-description"}>{description}</span>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8}>
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

HomeTextImgCard.propTypes = {
  title: PropTypes.object,
  desctiption: PropTypes.string,
  img: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeTextImgCard);

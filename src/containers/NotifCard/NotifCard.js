import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Header,
  Segment,
  Image,
  Card,
  Checkbox,
  Button,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './notifcard.css';
import { backend_url, get_img_url } from "../../configurations";
import {FormattedMessage, FormattedDate} from 'react-intl'


class NotifCard extends React.Component {

  render() {

    const {pk} = this.props;
    const img = null;
    return (
      <Card raised fluid centered className={"home-text-img-card-grid max-h-190px"}>
        <Grid>
          <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={4}>
            <Segment basic textAlign="right">
              <Image centered src={img ? get_img_url(img) : backend_url() + '/static/images/default_booking_image.png'} rounded bordered verticalAlign="middle" size="massive" className={"booking-card-img"}/>
            </Segment>
          </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={10}>
              <Segment basic textAlign="left">
                <p className={"home-text-img-card-description"}>key: {pk}</p>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

NotifCard.propTypes = {
  pk: PropTypes.number,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotifCard);

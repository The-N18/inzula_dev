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
import styles from './paymentmethodcard.css';
import { backend_url, get_img_url } from "../../configurations";
import {FormattedMessage, FormattedDate} from 'react-intl'


class PaymentMethodCard extends React.Component {

  render() {

    const {type, onclick} = this.props;
    return (
      <Card raised fluid centered className={"notif-card"} onClick={this.props.onclick}>
        <Card.Content>
          <Card.Header>
          {type === "credit_card" ? <span><FormattedMessage
            id="paymentmethodcard.credit_card"
            defaultMessage="Credit Card"
          /></span> : ''}
          {type === "paypal" ? <span><FormattedMessage
            id="paymentmethodcard.paypal"
            defaultMessage="Paypal"
          /></span> : ''}
          </Card.Header>
          <Card.Description>
          </Card.Description>
        </Card.Content>
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

PaymentMethodCard.propTypes = {
  type: PropTypes.string,
  onclick: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMethodCard);

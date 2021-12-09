import React from "react";
import PropTypes from "prop-types";
import {
  Card,
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './paymentmethodcard.css';
import {FormattedMessage} from 'react-intl'


class PaymentMethodCard extends React.Component {

  render() {

    const {type} = this.props;
    return (
      <Card raised fluid centered className={"pay-method-card"} onClick={this.props.onclick}>
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
          {type === "wallet" ? <span><FormattedMessage
            id="paymentmethodcard.wallet"
            defaultMessage="Wallet funds"
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

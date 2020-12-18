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
import styles from './creditcardcard.css';
import { backend_url, get_img_url } from "../../configurations";
import {FormattedMessage, FormattedDate} from 'react-intl'


class CreditCardCard extends React.Component {

  render() {

    const {alias, card_type, creation_date, expiration_date, onclick, cardId, pk} = this.props;
    return (
      <Card raised fluid centered className={cardId === null ? "notif-card" : cardId === pk ? "notif-card green-bg" : "notif-card grey-bg"} onClick={onclick}>
        <Card.Content>
          <Card.Header>
            <span>{alias} : {card_type}</span>
          </Card.Header>
          <Card.Description>
            {creation_date !== "" ? <span><FormattedMessage
              id="creditcard_card.creation_date"
              defaultMessage="Creation Date: "
            />
            <FormattedDate
              value={creation_date}
              year="numeric"
              month="long"
              day="numeric"
              weekday="long"
            /> | </span> : ''}
            {expiration_date !== "" ? <b><FormattedMessage
              id="creditcard_card.expiration_date"
              defaultMessage="Expiration: "
            />{expiration_date}</b> : ''}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    cardId: state.selectCreditCardModal.cardId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

CreditCardCard.propTypes = {
  pk: PropTypes.number,
  card_type: PropTypes.string,
  alias: PropTypes.string,
  creation_date: PropTypes.string,
  expiration_date: PropTypes.string,
  currency: PropTypes.string,
  onclick: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditCardCard);

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
import styles from './transactioncard.css';
import { backend_url, get_img_url } from "../../configurations";
import {FormattedMessage, FormattedDate} from 'react-intl'


class TransactionCard extends React.Component {

  render() {

    const {type, creation_date, debited_funds, execution_date} = this.props;
    return (
      <Card raised fluid centered className={"notif-card"}>
        <Card.Content>
          <Card.Header>
            {type === "PAYIN" ?
            <span><FormattedMessage
              id="transaction_card.payin"
              defaultMessage="Transaction executed: "
            />
            <FormattedDate
              value={execution_date}
              year="numeric"
              month="long"
              day="numeric"
              weekday="long"
            /></span> : ''}
          </Card.Header>
          <Card.Description>
            {creation_date !== "" ? <span><FormattedMessage
              id="transaction_card.creation_date"
              defaultMessage="Creation Date: "
            />
            <FormattedDate
              value={creation_date}
              year="numeric"
              month="long"
              day="numeric"
              weekday="long"
              hour='numeric'
              minute='numeric'
              second='numeric'
            /> | </span> : ''}
            {debited_funds !== "" ? <b><FormattedMessage
              id="transaction_card.debited_funds"
              defaultMessage="Debited funds: "
            />{debited_funds}</b> : ''}
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

TransactionCard.propTypes = {
  pk: PropTypes.number,
  type: PropTypes.string,
  nature: PropTypes.string,
  creation_date: PropTypes.string,
  execution_date: PropTypes.string,
  debited_funds: PropTypes.string,
  credited_funds: PropTypes.string,
  fees: PropTypes.string,
  author: PropTypes.string,
  credited_user: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionCard);
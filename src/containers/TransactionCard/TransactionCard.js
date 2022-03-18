import React from "react";
import PropTypes from "prop-types";
import {
  Card,
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './transactioncard.css';
import { formatFunds } from "../../configurations";
import {FormattedMessage, FormattedDate} from 'react-intl'


class TransactionCard extends React.Component {

  render() {

    const {type, creation_date, debited_funds, id, transaction_type, status} = this.props;
    return (
      
      <tr>
          <td> {id} </td>
          <td> {creation_date !== "" ? <span>
            <FormattedDate
              value={creation_date}
              year="numeric"
              month="long"
              day="numeric"
              weekday="long"
            /></span> : ''}
          </td>
          <td> {creation_date !== "" ? <FormattedDate
              value={creation_date}
              hour='numeric'
              minute='numeric'
              second='numeric'
            /> : ''} </td>
          <td> {formatFunds(debited_funds)} </td>
          <td> {transaction_type} </td>
          {status=="SUCCEEDED"?<td> Succès </td>:""}
          {status=="FAILED"?<td> Echec </td>:""}
          
        
      </tr>
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
  id: PropTypes.string,
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

import React from "react";
import PropTypes from "prop-types";
import {
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './failedfinancialtransactionslist.css';
import { getTransactions, getInitialTransactions } from "../../store/actions/failedFinancialTransactions";
import TransactionCard from "../../containers/TransactionCard/TransactionCard";
import $ from "jquery";
import {FormattedMessage} from 'react-intl'

class FailedFinancialTransactionsList extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    isMobile: false,
    isTablet: false
  };

  handleScreenSize = () => {
    if($(window).width() < 768) {
      this.setState({ isMobile: true });
    }
    if($(window).width() >= 768 && $(window).width() <= 950) {
      this.setState({ isTablet: true });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreenSize);
  }

  componentDidMount = () => {
    const { user_id } = this.props;
    this.props.getInitialUserTransactions(user_id);
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
    }

  fetchMoreData = () => {
    const { user_id, next_url, count } = this.props;
    this.props.getUserTransactions(user_id, next_url, count);
  }

  getDivHeight = () => {
    const { isMobile, isTablet } = this.state;
    let val = 240;
    if(isTablet) {
      val = 300;
    }
    if(isMobile) {
      val = 445;
    }
    return val;
  }

  render() {
    const { transactions } = this.props;
    return (
      <Segment basic className={"profile-tab-section"}>
      {transactions.length === 0 ? <div><FormattedMessage
        id="failed_user_transactions.no_transactions"
        defaultMessage="You do not have any failed transactions."
      /></div> : <div
        id="scrollableDiv"
        style={{
          height: 600,
          overflow: 'auto',
        }}
      >
      {transactions.map((item, index) => (
        <div style={{
          height: this.getDivHeight.bind(this),
          margin: 6,
          padding: 8
        }} key={index}>
          <TransactionCard
            status={item["status"]}
            id={item["id"]}
            result_code={item["result_code"]}
            result_message={item["result_message"]}
            type={item["type"]}
            nature={item["nature"]}
            creation_date={item["creation_date"]}
            debited_funds={item["debited_funds"]}
            credited_funds={item["credited_funds"]}
            fees={item["fees"]}
            execution_date={item["execution_date"]}
            author={item["author"]}
            credited_user={item["credited_user"]}/>
            </div>
          ))}
      </div>}
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    user_id: state.userInfo.userId,
    transactions: state.failedFinancialTransactions.transactions,
    next_url: state.failedFinancialTransactions.next_url,
    count: state.failedFinancialTransactions.count,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserTransactions: (user_id, next_url, count) => dispatch(getTransactions(user_id, next_url, count)),
    getInitialUserTransactions: (user_id) => dispatch(getInitialTransactions(user_id)),
  };
};

FailedFinancialTransactionsList.propTypes = {
  profileType: PropTypes.string,
  selectable: PropTypes.boolean,
  editable: PropTypes.boolean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FailedFinancialTransactionsList);

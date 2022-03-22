import React from "react";
import PropTypes from "prop-types";
import {
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './incomingfinancialtransactionslist.css';
import { getTransactions, getInitialTransactions } from "../../store/actions/withdrawalFinancialTransactions";
import TransactionCard from "../TransactionCard/TransactionCard";
import $ from "jquery";
import {FormattedMessage} from 'react-intl'

class WithdrawalFinancialTransactionsList extends React.Component {
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
    const { transactions, loading } = this.props;
    return (

      <Segment basic className={"profile-tab-section"}>
        {/* Preloader */}
        <div id="preloader" style={{display:loading?'block':'none'}}>
            <div id="status"></div>
          </div>
        {/* Preloader Ends */}

        {transactions.length === 0 ? !loading?<div><FormattedMessage
        id="withdrawal_user_transactions.no_transactions"
        defaultMessage="You do not have any withdrawals yet."
      /></div>:"" : <React.Fragment>
            <div className="dashboard-list-box with-icons">
              <div className="dashboard-title">
                <h4 className="mb-0">Liste de mes retraits de fonds</h4>
                <p className="mb-0">Vous retrouvez ici la liste de vos retraits de fonds</p>
              </div>
              <div className="table-responsive table-desi">
                <table className="basic-table table table-hover">
                  <thead>
                    <tr>
                      <th>N°</th>
                      <th>Jour</th>
                      <th>Heure</th>
                      <th>Montant</th>
                      <th>Type</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                  {transactions.map((item, index) => (
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
                      credited_user={item["credited_user"]}
                      transaction_type={item["transaction_type"]}/>
                ))}


                  </tbody>
                </table>
              </div>
            </div>
            </React.Fragment>
          }
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.withdrawalFinancialTransactions.loading,
    error: state.auth.error,
    user_id: state.userInfo.userId,
    transactions: state.withdrawalFinancialTransactions.transactions,
    next_url: state.withdrawalFinancialTransactions.next_url,
    count: state.withdrawalFinancialTransactions.count,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserTransactions: (user_id, next_url, count) => dispatch(getTransactions(user_id, next_url, count)),
    getInitialUserTransactions: (user_id) => dispatch(getInitialTransactions(user_id)),
  };
};

WithdrawalFinancialTransactionsList.propTypes = {
  profileType: PropTypes.string,
  selectable: PropTypes.boolean,
  editable: PropTypes.boolean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithdrawalFinancialTransactionsList);

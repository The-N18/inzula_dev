import React from "react";
import {
  Segment,
  Tab
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './userfinance.css';
import { setActiveIndex } from "../../store/actions/userFinance";
import IncomingFinancialTransactionsList from "../../containers/IncomingFinancialTransactionsList/IncomingFinancialTransactionsList";
import OutgoingFinancialTransactionsList from "../../containers/OutgoingFinancialTransactionsList/OutgoingFinancialTransactionsList";
import FailedFinancialTransactionsList from "../../containers/FailedFinancialTransactionsList/FailedFinancialTransactionsList";
import DepositFinancialTransactionsList from "../../containers/DepositFinancialTransactionsList/DepositFinancialTransactionsList";
import WithdrawalFinancialTransactionsList from "../../containers/WithdrawalFinancialTransactionsList/WithdrawalFinancialTransactionsList";
import MyFunds from "../../containers/MyFunds/MyFunds";
import MyPaymentMethods from "../../containers/MyPaymentMethods/MyPaymentMethods";
import $ from "jquery";


class UserFinance extends React.Component {
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
    if($(window).width() >= 768) {
      this.setState({ isTablet: true });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreenSize);
  }

  handleTabChange = (e, { activeIndex }) => {
    this.props.setActiveIndex(activeIndex);
  }


  render() {
    const { activeIndex, lang } = this.props;
    const {isMobile} = this.state;
    const panes = [
      {
        menuItem: { key: 'in_transactions', icon: 'arrow left', content: isMobile ? '' : lang === 'en' ? 'Incoming transactions' : 'Transactions entrantes' },
        render: () => <Tab.Pane attached={false}><IncomingFinancialTransactionsList/></Tab.Pane>,
      },
      {
        menuItem: { key: 'out_transactions', icon: 'arrow right', content: isMobile ? '' : lang === 'en' ? 'Outgoing transactions' : 'Transactions sortantes' },
        render: () => <Tab.Pane attached={false}><OutgoingFinancialTransactionsList/></Tab.Pane>,
      },
      {
        menuItem: { key: 'deposit_transactions', icon: 'arrow circle left', content: isMobile ? '' : lang === 'en' ? 'Funds\' deposits' : 'Depots de fonds' },
        render: () => <Tab.Pane attached={false}><DepositFinancialTransactionsList/></Tab.Pane>,
      },
      {
        menuItem: { key: 'withdrawal_transactions', icon: 'arrow circle right', content: isMobile ? '' : lang === 'en' ? 'Funds\' withdrawals' : 'Retraits de fonds' },
        render: () => <Tab.Pane attached={false}><WithdrawalFinancialTransactionsList/></Tab.Pane>,
      },
      {
        menuItem: { key: 'failed_transactions', icon: 'exclamation', content: isMobile ? '' : lang === 'en' ? 'Failed transactions' : 'Transactions échouées' },
        render: () => <Tab.Pane attached={false}><FailedFinancialTransactionsList/></Tab.Pane>,
      },
      {
        menuItem: { key: 'my_funds', icon: 'money', content: isMobile ? '' : lang === 'en' ? 'My funds' : 'Mes fonds' },
        render: () => <Tab.Pane attached={false}><MyFunds/></Tab.Pane>,
      },
      {
        menuItem: { key: 'my_payment_methods', icon: 'credit card', content: isMobile ? '' : lang === 'en' ? 'My payment methods' : 'Mes méthodes de paiement' },
        render: () => <Tab.Pane attached={false}><MyPaymentMethods/></Tab.Pane>,
      },
    ];
    return (
      <Segment basic className={"profile-tab-section"}>
        <Tab
          activeIndex={activeIndex}
          menu={{ borderless: true, attached: false, tabular: false, vertical: isMobile ? false : true, fluid: true}}
          panes={panes}
          onTabChange={this.handleTabChange}
        />
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeIndex: state.userFinance.activeIndex,
    profileType: state.userInfo.profileType,
    lang: state.appConfig.lang
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveIndex: (activeIndex) => dispatch(setActiveIndex(activeIndex)),
  };
};

UserFinance.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFinance);

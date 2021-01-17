import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Select,
  Image,
  Divider,
  Tab
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './userfinance.css';
import { backend_url } from "../../configurations";
import ImageUploader from 'react-images-upload';
import InfiniteScroll from 'react-infinite-scroll-component';
import { setActiveIndex } from "../../store/actions/userFinance";
import IncomingFinancialTransactionsList from "../../containers/IncomingFinancialTransactionsList/IncomingFinancialTransactionsList";
import OutgoingFinancialTransactionsList from "../../containers/OutgoingFinancialTransactionsList/OutgoingFinancialTransactionsList";
import FailedFinancialTransactionsList from "../../containers/FailedFinancialTransactionsList/FailedFinancialTransactionsList";
import MyFunds from "../../containers/MyFunds/MyFunds";
import MyPaymentMethods from "../../containers/MyPaymentMethods/MyPaymentMethods";


class UserFinance extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
  };

  componentDidMount = () => {
    console.log("in component did mount");
    }

  fetchMoreData = () => {
    console.log("fetch more data");
  }

  handleTabChange = (e, { activeIndex }) => {
    this.props.setActiveIndex(activeIndex);
  }


  render() {
    const { loading, alerts, next_url, count, selectable, activeIndex, lang } = this.props;
    const panes = [
      {
        menuItem: { key: 'in_transactions', icon: 'arrow right', content: lang === 'en' ? 'Outgoing transactions' : 'Transactions sortantes' },
        render: () => <Tab.Pane attached={false}><OutgoingFinancialTransactionsList/></Tab.Pane>,
      },
      {
        menuItem: { key: 'out_transactions', icon: 'arrow left', content: lang === 'en' ? 'Incoming transactions' : 'Transactions entrantes' },
        render: () => <Tab.Pane attached={false}><IncomingFinancialTransactionsList/></Tab.Pane>,
      },
      {
        menuItem: { key: 'failed_transactions', icon: 'exclamation', content: lang === 'en' ? 'Failed transactions' : 'Transactions échouées' },
        render: () => <Tab.Pane attached={false}><FailedFinancialTransactionsList/></Tab.Pane>,
      },
      {
        menuItem: { key: 'my_funds', icon: 'money', content: lang === 'en' ? 'My funds' : 'Mes fonds' },
        render: () => <Tab.Pane attached={false}><MyFunds/></Tab.Pane>,
      },
      {
        menuItem: { key: 'my_payment_methods', icon: 'money', content: lang === 'en' ? 'My payment methods' : 'Mes methodes de paiement' },
        render: () => <Tab.Pane attached={false}><MyPaymentMethods/></Tab.Pane>,
      },
    ];
    return (
      <Segment basic className={"profile-tab-section"}>
        <Tab
          activeIndex={activeIndex}
          menu={{ borderless: true, attached: false, tabular: false, vertical: true, fluid: true}}
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

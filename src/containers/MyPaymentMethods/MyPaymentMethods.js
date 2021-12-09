import React from "react";
import PropTypes from "prop-types";
import {
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './mypaymentmethods.css';
import { getCards, addMethod } from "../../store/actions/myPaymentMethods";
import $ from "jquery";
import {FormattedMessage} from 'react-intl'
import CreditCardCard from "../../containers/CreditCardCard/CreditCardCard";

class MyPaymentMethods extends React.Component {
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
    this.props.getCards(user_id);
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
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
    const { loading, cards } = this.props;
    return (
      <Segment basic className={"profile-tab-section"}>
      {cards.length === 0 ? <div><FormattedMessage
        id="my_funds.no_cards"
        defaultMessage="You do not have any cards."
      /></div> : <div
        id="scrollableDiv"
        style={{
          height: 600,
          overflow: 'auto',
        }}
      >
      {cards.map((item, index) => (
        <div style={{
          height: this.getDivHeight.bind(this),
          margin: 6,
          padding: 8
        }} key={index}>
          <CreditCardCard
            pk={item["id"]}
            creation_date={item["creation_date"]}
            expiration_date={item["expiration_date"]}
            card_type={item["card_type"]}
            alias={item["alias"]}
            country={item["country"]}
            product={item["product"]}
            bank_code={item["bank_code"]}
            active={item["active"]}
            currency={item["currency"]}
            validity={item["validity"]}
            user={item["user"]}
            fingerprint={item["fingerprint"]}/>
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
    cards: state.myPaymentMethods.cards,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMethod: (user_id) => dispatch(addMethod(user_id)),
    getCards: (user_id) => dispatch(getCards(user_id)),
  };
};

MyPaymentMethods.propTypes = {
  profileType: PropTypes.string,
  selectable: PropTypes.boolean,
  editable: PropTypes.boolean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPaymentMethods);

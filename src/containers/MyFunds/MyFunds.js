import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Segment,
  Card
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './myfunds.css';
import { getFunds, cashout } from "../../store/actions/myFunds";
import { getMaxPayoutAmount } from "../../store/actions/bankAccountFormModal";
import $ from "jquery";
import {FormattedMessage} from 'react-intl'
import { openBankAccountFormModal } from "../../store/actions/bankAccountFormModal";

class MyFunds extends React.Component {
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
    this.props.getFunds(user_id);
    this.props.getMaxPayoutAmount(user_id);
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
    }

  cashout = () => {
    const { user_id } = this.props;
    this.props.cashout(user_id, 0);
  }

  openCashoutModal = () => {
    this.props.openBankAccountFormModal();
  }

  render() {
    const { funds, max_amt } = this.props;
    return (
      <Segment basic className={"profile-tab-section"}>
      <Card.Group>
        <Card>
        <Card.Content textAlign={"center"}>
          <Card.Header>
          <FormattedMessage
            id="my_funds.cashable"
            defaultMessage="You can cash this out."
          />
          <p>{max_amt === "" ? 0 : max_amt} EUR</p> </Card.Header>
        </Card.Content>
        <Card.Content extra>
            <Button basic color='green' fluid onClick={this.openCashoutModal.bind(this)} disabled={max_amt === 0 || max_amt === ""}>
              <FormattedMessage
                id="my_funds.cashout"
                defaultMessage="Cash out"
              />
            </Button>
        </Card.Content>
      </Card>

      {/* <Card>
      <Card.Content>
        <Card.Header>
        <FormattedMessage
          id="my_funds.total_deposited"
          defaultMessage="Total of funds in your wallet."
        /> <p>{funds}</p></Card.Header>
        <Card.Meta>
        <FormattedMessage
          id="my_funds.fraction_cashable"
          defaultMessage="You can only cash out a fraction of this, depending on your pending bookings and operations."
        />
        </Card.Meta>
      </Card.Content>
      </Card> */}
      </Card.Group>

      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    user_id: state.userInfo.userId,
    funds: state.myFunds.funds,
    max_amt: state.bankAccountFormModal.max_amt,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cashout: (user_id, amount) => dispatch(cashout(user_id, amount)),
    getFunds: (user_id) => dispatch(getFunds(user_id)),
    openBankAccountFormModal: () => dispatch(openBankAccountFormModal()),
    getMaxPayoutAmount: (user_id) => dispatch(getMaxPayoutAmount(user_id)),
  };
};

MyFunds.propTypes = {
  profileType: PropTypes.string,
  selectable: PropTypes.boolean,
  editable: PropTypes.boolean,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyFunds);

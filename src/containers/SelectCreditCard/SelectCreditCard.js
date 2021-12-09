import React from "react";
import {
  Segment,
  Button,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './selectcreditcard.css';
import { openSelectCreditCard,
         closeSelectCreditCard,
         getCards,
         selectSingleCard} from "../../store/actions/selectCreditCardModal";
import CreditCardCard from "../../containers/CreditCardCard/CreditCardCard";
import { openPaymentFormModal, payForBookingWithCardId } from "../../store/actions/paymentFormModal";
import $ from "jquery";
import {FormattedMessage} from 'react-intl'


class SelectCreditCard extends React.Component {

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
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;
    if (prevProps.open === false && this.props.open === true) {
      this.props.getCards(userId);
    }
    if (prevProps.open === true && this.props.open === false) {
      this.props.selectSingleCard(null);
    }
  }

  selectCard = (item) => {
    this.props.selectSingleCard(item['id'])
  }

  payWithNewCard = () => {
    this.props.openPaymentFormModal();
    this.props.selectSingleCard(null);
  }

  payWithCreditCard = () => {
    const {cardId, selectedBookingIds, tripId, userId} = this.props;
    this.props.payForBookingWithCardId({'cardId': cardId, 'selectedBookingIds': selectedBookingIds, 'tripId': tripId, 'userId': userId})
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
    const { open, loading, cards, cardId } = this.props;
    return (
      <Modal
      closeIcon
        centered={false}
        open={open}
        onClose={() => this.props.closeSelectCreditCard()}
        onOpen={() => this.props.openSelectCreditCard()}
        size='tiny'
      >
      <Modal.Header>
        <p><FormattedMessage
        id="select_credit_card.title"
        defaultMessage="Select credit card"
      /></p>
      <Button
        size="large"
        className={"buttoncolor select-trip-top-button"}
        onClick={this.payWithNewCard.bind(this)}
      ><FormattedMessage
          id="select_credit_card.pay_with_new"
          defaultMessage="Pay with new card"
        />
      </Button>
      </Modal.Header>
      <Modal.Content>
      <Segment basic>
      {cards.length === 0 ? <div><FormattedMessage
        id="my_funds.no_cards"
        defaultMessage="You do not have any cards."
      /></div> : <div
        id="scrollableDiv"
        style={{
          height: 400,
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
            fingerprint={item["fingerprint"]}
            onclick={this.selectCard.bind(this, item)}/>
            </div>
          ))}
      </div>}
      </Segment>
      </Modal.Content>
      <Modal.Actions>
      <Button color='green' onClick={this.payWithCreditCard.bind(this)} disabled={cardId === null || loading}>
      <FormattedMessage
        id="select_credit_card.pay"
        defaultMessage="Pay"
      />
      </Button>
      <Button negative onClick={() => this.props.closeSelectCreditCard()}>
      <FormattedMessage
        id="select_credit_card.cancel"
        defaultMessage="Cancel"
      />
      </Button>
      </Modal.Actions>
    </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.selectCreditCardModal.open,
    loading: state.paymentFormModal.loading,
    cards: state.selectCreditCardModal.cards,
    cardId: state.selectCreditCardModal.cardId,
    bookingId: state.confirmBookingPrice.bookingId,
    tripId: state.selectReservationsModal.tripId,
    selectedBookingIds: state.selectReservationsModal.selected,
    userId: state.userInfo.userId,
    price: state.confirmBookingPrice.price,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPaymentFormModal: () => dispatch(openPaymentFormModal()),
    openSelectCreditCard: () => dispatch(openSelectCreditCard()),
    closeSelectCreditCard: () => dispatch(closeSelectCreditCard()),
    getCards: (userId) => dispatch(getCards(userId)),
    payForBookingWithCardId: (values) => dispatch(payForBookingWithCardId(values)),
    selectSingleCard: (cardId) => dispatch(selectSingleCard(cardId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCreditCard);

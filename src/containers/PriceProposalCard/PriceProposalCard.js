import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Segment,
  Image,
  Card,
  Button
} from "semantic-ui-react";
import { connect } from "react-redux";
import { backend_url, get_img_url, isProfileComplete } from "../../configurations";
import {FormattedMessage, FormattedDate} from 'react-intl'
import {createNotification, NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notify';
import {openCompleteProfileModal} from "../../store/actions/completeProfileModal";

class PriceProposalCard extends React.Component {



  render() {

    const {author, pk, price, productName, onclick} = this.props;

    return (
      <Card raised fluid centered onClick={onclick}>
      <Card.Content>
        <Card.Header>
          <span>Proposé par: {author}</span>
        </Card.Header>
        <Card.Description>
        <span>Prix: {price}</span> |
        <span>Colis: {productName}</span>
          {/* {creation_date !== "" ? <span><FormattedMessage
            id="creditcard_card.creation_date"
            defaultMessage="Creation Date: "
          />
          <FormattedDate
            value={creation_date}
            year="numeric"
            month="numeric"
            day="numeric"
          /> | </span> : ''}
          {expiration_date !== "" ? <b><FormattedMessage
            id="creditcard_card.expiration_date"
            defaultMessage="Expiration: "
          />{expiration_date}</b> : ''} */}
        </Card.Description>
      </Card.Content>
    </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCompleteProfileModal: () => dispatch(openCompleteProfileModal()),
  };
};

PriceProposalCard.propTypes = {
  pk: PropTypes.number,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceProposalCard);

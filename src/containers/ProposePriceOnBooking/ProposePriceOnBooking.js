import React from "react";
import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './proposepriceonbooking.css';
import { NavLink, Redirect } from "react-router-dom";
import { openProposePriceOnBooking, closeProposePriceOnBooking, proposePriceOnBooking } from "../../store/actions/proposePriceOnBooking";
import { deleteTrip } from "../../store/actions/addTrip";
import {Field, reset, reduxForm, formValueSelector} from 'redux-form';
import {renderField} from "../../containers/ReduxForm/renderField";
import { validate } from "./validation";

class ProposePriceOnBooking extends React.Component {

  submitForm = (val) => {
    const {userId, bookingId} = this.props;
    this.props.proposePrice(bookingId, userId, val['price']);
  }

  render() {
    const { open, handleSubmit } = this.props;
    return (
      <Modal
      closeIcon
        centered={false}
        open={open}
        onClose={() => this.props.closeProposePriceOnBooking()}
        onOpen={() => this.props.openProposePriceOnBooking()}
        size='tiny'
      >
      <Modal.Header>Propose price on booking</Modal.Header>
      <Modal.Content>
        <p>Enter the amount you propose to carry this product</p>
        <form onSubmit={handleSubmit(this.submitForm)}>
          <Field
            name="price"
            component="input"
            type="number"
            placeholder="000"
            label="Price"
            component={renderField}
          />
          <Button positive type="submit">
            Propose price (euros)
          </Button>
        </form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closeProposePriceOnBooking()}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.proposePriceOnBooking.open,
    bookingId: state.proposePriceOnBooking.bookingId,
    userId: state.userInfo.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openProposePriceOnBooking: () => dispatch(openProposePriceOnBooking()),
    closeProposePriceOnBooking: () => dispatch(closeProposePriceOnBooking()),
    proposePrice: (bookingId, userId, price) => dispatch(proposePriceOnBooking(bookingId, userId, price)),
  };
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ProposePriceOnBooking);

let ProposePriceOnBookingConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposePriceOnBooking);

ProposePriceOnBookingConnected = reduxForm ({
  form: 'propose_price',
  validate
}) (ProposePriceOnBookingConnected);

export default ProposePriceOnBookingConnected;

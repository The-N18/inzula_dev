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
import { openProposePriceOnBooking, closeProposePriceOnBooking } from "../../store/actions/proposePriceOnBooking";
import { deleteTrip } from "../../store/actions/addTrip";

class ProposePriceOnBooking extends React.Component {

  handlePropose = () => {
    this.props.closeProposePriceOnBooking();
  }

  render() {
    const { open } = this.props;
    return (
      <Modal
        centered={false}
        open={open}
        onClose={() => this.props.closeProposePriceOnBooking()}
        onOpen={() => this.props.openProposePriceOnBooking()}
        size='tiny'
      >
      <Modal.Header>Propose price on booking</Modal.Header>
      <Modal.Content>
        <p>Enter the amount you propose to carry this product</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closeProposePriceOnBooking()}>
          Cancel
        </Button>
        <Button positive onClick={this.handlePropose.bind(this)}>
          Propose
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openProposePriceOnBooking: () => dispatch(openProposePriceOnBooking()),
    closeProposePriceOnBooking: () => dispatch(closeProposePriceOnBooking()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposePriceOnBooking);

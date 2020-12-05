import React from "react";
import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './declinebooking.css';
import { NavLink, Redirect } from "react-router-dom";
import { openDeclineBooking, closeDeclineBooking, declineBooking } from "../../store/actions/declineBooking";

class DeclineBooking extends React.Component {

  handleDelete = () => {
    this.props.closeDeclineBooking();
    this.props.declineBooking(this.props.bookingId);
  }

  render() {
    const { open } = this.props;
    return (
      <Modal
        centered={false}
        open={open}
        onClose={() => this.props.closeDeclineBooking()}
        onOpen={() => this.props.openDeclineBooking()}
        size='tiny'
      >
      <Modal.Header>Decline booking</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to decline this booking?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closeDeclineBooking()}>
          No
        </Button>
        <Button positive onClick={this.handleDelete.bind(this)}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.declineBooking.open,
    bookingId: state.declineBooking.bookingId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDeclineBooking: () => dispatch(openDeclineBooking()),
    closeDeclineBooking: () => dispatch(closeDeclineBooking()),
    declineBooking: (bookingId) => dispatch(declineBooking(bookingId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeclineBooking);
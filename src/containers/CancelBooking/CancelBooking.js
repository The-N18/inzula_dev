import React from "react";
import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './cancelbooking.css';
import { openCancelBooking, closeCancelBooking, cancelBooking } from "../../store/actions/cancelBooking";

class CancelBooking extends React.Component {

  handleCancel = () => {
    const {bookingId, userId} = this.props;
    this.props.closeCancelBooking();
    this.props.cancelBooking(bookingId, userId);
  }

  render() {
    const { open } = this.props;
    return (
      <Modal
      closeIcon
        centered={false}
        open={open}
        onClose={() => this.props.closeCancelBooking()}
        onOpen={() => this.props.openCancelBooking()}
        size='tiny'
      >
      <Modal.Header>Cancel booking</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to cancel this booking?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closeCancelBooking()}>
          No
        </Button>
        <Button positive onClick={this.handleCancel.bind(this)}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.cancelBooking.open,
    bookingId: state.cancelBooking.bookingId,
    userId: state.userInfo.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCancelBooking: () => dispatch(openCancelBooking()),
    closeCancelBooking: () => dispatch(closeCancelBooking()),
    cancelBooking: (bookingId, userId) => dispatch(cancelBooking(bookingId, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CancelBooking);

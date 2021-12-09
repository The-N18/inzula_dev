import React from "react";
import {
  Button,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './cancelbooking.css';
import { openCancelBooking, closeCancelBooking, cancelBooking, getRefundAmt } from "../../store/actions/cancelBooking";
import {FormattedMessage} from 'react-intl'

class CancelBooking extends React.Component {

  // componentDidUpdate(prevProps) {
  //   const { bookingId } = this.props;
  //   if (prevProps.open === false && this.props.open === true) {
  //     this.props.getRefundAmt(bookingId);
  //   }
  // }

  handleCancel = () => {
    const {bookingId, userId} = this.props;
    this.props.closeCancelBooking();
    this.props.cancelBooking(bookingId, userId);
  }

  render() {
    const { open, refundAmt } = this.props;
    return (
      <Modal
      closeIcon
        centered={false}
        open={open}
        onClose={() => this.props.closeCancelBooking()}
        onOpen={() => this.props.openCancelBooking()}
        size='tiny'
      >
      <Modal.Header>
      <FormattedMessage
              id="cancel_booking.title"
              defaultMessage="Cancel booking"
            />
            </Modal.Header>
      <Modal.Content>
      <span>
        <FormattedMessage
              id="cancel_booking.msg"
              defaultMessage="Are you sure you want to cancel this booking?"
            /></span>
        <br/>
        <span>
        <FormattedMessage
          id="confirm_cancel_modal.msg"
          values={{ amount: `${refundAmt}` }}
        /></span>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closeCancelBooking()}>
          <FormattedMessage
              id="cancel_booking.no"
              defaultMessage="No"
            />
        </Button>
        <Button positive onClick={this.handleCancel.bind(this)}>
        <FormattedMessage
              id="cancel_booking.yes"
              defaultMessage="Yes"
            />
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
    refundAmt: state.cancelBooking.refundAmt,
    userId: state.userInfo.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRefundAmt: (id) => dispatch(getRefundAmt(id)),
    openCancelBooking: () => dispatch(openCancelBooking()),
    closeCancelBooking: () => dispatch(closeCancelBooking()),
    cancelBooking: (bookingId, userId) => dispatch(cancelBooking(bookingId, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CancelBooking);

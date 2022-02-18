import React from "react";
// import {
//   Button,
//   Modal
// } from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './cancelbooking.css';
import { openCancelBooking, closeCancelBooking, cancelBooking, getRefundAmt } from "../../store/actions/cancelBooking";
import {FormattedMessage} from 'react-intl'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
        isOpen={open} 
        onOpened={() => this.props.openCancelBooking()}
        onClosed={() => this.props.closeCancelBooking()}
        size="sm"
      >
        <ModalHeader toggle={() => this.props.closeCompleteProfileModal()}>
          <FormattedMessage
            id="cancel_booking.title"
            defaultMessage="Cancel booking"
          />
        </ModalHeader>
        <ModalBody>
          <span>
            <FormattedMessage
              id="cancel_booking.msg"
              defaultMessage="Are you sure you want to cancel this booking?"
            />
          </span>
          <br/>
          <span>
            <FormattedMessage
              id="confirm_cancel_modal.msg"
              values={{ amount: `${refundAmt}` }}
            />
          </span>
        </ModalBody>
        <ModalFooter>
          <Button variant="contained" color="success" onClick={this.handleCancel.bind(this)}>
            <FormattedMessage
              id="cancel_booking.yes"
              defaultMessage="Yes"
            />
          </Button>
          <Button variant="contained" color="danger" onClick={() => this.props.closeCancelBooking()}>
            <FormattedMessage
              id="cancel_booking.no"
              defaultMessage="No"
            />
          </Button>
        </ModalFooter>
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

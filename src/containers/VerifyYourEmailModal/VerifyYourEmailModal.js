import React from "react";
import {
  Button,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './cancelbooking.css';
import { openVerifyYourEmailBooking, closeVerifyYourEmailBooking } from "../../store/actions/verifyYourEmail";
import {FormattedMessage} from 'react-intl'

class VerifyYourEmail extends React.Component {

  handleCancel = () => {
    this.props.closeVerifyYourEmailBooking();
  }

  render() {
    const { open } = this.props;
    return (
      <Modal
      closeIcon
        centered={false}
        open={open}
        onClose={() => this.props.closeVerifyYourEmailBooking()}
        onOpen={() => this.props.openVerifyYourEmailBooking()}
        size='tiny'
      >
      <Modal.Header>
      <FormattedMessage
              id="cancel_booking.title"
              defaultMessage="Cancel booking"
            />
            </Modal.Header>
      <Modal.Content>
        <p>
        <FormattedMessage
              id="cancel_booking.msg"
              defaultMessage="Are you sure you want to cancel this booking?"
            /></p>
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
    userId: state.userInfo.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openVerifyYourEmailBooking: () => dispatch(openVerifyYourEmailBooking()),
    closeVerifyYourEmailBooking: () => dispatch(closeVerifyYourEmailBooking()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyYourEmailModal);

import React from "react";
import {
  Button,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './declinebooking.css';
import {FormattedMessage} from 'react-intl'
import { openDeclineBooking, closeDeclineBooking, declineBooking } from "../../store/actions/declineBooking";

class DeclineBooking extends React.Component {

  handleDelete = () => {
    const {bookingId, userId} = this.props;
    this.props.closeDeclineBooking();
    this.props.declineBooking(bookingId, userId);
  }

  render() {
    const { open } = this.props;
    return (
      <Modal
      closeIcon
        centered={false}
        open={open}
        onClose={() => this.props.closeDeclineBooking()}
        onOpen={() => this.props.openDeclineBooking()}
        size='tiny'
      >
      <Modal.Header>
      <FormattedMessage
              id="decline_booking.title"
              defaultMessage="Decline booking"
            />
            </Modal.Header>
      <Modal.Content>
        <p>
        <FormattedMessage
              id="decline_booking.msg"
              defaultMessage="Are you sure you want to decline this booking?"
            />
            </p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closeDeclineBooking()}>
        <FormattedMessage
              id="decline_booking.no"
              defaultMessage="No"
            />
        </Button>
        <Button positive onClick={this.handleDelete.bind(this)}>
        <FormattedMessage
              id="decline_booking.yes"
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
    open: state.declineBooking.open,
    bookingId: state.declineBooking.bookingId,
    userId: state.userInfo.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDeclineBooking: () => dispatch(openDeclineBooking()),
    closeDeclineBooking: () => dispatch(closeDeclineBooking()),
    declineBooking: (bookingId, userId) => dispatch(declineBooking(bookingId, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeclineBooking);

import React from "react";
// import {
//   Button,
//   Modal
// } from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './declinebooking.css';
import {FormattedMessage} from 'react-intl'
import { openDeclineBooking, closeDeclineBooking, declineBooking } from "../../store/actions/declineBooking";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
        isOpen={open} 
        onOpened={() => this.props.openDeclineBooking()}
        onClosed={() => this.props.closeDeclineBooking()}
        size="sm"
      >
        <ModalHeader toggle={() => this.props.closeCompleteProfileModal()}>
          <FormattedMessage
            id="decline_booking.title"
            defaultMessage="Decline booking"
          />
        </ModalHeader>
        <ModalBody>
          <p>
            <FormattedMessage
              id="decline_booking.msg"
              defaultMessage="Are you sure you want to decline this booking?"
            />
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="contained" color="success" onClick={this.handleDelete.bind(this)}>
            <FormattedMessage
              id="decline_booking.yes"
              defaultMessage="Yes"
            />
          </Button>
          <Button variant="contained" color="danger" onClick={() => this.props.closeDeclineBooking()}>
            <FormattedMessage
              id="decline_booking.no"
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

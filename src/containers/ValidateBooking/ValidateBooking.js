import React from "react";
// import {
//   Button,
//   Modal
// } from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './validatebooking.css';
import { openValidateBooking, closeValidateBooking, validateBooking } from "../../store/actions/validateBooking";
import {FormattedMessage} from 'react-intl'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ValidateBooking extends React.Component {

  handleDelete = () => {
    const {userId, bookingId} = this.props;
    this.props.closeValidateBooking();
    this.props.validateBooking(bookingId, userId);
  }

  render() {
    const { open } = this.props;
    return (


      <Modal 
        isOpen={open} 
        onOpened={() => this.props.openValidateBooking()}
        onClosed={() => this.props.closeValidateBooking()}
        size="sm"
      >
        <ModalHeader toggle={() => this.props.closeCompleteProfileModal()}>
          <FormattedMessage
            id="validate_booking.title"
            defaultMessage="Validate booking"
          />
        </ModalHeader>
        <ModalBody>
          <p>
            <FormattedMessage
              id="validate_booking.question"
              defaultMessage="Are you sure you want to validate this booking?"
            />
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="contained" color="success" onClick={this.handleDelete.bind(this)}>
            <FormattedMessage
              id="validate_booking.yes"
              defaultMessage="Yes"
            />
          </Button>
          <Button variant="contained" color="danger" onClick={() => this.props.closeValidateBooking()}>
            <FormattedMessage
              id="validate_booking.no"
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
    open: state.validateBooking.open,
    bookingId: state.validateBooking.bookingId,
    userId: state.userInfo.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openValidateBooking: () => dispatch(openValidateBooking()),
    closeValidateBooking: () => dispatch(closeValidateBooking()),
    validateBooking: (bookingId, userId) => dispatch(validateBooking(bookingId, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidateBooking);

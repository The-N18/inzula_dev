import React from "react";
// import {
//   Button,
//   Modal
// } from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './deletebookingconfirm.css';
import { openDeleteBookingConfirm, closeDeleteBookingConfirm } from "../../store/actions/deleteBookingConfirm";
import { deleteBooking } from "../../store/actions/addBooking";
import {FormattedMessage} from 'react-intl';


import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class DeleteBookingConfirm extends React.Component {

  handleDelete = () => {
    this.props.closeDeleteBookingConfirm();
    this.props.deleteBooking(this.props.bookingId);
  }

  render() {
    const { open } = this.props;
    return (

      <Modal 
        isOpen={open} 
        onOpened={() => this.props.openDeleteBookingConfirm()}
        onClosed={() => this.props.closeDeleteBookingConfirm()}
        size="sm"
        scrollable

      >
        <ModalHeader toggle={() => this.props.closeCompleteProfileModal()}>
          <FormattedMessage
            id="delete_booking.title"
            defaultMessage="Delete Booking"
          />
        </ModalHeader>
        <ModalBody>
          <p>
            <FormattedMessage
              id="delete_booking.msg"
              defaultMessage="Are you sure you want to delete this booking"
            />
          </p>
        </ModalBody>
        <ModalFooter>
          {/* <Button negative onClick={() => this.props.closeDeleteBookingConfirm()}>
            <FormattedMessage
              id="delete_booking.no"
              defaultMessage="No"
            />
          </Button> */}
          {/* <Button positive onClick={this.handleDelete.bind(this)}>
            <FormattedMessage
              id="delete_booking.yes"
              defaultMessage="Yes"
            />
          </Button> */}
          <Button variant="contained" color="success" onClick={this.handleDelete.bind(this)}>
            <FormattedMessage
              id="delete_booking.yes"
              defaultMessage="Yes"
            />
          </Button>
          <Button variant="contained" color="danger" onClick={() => this.props.closeDeleteBookingConfirm()}>
            <FormattedMessage
              id="delete_booking.no"
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
    open: state.deleteBookingConfirm.open,
    bookingId: state.deleteBookingConfirm.bookingId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDeleteBookingConfirm: () => dispatch(openDeleteBookingConfirm()),
    closeDeleteBookingConfirm: () => dispatch(closeDeleteBookingConfirm()),
    deleteBooking: (bookingId) => dispatch(deleteBooking(bookingId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteBookingConfirm);

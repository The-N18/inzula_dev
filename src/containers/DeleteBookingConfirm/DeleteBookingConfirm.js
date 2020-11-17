import React from "react";
import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './deletebookingconfirm.css';
import { NavLink, Redirect } from "react-router-dom";
import { openDeleteBookingConfirm, closeDeleteBookingConfirm } from "../../store/actions/deleteBookingConfirm";
import { deleteBooking } from "../../store/actions/addBooking";

class DeleteBookingConfirm extends React.Component {

  handleDelete = () => {
    this.props.closeDeleteBookingConfirm();
    this.props.deleteBooking(this.props.bookingId);
  }

  render() {
    const { open } = this.props;
    return (
      <Modal
        centered={false}
        open={open}
        onClose={() => this.props.closeDeleteBookingConfirm()}
        onOpen={() => this.props.openDeleteBookingConfirm()}
        size='tiny'
      >
      <Modal.Header>Delete Booking</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete this booking</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closeDeleteBookingConfirm()}>
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

import React from "react";
import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './validatebooking.css';
import { NavLink, Redirect } from "react-router-dom";
import { openValidateBooking, closeValidateBooking, validateBooking } from "../../store/actions/validateBooking";

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
        centered={false}
        open={open}
        onClose={() => this.props.closeValidateBooking()}
        onOpen={() => this.props.openValidateBooking()}
        size='tiny'
      >
      <Modal.Header>Validate booking</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to validate this booking?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closeValidateBooking()}>
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

import React from "react";
import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './deletetripconfirm.css';
import { NavLink, Redirect } from "react-router-dom";
import { openDeleteTripConfirm, closeDeleteTripConfirm } from "../../store/actions/deleteTripConfirm";
import { deleteTrip } from "../../store/actions/addTrip";

class DeleteTripConfirm extends React.Component {

  handleDelete = () => {
    this.props.closeDeleteTripConfirm();
    this.props.deleteTrip(this.props.tripId);
  }

  render() {
    const { open } = this.props;
    return (
      <Modal
      closeIcon
        centered={false}
        open={open}
        onClose={() => this.props.closeDeleteTripConfirm()}
        onOpen={() => this.props.openDeleteTripConfirm()}
        size='tiny'
      >
      <Modal.Header>Delete Trip</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete this trip</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closeDeleteTripConfirm()}>
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
    open: state.deleteTripConfirm.open,
    tripId: state.deleteTripConfirm.tripId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDeleteTripConfirm: () => dispatch(openDeleteTripConfirm()),
    closeDeleteTripConfirm: () => dispatch(closeDeleteTripConfirm()),
    deleteTrip: (tripId) => dispatch(deleteTrip(tripId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteTripConfirm);

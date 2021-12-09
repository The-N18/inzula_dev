import React from "react";
import {
  Button,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './deletetripconfirm.css';
import { openDeleteTripConfirm, closeDeleteTripConfirm } from "../../store/actions/deleteTripConfirm";
import { deleteTrip } from "../../store/actions/addTrip";
import {FormattedMessage} from 'react-intl';

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
      <Modal.Header><FormattedMessage
                id="delete_trip.title"
                defaultMessage="Delete trip"
              /></Modal.Header>
      <Modal.Content>
        <p><FormattedMessage
                id="delete_trip.msg"
                defaultMessage="Are you sure you want to delete this trip?"
              /></p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closeDeleteTripConfirm()}>
        <FormattedMessage
                id="delete_trip.no"
                defaultMessage="No"
              />
        </Button>
        <Button positive onClick={this.handleDelete.bind(this)}>
        <FormattedMessage
                id="delete_trip.yes"
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

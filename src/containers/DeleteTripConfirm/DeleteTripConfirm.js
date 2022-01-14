import React from "react";
// import {
//   Button,
//   Modal
// } from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './deletetripconfirm.css';
import { openDeleteTripConfirm, closeDeleteTripConfirm } from "../../store/actions/deleteTripConfirm";
import { deleteTrip } from "../../store/actions/addTrip";
import {FormattedMessage} from 'react-intl';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class DeleteTripConfirm extends React.Component {

  handleDelete = () => {
    this.props.closeDeleteTripConfirm();
    this.props.deleteTrip(this.props.tripId);
  }

  render() {
    const { open } = this.props;
    return (

    <Modal 
      isOpen={open} 
      onOpened={() => this.props.openDeleteTripConfirm()}
      onClosed={() => this.props.closeDeleteTripConfirm()}
      size="sm"
      scrollable

    >
      <ModalHeader toggle={() => this.props.closeCompleteProfileModal()}>
        <FormattedMessage
          id="delete_trip.title"
          defaultMessage="Delete trip"
        />
      </ModalHeader>
      <ModalBody>
        <p>
          <FormattedMessage
            id="delete_trip.msg"
            defaultMessage="Are you sure you want to delete this trip?"
          />
        </p>
      </ModalBody>
      <ModalFooter>
        <Button variant="contained" color="success" onClick={this.handleDelete.bind(this)}>
          <FormattedMessage
            id="delete_trip.yes"
            defaultMessage="Yes"
          />
        </Button>
        <Button variant="contained" color="danger" onClick={() => this.props.closeDeleteTripConfirm()}>
          <FormattedMessage
            id="delete_trip.no"
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

import React from "react";
import {
  Button,
  Segment,
  Modal,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import styles from './addtripmodal.css';
import { openAddTripModal, closeAddTripModal } from "../../store/actions/addTripModal";
import AddTripForm from "../AddTripFormRedux/AddTripForm";
import {FormattedMessage} from 'react-intl'
// import 'react-widgets/dist/css/react-widgets.css';

class AddTripModal extends React.Component {


render() {
  const { open } = this.props;
  return (
    <Modal
    closeIcon
      centered={false}
      open={open}
      onClose={() => this.props.closeAddTripModal()}
      onOpen={() => this.props.openAddTripModal()}
      size='tiny'
    >
      <Modal.Header>
      <FormattedMessage
        id="add_trip_modal.title"
        defaultMessage="Add Trip"
      />
      </Modal.Header>
      <Modal.Content scrolling>
    <Segment vertical>
      <AddTripForm />
    </Segment>
    </Modal.Content>
    <Modal.Actions>
      <Button negative onClick={() => this.props.openAddTripModal()} primary>
      <FormattedMessage
        id="add_trip_modal.cancel"
        defaultMessage="Cancel"
      /><Icon name='cancel' />
      </Button>
    </Modal.Actions>
    </Modal>
  );
}
}

const mapStateToProps = state => {
return {
  open: state.addTripModal.open,
};
};

const mapDispatchToProps = dispatch => {
return {
  closeAddTripModal: () => dispatch(closeAddTripModal()),
  openAddTripModal: () => dispatch(openAddTripModal()),
};
};


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTripModal));

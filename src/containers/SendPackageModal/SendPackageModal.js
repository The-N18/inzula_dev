import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
  Container,
  Step,
  Image,
  TextArea,
  Select,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authLogin } from "../../store/actions/auth";
import styles from './sendpackagemodal.css';
import PropTypes from "prop-types";
import { backend_url } from "../../configurations";
import ImageUploader from 'react-images-upload';
import { DateInput } from 'semantic-ui-calendar-react';
import {createNotification, NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notify';
import { openModal, closeModal } from "../../store/actions/sendPackageModal";
import SendPackage from "../../containers/SendPackageReduxForm/SendPackage";
import {FormattedMessage, FormattedDate} from 'react-intl'

class SendPackageModal extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
  }

  render() {
    const { open, tripId } = this.props;

    return (
      <Modal
      closeIcon
      centered={false}
      open={open}
      onClose={() => this.props.closePackageModal()}
      onOpen={() => this.props.openPackageModal()}
      size='large'
    >
      <Modal.Header><FormattedMessage
        id="add_booking.add_request"
        defaultMessage="Add a booking request"
      /></Modal.Header>
      <Modal.Content scrolling>
          <SendPackage tripId={tripId}/>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closePackageModal()} primary>
          <FormattedMessage
            id="add_booking.cancel"
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
    open: state.sendPackageModal.open,
    tripId: state.sendPackageModal.tripId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPackageModal: () => dispatch(openModal()),
    closePackageModal: () => dispatch(closeModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendPackageModal);

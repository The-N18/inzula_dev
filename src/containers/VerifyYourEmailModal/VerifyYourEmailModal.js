import React from "react";
// import {
//   Button,
//   Modal
// } from "semantic-ui-react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { connect } from "react-redux";
// import styles from './cancelbooking.css';
import { openVerifyYourEmail, closeVerifyYourEmail } from "../../store/actions/verifyYourEmail";
import {FormattedMessage} from 'react-intl'

class VerifyYourEmailModal extends React.Component {

  handleCancel = () => {
    this.props.closeVerifyYourEmail();
  }

  render() {
    const { open } = this.props;
    const toggle = () => this.props.closeVerifyYourEmail();

    return (

      <Modal isOpen={open} >
        <ModalHeader toggle={toggle.bind(this)}>
          <FormattedMessage
            id="verify_email_confirm.title"
            defaultMessage="Cancel booking"
          />
        </ModalHeader>
        <ModalBody>
          <span>
            <FormattedMessage
              id="verify_email_confirm.msg"
              defaultMessage="Are you sure you want to cancel this booking?"
            />
          </span>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle.bind(this)}>ok</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.verifyYourEmail.open,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openVerifyYourEmail: () => dispatch(openVerifyYourEmail()),
    closeVerifyYourEmail: () => dispatch(closeVerifyYourEmail()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyYourEmailModal);
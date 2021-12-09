import React from "react";
import {
  Button,
  Modal
} from "semantic-ui-react";
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
    return (
      <Modal
      closeIcon
        centered={false}
        open={open}
        onClose={() => this.props.closeVerifyYourEmail()}
        onOpen={() => this.props.openVerifyYourEmail()}
        size='tiny'
      >
      <Modal.Header>
      <FormattedMessage
              id="verify_email_confirm.title"
              defaultMessage="Cancel booking"
            />
            </Modal.Header>
      <Modal.Content>
        <span>
        <FormattedMessage
              id="verify_email_confirm.msg"
              defaultMessage="Are you sure you want to cancel this booking?"
            /></span>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={this.handleCancel.bind(this)}>
        <FormattedMessage
              id="verify_email_confirm.yes"
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

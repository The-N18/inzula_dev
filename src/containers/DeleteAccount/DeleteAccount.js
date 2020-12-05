import React from "react";
import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './deleteaccount.css';
import { NavLink, Redirect } from "react-router-dom";
import { openDeleteAccount, closeDeleteAccount } from "../../store/actions/deleteAccount";
import { deleteAccount } from "../../store/actions/auth";

class DeleteAccount extends React.Component {

  handleDelete = () => {
    this.props.closeDeleteAccount();
    this.props.deleteAccount(this.props.userProfileId);
  }

  render() {
    const { open } = this.props;
    return (
      <Modal
        centered={false}
        open={open}
        onClose={() => this.props.closeDeleteAccount()}
        onOpen={() => this.props.openDeleteAccount()}
        size='tiny'
      >
      <Modal.Header>Decline your account</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete your account?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closeDeleteAccount()}>
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
    open: state.deleteAccount.open,
    userProfileId: state.userInfo.userProfileId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDeleteAccount: () => dispatch(openDeleteAccount()),
    closeDeleteAccount: () => dispatch(closeDeleteAccount()),
    deleteAccount: (userId) => dispatch(deleteAccount(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAccount);

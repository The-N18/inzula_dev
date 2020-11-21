import React from "react";
import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './loginparentmodal.css';
import { NavLink, Redirect } from "react-router-dom";
import { openLoginParentModal, closeLoginParentModal } from "../../store/actions/loginParentModal";
import { openLoginModal } from "../../store/actions/loginModal";
import { openSignupParentModal } from "../../store/actions/signupParentModal";

class LoginParentModal extends React.Component {

  handleSignup = () => {
    this.props.closeLoginParentModal();
    this.props.openSignupParentModal();
  }

  render() {
    const { open } = this.props;
    return (
      <Modal
        centered={false}
        open={open}
        onClose={() => this.props.closeLoginParentModal()}
        onOpen={() => this.props.openLoginParentModal()}
        size='large'
      >
        <Modal.Header>
        Sign in
        </Modal.Header>
        <Modal.Content scrolling>
      <Segment basic style={{ padding: "8em 0em" }} textAlign="center">
        <Segment basic textAlign="center" className={"signupparent-segment"}>
        <Segment raised className={"signupparentcard"} textAlign="center">
          <Button fluid color='facebook' className={"signupparent-button"}>
            <Icon name='facebook' /> Sign in with Facebook
          </Button>
          <Button fluid color='google plus' className={"signupparent-button"}>
            <Icon name='google plus' /> Sign in with Gmail
          </Button>
          <Button fluid className={"signupparent-button"} onClick={() => this.props.openLoginModal()}>
            <Icon name='mail' /> Use username
          </Button>
        </Segment>
        <Segment raised className={"signupparentcard"} textAlign="center">
          Not yet a member? <span className={"mimic-anchor"} onClick={this.handleSignup.bind(this)}>Sign up</span>
        </Segment>
      </Segment>
      </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closeLoginParentModal()} primary>
          Cancel <Icon name='cancel' />
        </Button>
      </Modal.Actions>
    </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.loginParentModal.open,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openLoginParentModal: () => dispatch(openLoginParentModal()),
    closeLoginParentModal: () => dispatch(closeLoginParentModal()),
    openLoginModal: () => dispatch(openLoginModal()),
    openSignupParentModal: () => dispatch(openSignupParentModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginParentModal);

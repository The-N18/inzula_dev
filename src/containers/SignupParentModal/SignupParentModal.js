import React from "react";
import {
  Segment,
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './signupparentmodal.css';
import { NavLink, Redirect } from "react-router-dom";
import { openSignupParentModal, closeSignupParentModal } from "../../store/actions/signupParentModal";
import { openSignupModal } from "../../store/actions/signupModal";
import { openLoginParentModal } from "../../store/actions/loginParentModal";


class SignupParentModal extends React.Component {

  handleSignin = () => {
    this.props.closeSignupParentModal();
    this.props.openLoginParentModal();
  }

  render() {
    const { open } = this.props;

    return (
      <Modal
        centered={false}
        open={open}
        onClose={() => this.props.closeSignupParentModal()}
        onOpen={() => this.props.openSignupParentModal()}
        size='large'
      >
        <Modal.Header>
        Signup
        </Modal.Header>
        <Modal.Content scrolling>
      <Segment basic style={{ padding: "6em 0em" }} textAlign="center">
        <Segment basic textAlign="center" className={"signupparent-segment"}>
        <Segment raised className={"signupparentcard"} textAlign="center">
          <Button fluid color='facebook' className={"signupparent-button"}>
            <Icon name='facebook' /> Sign up with Facebook
          </Button>
          <Button fluid color='google plus' className={"signupparent-button"}>
            <Icon name='google plus' /> Sign up with Gmail
          </Button>
          <Button fluid color='white' className={"signupparent-button"} onClick={() => this.props.openSignupModal()}>
            <Icon name='mail' /> Use email address
          </Button>
        </Segment>
        <Segment raised className={"signupparentcard"} textAlign="center">
          Already a member? <span className={"mimic-anchor"} onClick={this.handleSignin.bind(this)}>Sign in</span>
        </Segment>
      </Segment>
      </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => this.props.closeSignupParentModal()} primary>
          Cancel <Icon name='cancel right' />
        </Button>
      </Modal.Actions>
    </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.signupParentModal.open,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openSignupParentModal: () => dispatch(openSignupParentModal()),
    closeSignupParentModal: () => dispatch(closeSignupParentModal()),
    openSignupModal: () => dispatch(openSignupModal()),
    openLoginParentModal: () => dispatch(openLoginParentModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupParentModal);

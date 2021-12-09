import React from "react";
import {
  Button,
  Segment,
  Modal,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import styles from './completeprofilemodal.css';
import { openCompleteProfileModal, closeCompleteProfileModal } from "../../store/actions/completeProfileModal";
import CompleteProfileForm from "../CompleteProfileForm/CompleteProfileForm";
import {FormattedMessage} from 'react-intl'
// import 'react-widgets/dist/css/react-widgets.css';

class CompleteProfileModal extends React.Component {

  goToProfile = () => {
    this.props.history.push('/profile');
    this.props.closeCompleteProfileModal();
  }

render() {
  const { open } = this.props;
  return (
    <Modal
    closeIcon
      centered={false}
      open={open}
      onClose={() => this.props.closeCompleteProfileModal()}
      onOpen={() => this.props.openCompleteProfileModal()}
      size='tiny'
    >
      <Modal.Header>
      <FormattedMessage
        id="complete_profile_modal.title"
        defaultMessage="Update your profile"
      />
      </Modal.Header>
      <Modal.Content scrolling>
    <Segment vertical>
      <span className={"profile-link"} onClick={this.goToProfile.bind(this)}>
        <FormattedMessage
          id="complete_profile_modal.msg"
          defaultMessage="see my profile"
        />
      </span>
      <CompleteProfileForm />
    </Segment>
    </Modal.Content>
    <Modal.Actions>
      <Button negative onClick={() => this.props.closeCompleteProfileModal()} primary>
      <FormattedMessage
        id="complete_profile_modal.cancel"
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
  open: state.completeProfileModal.open,
};
};

const mapDispatchToProps = dispatch => {
return {
  closeCompleteProfileModal: () => dispatch(closeCompleteProfileModal()),
  openCompleteProfileModal: () => dispatch(openCompleteProfileModal()),
};
};


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CompleteProfileModal));

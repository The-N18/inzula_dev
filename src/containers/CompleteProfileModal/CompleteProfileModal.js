import React from "react";
import {
  Segment,
  Icon,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styles from './completeprofilemodal.css';
import { openCompleteProfileModal, closeCompleteProfileModal } from "../../store/actions/completeProfileModal";
import CompleteProfileForm from "../CompleteProfileForm/CompleteProfileForm";
import {FormattedMessage} from 'react-intl'
import 'react-widgets/dist/css/react-widgets.css';

import {  Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class CompleteProfileModal extends React.Component {

  goToProfile = () => {
    this.props.history.push('dashboard/profile');
    this.props.closeCompleteProfileModal();
  }

render() {
  const { open } = this.props;
  console.log("CompleteProfileModal OPEN",open);
  return (
    <Modal 
      isOpen={open} 
      onOpened={() => this.props.openCompleteProfileModal()}
      onClosed={() => this.props.closeCompleteProfileModal()}
      size="sm"
      scrollable

    >
        <ModalHeader toggle={() => this.props.closeCompleteProfileModal()}>
          <FormattedMessage
          id="complete_profile_modal.title"
          defaultMessage="Update your profile"
          />
        </ModalHeader>
        <ModalBody>
          <Segment vertical>
            {/* <span className={"profile-link"} onClick={this.goToProfile.bind(this)}>
              <FormattedMessage
                id="complete_profile_modal.msg"
                defaultMessage="see my profile"
              />
            </span> */}
            {/* <CompleteProfileForm /> */}
            Veuillez compléter les informations de votre profile
          </Segment>
        </ModalBody>
        <ModalFooter>
          <Button variant="contained" color="success" onClick={() => {localStorage.setItem("completeProfile","false");this.props.closeCompleteProfileModal()}}>
            Ok
          </Button>
        </ModalFooter>
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

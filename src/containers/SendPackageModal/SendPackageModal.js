import React from "react";
import {
  Button,
  Icon,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './sendpackagemodal.css';
import { openModal, closeModal } from "../../store/actions/sendPackageModal";
import SendPackage from "../../containers/SendPackageReduxForm/SendPackage";
import {FormattedMessage} from 'react-intl'
import $ from "jquery"

class SendPackageModal extends React.Component {

  constructor(props) {
    super(props)

  }

  state = {
  }

  handleclosePackageModal = () => {

    $("#sendPackage").modal("hide");
    this.props.closePackageModal()
    this.child.handleResetModal();
  }

  render() {
    const { open, tripId } = this.props;

    return (
      <div className="modal fade"  id="sendPackage" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static"  data-keyboard="false">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header p-4">
              <button type="button" className="close" data-dismiss="modal" onClick={this.handleclosePackageModal.bind(this)} aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body p-0">
              <div className="login-content p-4">
                <SendPackage onRef={ref => (this.child = ref)} tripId={tripId}/>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={this.handleclosePackageModal.bind(this)} >Annuler</button>
            </div>
          </div>
        </div>
      </div>
 
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
    closePackageModal: () => {console.log("CLOOOOOSE MODAL"); dispatch(closeModal())},
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendPackageModal);

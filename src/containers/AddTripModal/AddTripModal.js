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

import $ from 'jquery';
window.jQuery = $;
require('bootstrap');


class AddTripModal extends React.Component {

 closeAddTripModal = () => {
   console.log("In CLOSEADDTRIP")
  $("#addTrip").modal("hide");
  this.child.handleResetModal();
}

render() {
  const { open } = this.props;
  return (
        <div className="modal fade"  id="addTrip" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static"  data-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
              <div className="modal-content" style={{height:"55%"}}>
                  <div className="modal-header p-4">
                    <FormattedMessage
                      id="add_trip_modal.title"
                      defaultMessage="Add Trip"
                    />
                    <button type="button" className="close" data-dismiss="modal" onClick={this.closeAddTripModal} aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body p-0">
                    <div className="login-content p-4">
                        {/* <div className="dashboard-content">
                            <div className="add-listing">   
                            <div className="listing-main">
                                <div className="addlist-inner mb-3">
                                <div className="addlist-title">
                                    <h4 className="m-0"><i className="fa fa-cube pr-2" />Détails du colis</h4>
                                </div>
                                <div className="addlist-content bg-white">
                                <p>PAPEUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU</p>
                     
                                </div>
                                </div>
                            </div>
                            </div>
                        </div> */}
                        <AddTripForm isModal={true} onRef={ref => (this.child = ref)} /> 
                    </div>
                  </div>
                  <div class="modal-footer">
                  <button type="button" class="btn btn-danger"  onClick={this.closeAddTripModal} >Annuler</button>
                  </div>
              </div>
            </div>
        </div>
  
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

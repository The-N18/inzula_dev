import React from "react";
// import {
//   Button,
//   Modal
// } from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './CanclePriceProposalConfirm.css';
import {FormattedMessage} from 'react-intl';


import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { canclePriceProposal, closeCanclePriceProposalConfirm, openCanclePriceProposalConfirm, refusePriceProposal } from "../../store/actions/CanclePriceProposalConfirm";

class CanclePriceProposalConfirm extends React.Component {

  handleDelete = () => {
    const { isCancle, bookingId, priceProposalID } = this.props;

    isCancle? this.props.canclePriceProposal(bookingId) : this.props.refusePriceProposal(priceProposalID)
  }

  render() {
    const { open, isCancle } = this.props;
    return (

      <Modal 
        isOpen={open} 
        onOpened={() => this.props.openCanclePriceProposalConfirm(isCancle)}
        onClosed={() => this.props.closeCanclePriceProposalConfirm()}
        size="sm"
        scrollable

      >
        <ModalHeader toggle={() => this.props.closeCanclePriceProposalConfirm()}>
          {/* <FormattedMessage
            id="delete_booking.title"
            defaultMessage="Delete Booking"
          /> */}
          {isCancle?`Annuler Proposition`:`Refuser Proposition`}
        </ModalHeader>
        <ModalBody>
          <p>
            {/* <FormattedMessage
              id="delete_booking.msg"
              defaultMessage="Are you sure you want to delete this booking"
            /> */}
            {isCancle?`Êtes-vous sûr de vouloir annuler votre proposition?`:`Êtes-vous sûr de vouloir refuser cette proposition?`}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="contained" color="success" onClick={this.handleDelete.bind(this)}>
            <FormattedMessage
              id="delete_booking.yes"
              defaultMessage="Yes"
            />
          </Button>
          <Button variant="contained" color="danger" onClick={() => this.props.closeCanclePriceProposalConfirm()}>
            <FormattedMessage
              id="delete_booking.no"
              defaultMessage="No"
            />
          </Button>
        </ModalFooter>
      </Modal>

    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.canclePriceProposalConfirm.open,
    priceProposalID: state.canclePriceProposalConfirm.priceProposalID,
    bookingId: state.canclePriceProposalConfirm.bookingId,
    isCancle: state.canclePriceProposalConfirm.isCancle,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCanclePriceProposalConfirm: (isCancle) => dispatch(openCanclePriceProposalConfirm(isCancle)),
    closeCanclePriceProposalConfirm: () => dispatch(closeCanclePriceProposalConfirm()),
    canclePriceProposal: (bookingId) => dispatch(canclePriceProposal(bookingId)),
    refusePriceProposal: (priceProposalID) => dispatch(refusePriceProposal(priceProposalID)),
  };
};
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CanclePriceProposalConfirm);

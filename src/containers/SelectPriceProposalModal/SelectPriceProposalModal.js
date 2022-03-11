import React from "react";
import {
  Segment,
  Button,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './selectcreditcard.css';
import $ from "jquery";
import {FormattedMessage} from 'react-intl'
import { closeSelectPriceProposal, getProposals, openSelectPriceProposal, selectSingleProposal } from "../../store/actions/SelectPriceProposalModal";
import { openCanclePriceProposalConfirm, refusePriceProposal, setPriceProposalId } from "../../store/actions/CanclePriceProposalConfirm";
import PriceProposalCard from "../PriceProposalCard/PriceProposalCard";


class SelectPriceProposalModal extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    isMobile: false,
    isTablet: false
  };

  handleScreenSize = () => {
    if($(window).width() < 768) {
      this.setState({ isMobile: true });
    }
    if($(window).width() >= 768 && $(window).width() <= 950) {
      this.setState({ isTablet: true });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreenSize);
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
  }

  componentDidUpdate(prevProps) {
    const { userId, bookingId } = this.props;
    if (prevProps.open === false && this.props.open === true) {
      this.props.getProposals(bookingId);
    }
    if (prevProps.open === true && this.props.open === false) {
      this.props.selectSingleProposal(null);
    }
  }

  selectProposal = (item) => {
    this.props.selectSingleProposal(item['pk'])
  }

  openRefusePriceProposalConfirm = () => {
    this.props.setPriceProposalId(this.props.selectedProposalId);
  }


  getDivHeight = () => {
      const { isMobile, isTablet } = this.state;
      let val = 240;
      if(isTablet) {
        val = 300;
      }
      if(isMobile) {
        val = 445;
      }
      return val;
    }

  handleCloseSelectPriceProposalModal = () => {
    // $('#proposePriceOnBooking').off('hidden.bs.modal')
    // $('#selectPrriceProposal').on('hidden.bs.modal', function () {
    //   $('#proposePriceOnBooking').modal("show");
    // });
    // $('#selectPrriceProposal').modal('hide');

    $('#selectPriceProposalModal').off('hidden.bs.modal')
    $('#selectPriceProposalModal').modal('hide');
    this.props.closeSelectPriceProposal();
  }

  proposePrice = () => {
    const {userId, bookingId, proposedPrice, proposedTripId} = this.props;
    this.props.proposePrice(bookingId, userId, proposedPrice, proposedTripId);
  }

  render() {
    const { open, loading, priceProposals, selectedProposalId } = this.props;
    return (
      // console.log.
    <div className="modal fade"  id="selectPriceProposalModal" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static"  data-keyboard="false">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header p-4">
            <Modal.Header>
              {/* <p><FormattedMessage
                id="select_credit_card.title"
                defaultMessage="Select credit card"
              /></p> */}
              Selectionnez une Proposition
            </Modal.Header>
          </div>
          <div className="modal-body p-0">
            <Segment basic>
              {priceProposals.length === 0 ? <div>
                {/* <FormattedMessage
                id="my_funds.no_cards"
                defaultMessage="You do not have any cards."
              /> */}
              Vous n'avez pas de Proposition pour cette requête
              </div> : <div
                id="scrollableDiv"
                style={{
                  height: 400,
                  overflow: 'auto',
                }}
              >
              {priceProposals.map((item, index) => (
                <div style={{
                  height: this.getDivHeight.bind(this),
                  margin: 6,
                  padding: 8
                }} key={index}>
                    <PriceProposalCard
                      key={index}
                      author={item["request_by"]["username"]}
                      pk={item["pk"]}
                      price={item["price"]}
                      productName={item["booking_request"]["product_name"]}
                      onclick={this.selectProposal.bind(this, item)}/>
                    </div>
                  ))}
              </div>}
            </Segment>
          </div>
          <div class="modal-footer">
            <Button color='green' onClick={this.proposePrice.bind(this)} disabled={selectedProposalId === null || loading}>
              {/* <FormattedMessage
                id="select_credit_card.pay"
                defaultMessage="Pay"
              /> */}
              Accepter
            </Button>
            <Button negative onClick={this.openRefusePriceProposalConfirm.bind(this)} disabled={selectedProposalId === null || loading}>
              Refuser
            </Button>
            <Button color='orange' onClick={this.handleCloseSelectPriceProposalModal.bind(this)} >
              <FormattedMessage
                id="select_credit_card.cancel"
                defaultMessage="Cancel"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.selectPriceProposalModal.open,
    loading: state.selectPriceProposalModal.loading,
    priceProposals: state.selectPriceProposalModal.priceProposals,
    selectedProposalId: state.selectPriceProposalModal.selectedProposalId,
    bookingId: state.selectPriceProposalModal.bookingId,
    userId: state.userInfo.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openSelectPriceProposal: (bookingId) => dispatch(openSelectPriceProposal(bookingId)),
    getProposals: (bookingId) => dispatch(getProposals(bookingId)),
    selectSingleProposal: (selectedProposalId) => dispatch(selectSingleProposal(selectedProposalId)),
    closeSelectPriceProposal : () => dispatch(closeSelectPriceProposal()),
    openRefusePriceProposalConfirm: () => dispatch(openCanclePriceProposalConfirm()),
    setPriceProposalId: () => dispatch(setPriceProposalId()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPriceProposalModal);

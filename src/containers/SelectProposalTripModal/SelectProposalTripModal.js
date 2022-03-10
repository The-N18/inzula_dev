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
import ProposalTripCard from "../ProposalTripCard/ProposalTripCard";
import { closeSelectProposalTrip, getProposalTrips, openSelectProposalTrip, selectSingleTrip } from "../../store/actions/SelectProposalTripModal";
import { proposePriceOnBooking } from "../../store/actions/proposePriceOnBooking";


class SelectProposalTripModal extends React.Component {

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
      this.props.getProposalTrips(userId, bookingId);
    }
    if (prevProps.open === true && this.props.open === false) {
      this.props.selectSingleTrip(null);
    }
  }

  selectTrip = (item) => {
    this.props.selectSingleTrip(item['pk'])
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

  handleCloseSelectProposalTripModal = () => {
    $('#proposePriceOnBooking').off('hidden.bs.modal')
    $('#selectProposalTripModal').on('hidden.bs.modal', function () {
      $('#proposePriceOnBooking').modal("show");
    });
    $('#selectProposalTripModal').modal('hide');
    this.props.closeSelectProposalTripModal();
  }

  proposePrice = () => {
    const {userId, bookingId, proposedPrice, proposedTripId} = this.props;
    this.props.proposePrice(bookingId, userId, proposedPrice, proposedTripId);
  }

  render() {
    const { open, loading, proposalTrips, proposedTripId } = this.props;
    return (

    <div className="modal fade"  id="selectProposalTripModal" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static"  data-keyboard="false">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header p-4">
            <Modal.Header>
              {/* <p><FormattedMessage
                id="select_credit_card.title"
                defaultMessage="Select credit card"
              /></p> */}
              Selectionnez un voyage
            </Modal.Header>
          </div>
          <div className="modal-body p-0">
            <Segment basic>
              {proposalTrips.length === 0 ? <div>
                {/* <FormattedMessage
                id="my_funds.no_cards"
                defaultMessage="You do not have any cards."
              /> */}
              Vous n'avez pas de voyage correspondant à cette requête
              </div> : <div
                id="scrollableDiv"
                style={{
                  height: 400,
                  overflow: 'auto',
                }}
              >
              {proposalTrips.map((item, index) => (
                <div style={{
                  height: this.getDivHeight.bind(this),
                  margin: 6,
                  padding: 8
                }} key={index}>
                    <ProposalTripCard
                      key={index}
                      trip_type={item["trip_type"]}
                      pk={item["pk"]}
                      comeback_date={item["comeback_date"]}
                      depart_date={item["depart_date"]}
                      departure_location={item["departure_location"]}
                      destination_location={item["destination_location"]}
                      img={item["created_by"]["profile_pic"] === null ? '' : item["created_by"]["profile_pic"]}
                      creator_user_name={item["creator_user_name"]}
                      onclick={this.selectTrip.bind(this, item)}/>
                    </div>
                  ))}
              </div>}
            </Segment>
          </div>
          <div class="modal-footer">
            <Button color='green' onClick={this.proposePrice.bind(this)} disabled={proposedTripId === null || loading}>
              {/* <FormattedMessage
                id="select_credit_card.pay"
                defaultMessage="Pay"
              /> */}
              Proposer
            </Button>
            <Button negative onClick={this.handleCloseSelectProposalTripModal.bind(this)}>
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
    open: state.selectProposalTripModal.open,
    loading: state.selectProposalTripModal.loading,
    proposalTrips: state.selectProposalTripModal.proposalTrips,
    proposedTripId: state.selectProposalTripModal.proposedTripId,
    bookingId: state.proposePriceOnBooking.bookingId,
    userId: state.userInfo.userId,
    proposedPrice : state.proposePriceOnBooking.proposedPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openSelectProposalTrip: () => dispatch(openSelectProposalTrip()),
    getProposalTrips: (userId, bookingId) => dispatch(getProposalTrips(userId, bookingId)),
    selectSingleTrip: (proposedTripId) => dispatch(selectSingleTrip(proposedTripId)),
    proposePrice: (bookingId, userId, price, proposedTripId) => dispatch(proposePriceOnBooking(bookingId, userId, price, proposedTripId)),
    closeSelectProposalTripModal : () => dispatch(closeSelectProposalTrip())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectProposalTripModal);

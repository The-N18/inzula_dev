import React from "react";
import {
  Button,
  Container,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './proposepriceonbooking.css';
import { openProposePriceOnBooking, closeProposePriceOnBooking, proposePriceOnBooking, setProposedPrice } from "../../store/actions/proposePriceOnBooking";
import {Field, reset, reduxForm} from 'redux-form';
import {renderField} from "../../containers/ReduxForm/renderField";
import { validate } from "./validation";
import {FormattedMessage} from 'react-intl'

import $ from "jquery";
import { calculateMinPrice } from "../../utils/options";
import { openSelectProposalTrip } from "../../store/actions/SelectProposalTripModal";

class ProposePriceOnBooking extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.open === false && this.props.open === true) {
      this.getMinProposalPrice();
    }
  }


  openSelectProposalTripModal = (val) => {

    $('#proposePriceOnBooking').off('hidden.bs.modal')
    $('#selectProposalTripModal').off('hidden.bs.modal')
    $('#proposePriceOnBooking').on('hidden.bs.modal', function () {
      $('#selectProposalTripModal').modal("show");
    });
    $('#proposePriceOnBooking').modal('hide');
    this.props.setProposedPrice(parseFloat(val['price']));
    this.props.openSelectProposalTrip();
    // this.props.closeProposePriceOnBooking();
  }

  closeProposePriceOnBooking = () => {
    $('#proposePriceOnBooking').off('hidden.bs.modal');
    $('#selectProposalTripModal').off('hidden.bs.modal');
    $('#proposePriceOnBooking').modal('hide');
    this.props.closeProposePriceOnBooking();
    localStorage.removeItem("minProposalPrice");
    this.handleResetModal();
  }

  handleResetModal = ()=>{
    const {reset,initialize}=this.props;
    initialize();
    
  }

  getMinProposalPrice = () => {
    const { bookingId, bookings } = this.props;
    console.log("IN getMinProposalPrice",bookings, bookingId);

    const selectedBooking = bookings.find(x => x.pk === bookingId);
    var minPrice = null;

    minPrice = calculateMinPrice(
      selectedBooking["product"]["weight"],
      selectedBooking["product"]["space"],
      selectedBooking["product"]["product_category"],
      selectedBooking["product"]["price"],
      true
    )

    localStorage.setItem("minProposalPrice",minPrice);
  }

  render() {
    const { open, handleSubmit, invalid } = this.props;
    return (

      <div className="modal fade"  id="proposePriceOnBooking" tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="static"  data-keyboard="false">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header p-4">
              <Modal.Header>
                <FormattedMessage
                  id="propose_price.title"
                  defaultMessage="Propose price on booking"
                />
              </Modal.Header>
            </div>
            <div className="modal-body p-0">
              <Container>
                <p>
                  <FormattedMessage
                    id="propose_price.sub_title"
                    defaultMessage="Enter the amount you propose to carry this product (In euros)"
                  />
                </p>
                <form onSubmit={handleSubmit(this.openSelectProposalTripModal)}>
                  <Field
                    name="price"
                    component="input"
                    type="number"
                    placeholder="000"
                    label="Price"
                    component={renderField}
                  />
                  <Button positive type="submit" disabled={invalid}>
                  <FormattedMessage
                    id="propose_price.propose_price"
                    defaultMessage="Validate"
                  />
                  </Button>
                </form>
              </Container>
              
            </div>
            <div class="modal-footer">
            <Button negative onClick={this.closeProposePriceOnBooking.bind(this)}>
              <FormattedMessage
                id="propose_price.cancel"
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
    open: state.proposePriceOnBooking.open,
    bookingId: state.proposePriceOnBooking.bookingId,
    userId: state.userInfo.userId,
    bookings: state.searchBookings.bookings,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openProposePriceOnBooking: () => dispatch(openProposePriceOnBooking()),
    closeProposePriceOnBooking: () => dispatch(closeProposePriceOnBooking()),
    setProposedPrice: (proposedPrice) => dispatch(setProposedPrice(proposedPrice)),
    openSelectProposalTrip: () => dispatch(openSelectProposalTrip()),
  };
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ProposePriceOnBooking);

let ProposePriceOnBookingConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposePriceOnBooking);

const afterSubmit = (result, dispatch) => dispatch(reset('propose_price'));

ProposePriceOnBookingConnected = reduxForm ({
  form: 'propose_price',
  onSubmitSuccess: afterSubmit,
  destroyOnUnmount:false,
  enableReinitialize: true,
  validate
}) (ProposePriceOnBookingConnected);

export default ProposePriceOnBookingConnected;

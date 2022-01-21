import React from "react";
import {
  Button,
  Container,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './proposepriceonbooking.css';
import { openProposePriceOnBooking, closeProposePriceOnBooking, proposePriceOnBooking } from "../../store/actions/proposePriceOnBooking";
import {Field, reset, reduxForm} from 'redux-form';
import {renderField} from "../../containers/ReduxForm/renderField";
import { validate } from "./validation";
import {FormattedMessage} from 'react-intl'

import $ from "jquery";

class ProposePriceOnBooking extends React.Component {

  submitForm = (val) => {
    const {userId, bookingId} = this.props;
    this.props.proposePrice(bookingId, userId, val['price']);
  }

  render() {
    const { open, handleSubmit } = this.props;
    return (

      <div className="modal fade"  id="proposePriceOnBooking" tabIndex={-1} role="dialog" aria-hidden="true">
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
                    defaultMessage="Enter the amount you propose to carry this product"
                  />
                </p>
                <form onSubmit={handleSubmit(this.submitForm)}>
                  <Field
                    name="price"
                    component="input"
                    type="number"
                    placeholder="000"
                    label="Price"
                    component={renderField}
                  />
                  <Button positive type="submit">
                  <FormattedMessage
                    id="propose_price.propose_price"
                    defaultMessage="Propose price (euros)"
                  />
                  </Button>
                </form>
              </Container>
              
            </div>
            <div class="modal-footer">
            <Button negative onClick={() => {$("#proposePriceOnBooking").modal("hide"); this.props.closeProposePriceOnBooking()}}>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openProposePriceOnBooking: () => dispatch(openProposePriceOnBooking()),
    closeProposePriceOnBooking: () => dispatch(closeProposePriceOnBooking()),
    proposePrice: (bookingId, userId, price) => dispatch(proposePriceOnBooking(bookingId, userId, price)),
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
  form: 'propose_price', onSubmitSuccess: afterSubmit,
  validate
}) (ProposePriceOnBookingConnected);

export default ProposePriceOnBookingConnected;

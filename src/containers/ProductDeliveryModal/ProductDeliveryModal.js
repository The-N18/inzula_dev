import React from "react";
import {
  Button
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './productdeliverymodal.css';
import { openProductDeliveryModal, closeProductDeliveryModal, submitDeliveryCode } from "../../store/actions/productDeliveryModal";
import {Field, reduxForm} from 'redux-form';
import {renderField} from "../ReduxForm/renderField";
import { validate } from "./validation";
import {FormattedMessage} from 'react-intl'

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ProductDeliveryModal extends React.Component {

  submitForm = (val) => {
    const {userId} = this.props;
    this.props.submitDeliveryCode(userId, val['code']);
  }

  render() {
    const { open, handleSubmit } = this.props;
    return (

      <Modal 
        isOpen={open} 
        onOpened={() => this.props.openProductDeliveryModal()}
        onClosed={() => this.props.closeProductDeliveryModal()}
        size="sm"
        scrollable

      >
        <ModalHeader toggle={() => this.props.closeProductDeliveryModal()}>
          <FormattedMessage
           id="product_delivery.title"
           defaultMessage="Enter code"
          />
        </ModalHeader>
        <ModalBody>
          <p>
            <FormattedMessage
              id="product_delivery.enter_code"
              defaultMessage="Enter code"
            />
          </p>
          <form onSubmit={handleSubmit(this.submitForm)}>
            <Field
              name="code"
              component="input"
              type="text"
              component={renderField}
            />
            <Button positive type="submit">
              <FormattedMessage
                id="product_delivery.submit_code"
                defaultMessage="Submit"
              />
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button negative onClick={() => this.props.closeProductDeliveryModal()}>
            <FormattedMessage
                id="product_delivery.cancel"
                defaultMessage="Cancel"
            />
          </Button>
        </ModalFooter>
      </Modal>


    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.productDeliveryModal.open,
    userId: state.userInfo.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openProductDeliveryModal: () => dispatch(openProductDeliveryModal()),
    closeProductDeliveryModal: () => dispatch(closeProductDeliveryModal()),
    submitDeliveryCode: (userId, code) => dispatch(submitDeliveryCode(userId, code)),
  };
};

let ProductDeliveryModalConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDeliveryModal);

ProductDeliveryModalConnected = reduxForm ({
  form: 'product_delivery_modal',
  validate
}) (ProductDeliveryModalConnected);

export default ProductDeliveryModalConnected;

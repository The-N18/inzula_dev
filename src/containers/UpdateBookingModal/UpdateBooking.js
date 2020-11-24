import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
  Container,
  Step,
  Image,
  TextArea,
  Select,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authLogin } from "../../store/actions/auth";
import styles from './sendpackage.css';
import PropTypes from "prop-types";
import { backend_url } from "../../configurations";
import ImageUploader from 'react-images-upload';
import { DateInput } from 'semantic-ui-calendar-react';
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';
import { bookingAddition } from "../../store/actions/addBooking";
import {Field, reset, reduxForm, formValueSelector} from 'redux-form';
import {renderField, renderDateTimePicker, renderDropdownList, renderCitiesList} from "../../containers/ReduxForm/renderField";
import { validate } from "./validation";
import { updateBooking } from "../../store/actions/addBooking";
import { updateBookingOpenModal, updateBookingCloseModal } from "../../store/actions/updateBookingModal";
import { sizeOptions, categoryOptions, weightOptions, valueOptions } from "../../utils/options";

class UpdateBooking extends React.Component {

  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this);
  }

  state = {
    activeStep: 1,
    pictures: [],
    isNextValid: true
  }

  handleButtonClick = (e) => {
    console.log("handle button click here");
    if(this.state.activeStep === 1) {
      this.setState({ activeStep: 2});
    } else {
      console.log("submit request");
    }
  }

  handleBackButtonClick = (e) => {
    if(this.state.activeStep === 2) {
      this.setState({ activeStep: 1});
    } else {
      console.log("do nothing");
    }
  }

  onDrop = (picture) => {
    console.log(picture);
      this.setState({
          pictures: this.state.pictures.concat(picture),
      });
  }

  getSubmitVal = (values, option) => {
    let val = "";
    if(typeof values[option] === "string") {
      val = values[option];
    } else {
      val = values[option]['value'];
    }
    return val;
  }

  submitForm = (val) => {
    const depdate = val['delivery_date'];
    const {pictures} = this.state;
    const { userId, userProfileId, createNotification, user_id, next_url, count, pk } = this.props;
    const created_by = {"user": userId};
      const departureLocation = val['departure_location'] ? val['departure_location']['pk'] : null;
      const destinationLocation = val['destination_location'] ? val['destination_location']['pk'] : null;
      const dta = {
        "pk": pk,
        "created_by": userProfileId,
        "pictures": pictures,
        "departure_location": departureLocation,
        "description": val['product_description'],
        "name": val['product_name'],
        "product_category": this.getSubmitVal(val, 'product_category'),
        "weight": this.getSubmitVal(val, 'product_weight'),
        "space": this.getSubmitVal(val, 'product_size'),
        "price": this.getSubmitVal(val, 'product_value'),
        "proposed_price": val['proposed_price'],
        "arrival_date": depdate.toISOString(),
        "destination_location": destinationLocation,
        "recipient_name": val['recipient_name'],
        "recipient_phone_number": val['recipient_phone_number'],
        "terms_conditions": val['terms_conditions'],
        "user_agreement": val['user_agreement']};
      this.props.updateBooking(dta);
      this.setState({ activeStep: 1});
  };

  getOptTxt = (val, arr) => {
    let txt = "";
    if(typeof val === "string") {
      for(let i = 0; i < arr.length; i++) {
        if(arr[i]['value'] === val) {
          txt = arr[i]['text'];
        }
      }
    } else {
      txt = val ? val['text'] : "";
    }
    return txt;
  }


  render() {
    const { token, handleSubmit, pristine,
      reset, submitting, invalid, change, product_name,
      departure_location, destination_location, proposed_price,
      product_category, product_weight, product_size, product_value,
      recipient_name, recipient_phone_number, product_description, open } = this.props;
    const { isNextValid, activeStep } = this.state;
    // if(token === null) {
    //   console.log("TOKEN");
    //   console.log(token);
    //   return <Redirect to="/" />;
    // }

    const handleMinPriceCatChange = (event, value) => {
      console.log(value);
      const newUnits = 0;
      change('min_price', newUnits);
    }
    const handleMinPriceWeiChange = (event, value) => {
      console.log(value);
      const newUnits = 1;
      change('min_price', newUnits);
    }
    const handleMinPriceSizChange = (event, value) => {
      console.log(value);
      const newUnits = 2;
      change('min_price', newUnits);
    }
    const handleMinPriceValChange = (event, value) => {
      console.log(value);
      const newUnits = 3;
      change('min_price', newUnits);
    }

    return (
      <Modal
        centered={false}
        open={open}
        onClose={() => this.props.updateBookingCloseModal()}
        onOpen={() => this.props.updateBookingOpenModal()}
        size='large'
      >
        <Modal.Header>
        Update Booking
        </Modal.Header>
        <Modal.Content scrolling>
      <Segment style={{ padding: "0em 0em" }} vertical textAlign="center">
        <Step.Group ordered stackable>
          <Step active={activeStep === 1}>
            <Step.Content>
              <Step.Title>Product details</Step.Title>
              <Step.Description>Enter product and recipient's details</Step.Description>
            </Step.Content>
          </Step>

          <Step active={activeStep === 2}>
            <Step.Content>
              <Step.Title>Confirm</Step.Title>
              <Step.Description>Confirm your request</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
        <Segment raised>
          <form onSubmit={handleSubmit(this.submitForm)}>
            <Grid
              textAlign="center"
              verticalAlign="middle"
            >
              <Grid.Row columns={2}>
                <Grid.Column mobile={16} tablet={16} computer={4}>
                  <Segment basic>
                    <Image centered bordered circular src= {backend_url() + '/static/images/box.jpg'} />
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose product images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        withPreview={true}
                    />
                  </Segment>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={12}>
                {activeStep === 2 ? <Grid
                  textAlign="center"
                  verticalAlign="middle"
                >
                  <Grid.Row columns={2}>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                      <span className={"form-details-display"}><b>Product name:</b> {product_name}</span>
                      <span className={"form-details-display"}><b>Product location:</b> {departure_location ? departure_location['label'] : ''}</span>
                      <span className={"form-details-display"}><b>Product category:</b> {this.getOptTxt(product_category, categoryOptions)}</span>
                      <span className={"form-details-display"}><b>Product size:</b> {this.getOptTxt(product_size, sizeOptions)}</span>
                      <span className={"form-details-display"}><b>Proposed price:</b> {proposed_price}</span>
                      <span className={"form-details-display"}><b>Recipient name:</b> {recipient_name}</span>
                      <span className={"form-details-display"}><b>Recipient phone number:</b> {recipient_phone_number}</span>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                      <span className={"form-details-display"} title={product_description}><b>Product description:</b> {product_description}</span>
                      <span className={"form-details-display"}><b>Pickup address:</b> {destination_location ? destination_location['label'] : ''}</span>
                      <span className={"form-details-display"}><b>Weight:</b> {this.getOptTxt(product_weight, weightOptions)}</span>
                      <span className={"form-details-display"}><b>Product value:</b> {this.getOptTxt(product_value, valueOptions)}</span>
                      <span className={"form-details-display"}><b>Recipient name:</b> {recipient_name}</span>
                      <span className={"form-details-display"}><b>Recipient phone number:</b> {recipient_phone_number}</span>
                    </Grid.Column>
                  </Grid.Row>
                  </Grid> : ''}
                  <Grid>
                  <Grid.Row>
                    {activeStep === 1 ? <Grid.Column mobile={16} tablet={16} computer={16}>
                      <Field
                        name="min_price"
                        type="number"
                        placeholder="Proposed price"
                        label="Min price"
                        className={"custom-field"}
                        component={renderField}
                        disabled={true}
                      />
                  </Grid.Column> : ''}
                  <Grid.Column mobile={16} tablet={16} computer={16}>
                {activeStep === 1 ?
                  <Grid>
                  <Grid.Row className={"no-pad"}>
                  <Grid.Column mobile={16} tablet={8} computer={6}>
                    <Field
                      name="product_name"
                      component="input"
                      type="text"
                      placeholder="Product name"
                      label="Product name"
                      className={"custom-field"}
                      component={renderField}
                    />
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={5}>
                    <Field
                      name="departure_location"
                      placeholder="Product location"
                      label="Product location"
                      component="input"
                      type="text"
                      className={"custom-field"}
                      component={renderCitiesList}
                    />
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={5}>
                    <Field
                      name="destination_location"
                      placeholder="Pickup location"
                      label="Pickup location"
                      component="input"
                      type="text"
                      className={"custom-field"}
                      component={renderCitiesList}
                    />
                    </Grid.Column>
                    </Grid.Row>
                    </Grid>
                   : ''}
                   {activeStep === 1 ?
                     <Grid>
                       <Grid.Row className={"no-pad"}>
                         <Grid.Column mobile={16} tablet={8} computer={8}>
                           <Field
                             name="delivery_date"
                             showTime={false}
                             component={renderDateTimePicker}
                             min={new Date()}
                           />
                         </Grid.Column>
                     <Grid.Column mobile={16} tablet={8} computer={8}>
                       <Field
                         name="proposed_price"
                         type="text"
                         placeholder="Proposed price"
                         label="Proposed price"
                         className={"custom-field"}
                         component={renderField}
                       />
                     </Grid.Column>
                   </Grid.Row>
                 </Grid> : ''}
                  {activeStep === 1 ?
                    <Grid>
                    <Grid.Row className={"no-pad"}>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                      <span>Product category</span>
                      <Field
                        name="product_category"
                        placeholder='Product category'
                        component={renderDropdownList}
                        data={categoryOptions}
                        valueField="value"
                        textField="text"
                        onChange={handleMinPriceCatChange}/>
                      </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                      <span>Product weight</span>
                      <Field
                        name="product_weight"
                        placeholder='Product weight'
                        component={renderDropdownList}
                        data={weightOptions}
                        valueField="value"
                        textField="text"
                        onChange={handleMinPriceWeiChange}/>
                      </Grid.Column>
                      </Grid.Row>
                      </Grid> : ''}
                    {activeStep === 1 ?
                      <Grid>
                      <Grid.Row className={"no-pad"}>
                      <Grid.Column mobile={16} tablet={8} computer={8}>
                        <span>Product size</span>
                        <Field
                          name="product_size"
                          placeholder='Product size'
                          component={renderDropdownList}
                          data={sizeOptions}
                          valueField="value"
                          textField="text"
                          onChange={handleMinPriceSizChange}/>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                        <span>Product value</span>
                          <Field
                            name="product_value"
                            placeholder='Product value'
                            component={renderDropdownList}
                            data={valueOptions}
                            valueField="value"
                            textField="text"
                            onChange={handleMinPriceValChange}/>
                          </Grid.Column>
                        </Grid.Row>
                        </Grid> : ''}
                      {activeStep === 1 ?
                        <Grid>
                        <Grid.Row className={"no-pad"}>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Field
                          name="recipient_name"
                          component="input"
                          type="text"
                          placeholder="Reciever's name"
                          label="Reciever's name"
                          className={"custom-field"}
                          component={renderField}
                        />
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Field
                          name="recipient_phone_number"
                          type="number"
                          placeholder="Reciever's phone number"
                          label="Reciever's phone number"
                          className={"custom-field"}
                          component={renderField}
                        />
                        </Grid.Column>
                        </Grid.Row>
                        </Grid> : ''}
                        {activeStep === 1 ?
                          <Field
                            name="product_description"
                            component="textarea"
                            placeholder="Short description of the product"
                            label="Short description of the product"
                            className={"custom-field"}
                          /> : '' }
                        {activeStep === 2 ?
                            <div>
                              <label htmlFor="terms_conditions">I have read and accept the terms and conditions</label>
                              <div>
                                <Field name="terms_conditions" id="terms_conditions" component="input" type="checkbox"/>
                              </div>
                            </div> : ''}
                        {activeStep === 2 ?
                            <div>
                              <label htmlFor="user_agreement">I agree to the user agreement</label>
                              <div>
                                <Field name="user_agreement" id="user_agreement" component="input" type="checkbox"/>
                              </div>
                            </div> :
                          ''}
                        {activeStep === 2 ? <Button icon labelPosition='left'
                          className={"buttoncolor step-button"}
                          size="large"
                          disabled={false}
                          onClick={this.handleBackButtonClick.bind(this)}
                        >
                          <Icon name='left arrow' /> Back
                        </Button> : ''}
                        {activeStep === 1 ? <Button icon labelPosition='right'
                          className={"buttoncolor step-button"}
                          size="large"
                          disabled={!isNextValid}
                          onClick={this.handleButtonClick.bind(this)}
                        >
                          <Icon name='right arrow' /> Next
                        </Button> : ''}
                        {activeStep === 2 ? <Button icon labelPosition='right'
                          className={"buttoncolor step-button"}
                          size="large"
                          type="submit"
                          disabled={invalid}
                        >
                          <Icon name='check' /> Confirm request
                        </Button> : ''}
                        {/*<Button icon labelPosition='right'
                          className={"buttoncolor step-button"}
                          size="large"
                          disabled={isNextValid}
                          onClick={activeStep === 1 ? this.handleButtonClick.bind(this) : this.handleSubmit.bind(this)}
                        >
                          {activeStep === 1 ? <span className={"form-details-display"}>Next
                          <Icon name='right arrow' /></span> : <span className={"form-details-display"}>Confirm request <Icon name='check' /></span>}
                        </Button> */}
                </Grid.Column>
              </Grid.Row>
            </Grid>
            </Grid.Column>
          </Grid.Row>
          </Grid>
          </form>
        </Segment>
      </Segment>
    </Modal.Content>
    <Modal.Actions>
      <Button negative onClick={() => this.props.updateBookingCloseModal()} primary>
        Cancel <Icon name='cancel' />
      </Button>
    </Modal.Actions>
    </Modal>
    );
  }
}
const selector = formValueSelector('update_booking');

const mapStateToProps = state => {
  const product_name = selector(state, 'product_name')
  const delivery_date = selector(state, 'delivery_date')
  const departure_location = selector(state, 'departure_location')
  const destination_location = selector(state, 'destination_location')
  const proposed_price = selector(state, 'proposed_price')
  const product_category = selector(state, 'product_category')
  const product_weight = selector(state, 'product_weight')
  const product_size = selector(state, 'product_size')
  const product_value = selector(state, 'product_value')
  const recipient_name = selector(state, 'recipient_name')
  const recipient_phone_number = selector(state, 'recipient_phone_number')
  const product_description = selector(state, 'product_description')
  return {
    loading: state.addBooking.loading,
    error: state.addBooking.error,
    token: state.auth.token,
    userId: state.userInfo.userId,
    userProfileId: state.userInfo.userProfileId,
    username: state.userInfo.username,
    authenticated: state.auth.token !== null,
    product_name: product_name,
    departure_location: departure_location,
    destination_location: destination_location,
    proposed_price: proposed_price,
    product_category: product_category,
    product_weight: product_weight,
    product_size: product_size,
    product_value: product_value,
    recipient_name: recipient_name,
    recipient_phone_number: recipient_phone_number,
    product_description: product_description,
    delivery_date: delivery_date,
    initialValues: state.updateBookingModal.bookingInfo,
    open: state.updateBookingModal.open,
    pk: state.updateBookingModal.pk,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateBookingCloseModal: () => dispatch(updateBookingCloseModal()),
    updateBookingOpenModal: () => dispatch(updateBookingOpenModal()),
    updateBooking: (values) => dispatch(updateBooking(values)),
    createNotification: (config) => {dispatch(createNotification(config))},
  };
};

const afterSubmit = (result, dispatch) => dispatch(reset('update_booking'));

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "update_booking", enableReinitialize: true, validate })(UpdateBooking));

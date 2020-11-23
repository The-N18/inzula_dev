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
  Select
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

class SendPackage extends React.Component {

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

  handleSelectChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  }

  submitForm = (val) => {
    console.log("in submit form");
    console.log(val);
    const depdate = val['delivery_date'];
    const { userId, userProfileId, createNotification, tripId, user_id, next_url, count } = this.props;
    const created_by = {"user": userId};
    if(userProfileId === null && userId === null) {
      createNotification({
        message: 'Please login to add your request',
        type: NOTIFICATION_TYPE_WARNING,
        duration: 10000,
        canDismiss: true,
      });
    } else {
      const departureLocation = val['departure_location'] ? val['departure_location']['pk'] : null;
      const destinationLocation = val['destination_location'] ? val['destination_location']['pk'] : null;
      this.props.addRequest(tripId,
        created_by,
        val['pictures'],
        departureLocation,
        val['product_description'],
        val['product_name'],
        val['product_category'] ? val['product_category']['value'] : '',
        val['product_weight'] ? val['product_weight']['value'] : '',
        val['product_size'] ? val['product_size']['value'] : '',
        val['product_value'] ? val['product_value']['value'] : '',
        val['proposed_price'],
        depdate.toISOString(),
        destinationLocation,
        val['recipient_name'],
        val['recipient_phone_number'],
        val['terms_conditions'],
        val['user_agreement']);
    }
  };


  render() {
    const { token, tripId, handleSubmit, pristine,
      reset, submitting, invalid, change, product_name,
      departure_location, destination_location, proposed_price,
      product_category, product_weight, product_size, product_value,
      recipient_name, recipient_phone_number, product_description } = this.props;
    const { isNextValid, activeStep } = this.state;
    // if(token === null) {
    //   console.log("TOKEN");
    //   console.log(token);
    //   return <Redirect to="/" />;
    // }
    const sizeOptions = [
      { key: 'xxs', value: 'xxs', text: 'Extra Extra Small' },
      { key: 'xs', value: 'xs', text: 'Extra small' },
      { key: 's', value: 's', text: 'Small' },
      { key: 'm', value: 'm', text: 'Medium' },
      { key: 'l', value: 'l', text: 'Large' },
      { key: 'xl', value: 'xl', text: 'Extra Large' },
      { key: 'xxl', value: 'xxl', text: 'Extra Extra Large' },
      { key: 'xxxl', value: 'xxxl', text: 'Extra Extra Extra Large' },
    ];

    const categoryOptions = [
      { key: 'food', value: 'food', text: 'Food' },
      { key: 'elec', value: 'elec', text: 'Electronics' },
      { key: 'dress', value: 'dress', text: 'Dresses' },
      { key: 'shoe', value: 'shoe', text: 'Shoes' },
      { key: 'doc', value: 'doc', text: 'Documents' },
      { key: 'uts', value: 'uts', text: 'Kitchen utensils' },
      { key: 'app', value: 'app', text: 'Electrical appliances' },
      { key: 'skin', value: 'skin', text: 'Skin care' },
      { key: 'jel', value: 'jel', text: 'Jewelry' },
      { key: 'misc', value: 'misc', text: 'Miscellaneous' },
    ];

    const weightOptions = [
      { key: '500g', value: '500g', text: '0.1 - 500g' },
      { key: '1kg', value: '1kg', text: '500g - 1kg' },
      { key: '5kg', value: '5kg', text: '1.1kg - 5kg' },
      { key: '10kg', value: '10kg', text: '5.1kg - 10kg' },
      { key: '20kg', value: '20kg', text: '10.1kg - 20kg' },
      { key: '30kg', value: '30kg', text: '20.1kg - 30kg' },
      { key: '40kg', value: '40kg', text: '30.1kg - 40kg' },
      { key: 'huge', value: 'huge', text: '40.1kg +' },
    ];

    const valueOptions = [
      { key: 'low', value: 'low', text: 'Low value' },
      { key: 'mid', value: 'mid', text: 'Medium value' },
      { key: 'high', value: 'high', text: 'High value' },
      { key: 'lux', value: 'lux', text: 'Luxury item' },
      { key: 'exc', value: 'exc', text: 'Exclusive' },
    ];

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
                      <span className={"form-details-display"}><b>Product category:</b> {product_category ? product_category['text'] : ''}</span>
                      <span className={"form-details-display"}><b>Product size:</b> {product_size ? product_size['text'] : ''}</span>
                      <span className={"form-details-display"}><b>Proposed price:</b> {proposed_price}</span>
                      <span className={"form-details-display"}><b>Recipient name:</b> {recipient_name}</span>
                      <span className={"form-details-display"}><b>Recipient phone number:</b> {recipient_phone_number}</span>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                      <span className={"form-details-display"} title={product_description}><b>Product description:</b> {product_description}</span>
                      <span className={"form-details-display"}><b>Pickup address:</b> {destination_location ? destination_location['label'] : ''}</span>
                      <span className={"form-details-display"}><b>Weight:</b> {product_weight ? product_weight['text'] : ''}</span>
                      <span className={"form-details-display"}><b>Product value:</b> {product_value ? product_value['text'] : ''}</span>
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
    );
  }
}
const selector = formValueSelector('send_package');

const mapStateToProps = state => {
  const product_name = selector(state, 'product_name')
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
    initialValues: {
      "min_price": 0
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRequest: (tripId, created_by, pictures, departure_location, product_description, product_name, product_category, product_weight, product_size, product_value, proposed_price, delivery_date, destination_location, recipient_name,
    recipient_phone_number, terms_conditions, user_agreement) => dispatch(bookingAddition(tripId, created_by, pictures, departure_location, product_description, product_name, product_category, product_weight, product_size, product_value, proposed_price, delivery_date, destination_location, recipient_name,
    recipient_phone_number, terms_conditions, user_agreement)),
    createNotification: (config) => {dispatch(createNotification(config))},
  };
};

SendPackage.propTypes = {
  token: PropTypes.string,
  tripId: PropTypes.tripId,
};

// let SendPackageConnected = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SendPackage);
//
// SendPackageConnected = reduxForm ({
//   form: 'send_package',
//   enableReinitialize: true,
//   validate
// }) (SendPackageConnected);
//
// export default SendPackageConnected;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "send_package", enableReinitialize: true, validate })(SendPackage));

import React from "react";
import {
  Button,
  Grid,
  Segment,
  Icon,
  Step,
  Image,
  Modal
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './sendpackage.css';
// import { backend_url } from "../../configurations";
import ImageUploader from 'react-images-upload';
import {createNotification} from 'react-redux-notify';
import {Field, reset, reduxForm, formValueSelector} from 'redux-form';
import {renderField, renderDateTimePicker, renderDropdownList, renderCitiesList} from "../../containers/ReduxForm/renderField";
import { validate } from "./validation";
import { updateBooking } from "../../store/actions/addBooking";
import { updateBookingOpenModal, updateBookingCloseModal } from "../../store/actions/updateBookingModal";
import { sizeOptions, sizeOptionsFr, categoryOptions, categoryOptionsFr, weightOptions, weightOptionsFr, valueOptions, valueOptionsFr, calculateMinPrice } from "../../utils/options";
import {FormattedMessage} from 'react-intl'

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
    if(this.state.activeStep === 1) {
      this.setState({ activeStep: 2});
    }
  }

  // componentDidUpdate(prevProps) {
  //   const { userId, change } = this.props;
  //   if (prevProps.images === undefined && this.props.images && this.props.images.length !== 0) {
  //     this.onDrop(this.props.images);
  //   }
  // }

  handleBackButtonClick = (e) => {
    if(this.state.activeStep === 2) {
      this.setState({ activeStep: 1});
    }
  }

  onDrop = (picture) => {
      this.setState({
          pictures: picture,
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
    const { lang, handleSubmit,
      invalid, change, product_name, images,
      departure_location, destination_location, proposed_price,
      product_category, product_weight, product_size, product_value,
      recipient_name, recipient_phone_number, product_description, open } = this.props;
    const { activeStep } = this.state;
    // if(token === null) {
    //   console.log("TOKEN");
    //   console.log(token);
    //   return <Redirect to="/" />;
    // }

    const handleMinPriceCatChange = (event, value) => {
      change('min_price', calculateMinPrice(product_weight, product_size, value, product_value));
    }
    const handleMinPriceWeiChange = (event, value) => {
      change('min_price', calculateMinPrice(value, product_size, product_category, product_value));
    }
    const handleMinPriceSizChange = (event, value) => {
      change('min_price', calculateMinPrice(product_weight, value, product_category, product_value));
    }
    const handleMinPriceValChange = (event, value) => {
      change('min_price', calculateMinPrice(product_weight, product_size, product_category, value));
    }

    return (
      <Modal
      closeIcon
        centered={false}
        open={open}
        onClose={() => this.props.updateBookingCloseModal()}
        onOpen={() => this.props.updateBookingOpenModal()}
        size='large'
      >
        <Modal.Header>
        <FormattedMessage
          id="update_booking.title"
          defaultMessage="Update Booking"
        />
        </Modal.Header>
        <Modal.Content scrolling>
      <Segment style={{ padding: "0em 0em" }} vertical textAlign="center">
        <Step.Group ordered stackable={"tablet"}>
          <Step active={activeStep === 1}>
            <Step.Content>
              <Step.Title><FormattedMessage
                id="add_booking.p_details"
                defaultMessage="Product details"
              /></Step.Title>
              <Step.Description><FormattedMessage
                id="add_booking.p_r_details"
                defaultMessage="Enter product and recipient's details"
              /></Step.Description>
            </Step.Content>
          </Step>

          <Step active={activeStep === 2}>
            <Step.Content>
              <Step.Title><FormattedMessage
                id="add_booking.confirm"
                defaultMessage="Confirm"
              /></Step.Title>
              <Step.Description><FormattedMessage
                id="add_booking.confirm_request"
                defaultMessage="Confirm your request"
              /></Step.Description>
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
                    {/* <Image centered bordered circular src= {backend_url() + '/static/images/box.jpg'} /> */}
                    {images && images.length > 0 ? images.map((item, index) => (
                      <Image centered bordered size="tiny" src={item['name']} />
                    )) : ''}
                    <ImageUploader
                        withIcon={true}
                        buttonText={<FormattedMessage
                          id="add_booking.choose_p_images"
                          defaultMessage="Choose product images"
                        />}
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
                      <span className={"form-details-display"}><b><FormattedMessage
                        id="add_booking.p_name"
                        defaultMessage="Product name:"
                      /></b> {product_name}</span>
                      <span className={"form-details-display"}><b><FormattedMessage
                        id="add_booking.p_location"
                        defaultMessage="Product location:"
                      /></b> {departure_location ? departure_location['label'] : ''}</span>
                      <span className={"form-details-display"}><b><FormattedMessage
                        id="add_booking.p_category"
                        defaultMessage="Product category:"
                      /></b> {this.getOptTxt(product_category, categoryOptions)}</span>
                      <span className={"form-details-display"}><b><FormattedMessage
                        id="add_booking.p_size"
                        defaultMessage="Product size:"
                      /></b> {this.getOptTxt(product_size, sizeOptions)}</span>
                      <span className={"form-details-display"}><b><FormattedMessage
                        id="add_booking.proposed_price"
                        defaultMessage="Proposed price:"
                      /></b> {proposed_price}</span>
                      <span className={"form-details-display"}><b><FormattedMessage
                        id="add_booking._rec_name"
                        defaultMessage="Recipient name:"
                      /></b> {recipient_name}</span>
                      <span className={"form-details-display"}><b><FormattedMessage
                        id="add_booking.rec_phone_number"
                        defaultMessage="Recipient phone number:"
                      /></b> {recipient_phone_number}</span>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                      <span className={"form-details-display"} title={product_description}><b><FormattedMessage
                        id="add_booking.p_desc"
                        defaultMessage="Product description:"
                      /></b> {product_description}</span>
                      <span className={"form-details-display"}><b><FormattedMessage
                        id="add_booking.pickup_address"
                        defaultMessage="Pickup address:"
                      /></b> {destination_location ? destination_location['label'] : ''}</span>
                      <span className={"form-details-display"}><b><FormattedMessage
                        id="add_booking.weight"
                        defaultMessage="Weight:"
                      /></b> {this.getOptTxt(product_weight, weightOptions)}</span>
                      <span className={"form-details-display"}><b><FormattedMessage
                        id="add_booking.p_value"
                        defaultMessage="Product value:"
                      /></b> {this.getOptTxt(product_value, valueOptions)}</span>
                      <span className={"form-details-display"}><b><FormattedMessage
                        id="add_booking._rec_name"
                        defaultMessage="Recipient name:"
                      /></b> {recipient_name}</span>
                      <span className={"form-details-display"}><b><FormattedMessage
                        id="add_booking.rec_phone_number"
                        defaultMessage="Recipient phone number:"
                      /></b> {recipient_phone_number}</span>
                    </Grid.Column>
                  </Grid.Row>
                  </Grid> : ''}
                  {activeStep === 1 ? <Grid>
                  <Grid.Row>
                    <Grid.Column mobile={16} tablet={16} computer={8}>
                    <div>
                      <label htmlFor="product_name"><FormattedMessage
                        id="add_booking.p_name_field"
                        defaultMessage="Product name"
                      /></label>
                    <Field
                      name="product_name"
                      component="input"
                      type="text"
                      component={renderField}
                    />
                </div>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={8} computer={8}>
                   <div>
                     <label htmlFor="delivery_date"><FormattedMessage
                       id="add_booking.delivery_date_field"
                       defaultMessage="Delivery date"
                     /></label>
                   <Field
                     name="delivery_date"
                     showTime={false}
                     component={renderDateTimePicker}
                     min={new Date()}
                   />
               </div>
                    </Grid.Column>
                  
                  </Grid.Row>
                   </Grid>: ''}
                   
                   {activeStep === 1 ?
                     <Grid>
                       <Grid.Row className={"no-pad"}>
                         <Grid.Column mobile={16} tablet={8} computer={8}>
                      <div>
                        <label htmlFor="departure_location"><FormattedMessage
                          id="add_booking.p_location_field"
                          defaultMessage="Product location"
                        /></label>
                      <Field
                        name="departure_location"
                        label={lang === "en" ? "Select departure location" : "Sélectionnez le lieu de départ"}
                        type="text"
                        component={renderCitiesList}
                      />
                  </div>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={8} computer={8}>
                      <div>
                        <label htmlFor="destination_location"><FormattedMessage
                          id="add_booking.pickup_loc_field"
                          defaultMessage="Pickup location"
                        /></label>
                    <Field
                      name="destination_location"
                      label={lang === "en" ? "Select destination location" : "Sélectionnez la destination"}
                      type="text"
                      component={renderCitiesList}
                    />
                </div>
                    </Grid.Column>
                    </Grid.Row>
                    </Grid>
                   : ''}
                   {activeStep === 1 ?
                     <Grid>
                       <Grid.Row className={"no-pad"}>
                     <Grid.Column mobile={16} tablet={8} computer={8}>
                       <span><FormattedMessage
                         id="add_booking.p_category_field"
                         defaultMessage="Product category"
                       /></span>
                       <Field
                         name="product_category"
                         component={renderDropdownList}
                         data={lang === "en" ? categoryOptions : categoryOptionsFr}
                         valueField="value"
                         textField="text"
                         onChange={handleMinPriceCatChange}/>
                     </Grid.Column>
                     <Grid.Column mobile={16} tablet={8} computer={8}>
                       <span><FormattedMessage
                         id="add_booking.p_weight_field"
                         defaultMessage="Product weight"
                       /></span>
                       <Field
                         name="product_weight"
                         placeholder='Product weight'
                         component={renderDropdownList}
                         data={lang === "en" ? weightOptions: weightOptionsFr}
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
                      <span><FormattedMessage
                        id="add_booking.p_size_field"
                        defaultMessage="Product size"
                      /></span>
                      <Field
                        name="product_size"
                        placeholder='Product size'
                        component={renderDropdownList}
                        data={lang === "en" ? sizeOptions: sizeOptionsFr}
                        valueField="value"
                        textField="text"
                        onChange={handleMinPriceSizChange}/>
                      </Grid.Column>
                      <Grid.Column mobile={16} tablet={8} computer={8}>
                        <span><FormattedMessage
                          id="add_booking.p_value_field"
                          defaultMessage="Product value"
                        /></span>
                          <Field
                            name="product_value"
                            placeholder='Product value'
                            component={renderDropdownList}
                            data={lang === "en" ? valueOptions: valueOptionsFr}
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
                          <div>
                            <label htmlFor="recipient_name"><FormattedMessage
                              id="add_booking.rec_name_field"
                              defaultMessage="Reciever's name"
                            /></label>
                        <Field
                          name="recipient_name"
                          component="input"
                          type="text"
                          component={renderField}
                        />
                    </div>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                          <div>
                            <label htmlFor="recipient_phone_number"><FormattedMessage
                              id="add_booking.rec_phone_number_field"
                              defaultMessage="Reciever's phone number"
                            /></label>
                          <Field
                            name="recipient_phone_number"
                            type="number"
                            component={renderField}
                          />
                      </div>
                        </Grid.Column>
                        </Grid.Row>
                        </Grid> : ''}
                        {activeStep === 1 ?<Grid>
                   <Grid.Row>
                  <Grid.Column mobile={16} tablet={16} computer={8}>
                      <div>
                        <label htmlFor="min_price"><FormattedMessage
                          id="add_booking.min_price_field"
                          defaultMessage="Minimum price"
                        /></label>
                     <Field
                       name="min_price"
                       type="number"
                       component={renderField}
                       disabled={true}
                     />
                 </div>
                 </Grid.Column>
                 <Grid.Column mobile={16} tablet={16} computer={8}>
                    <div>
                      <label htmlFor="proposed_price"><FormattedMessage
                        id="add_booking.proposed_price_field"
                        defaultMessage="Proposed price"
                      /></label>
                    <Field
                      name="proposed_price"
                      type="text"
                      component={renderField}
                    />
                </div>
                </Grid.Column>
                  </Grid.Row>
                   </Grid>: ''}
                        {activeStep === 1 ?
                          <div>
                          <label htmlFor="product_description"><FormattedMessage
                            id="add_booking.p_description_field"
                            defaultMessage="Short description of the product"
                          /></label>
                          <Field
                            name="product_description"
                            component="textarea"
                            placeholder="Short description of the product"
                            label="Short description of the product"
                            className={"custom-field"}
                          /></div> : '' }
                        {activeStep === 1 ?
                            <div className={"txt-align-l"}>
                              <Field name="terms_conditions" id="terms_conditions" component="input" type="checkbox"/>
                                <label htmlFor="terms_conditions"><FormattedMessage
                                  id="add_booking.terms_check"
                                  defaultMessage="I have read and accept the terms and conditions"
                                /></label>
                            </div> : ''}
                        {activeStep === 1 ?
                            <div className={"txt-align-l"}>
                              <Field name="user_agreement" id="user_agreement" component="input" type="checkbox"/>
                                <label htmlFor="user_agreement"><FormattedMessage
                                  id="add_booking.user_agreement_check"
                                  defaultMessage="I agree to the user agreement"
                                /></label>
                            </div> :
                          ''}
                        {activeStep === 2 ? <Button icon labelPosition='left'
                          className={"buttoncolor step-button"}
                          size="large"
                          disabled={false}
                          onClick={this.handleBackButtonClick.bind(this)}
                        >
                          <Icon name='left arrow' /> <FormattedMessage
                            id="add_booking.back"
                            defaultMessage="Back"
                          />
                        </Button> : ''}
                        {activeStep === 1 ? <Button icon labelPosition='right'
                          className={"buttoncolor step-button"}
                          size="large"
                          disabled={invalid}
                          onClick={this.handleButtonClick.bind(this)}
                        >
                          <Icon name='right arrow' /> <FormattedMessage
                            id="add_booking.next"
                            defaultMessage="Next"
                          />
                        </Button> : ''}
                        {activeStep === 2 ? <Button icon labelPosition='right'
                          className={"buttoncolor step-button"}
                          size="large"
                          type="submit"
                          disabled={invalid}
                        >
                          <Icon name='check' /> <FormattedMessage
                            id="add_booking.confirm_request"
                            defaultMessage="Confirm request"
                          />
                        </Button> : ''}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </form>
        </Segment>
      </Segment>
    </Modal.Content>
    <Modal.Actions>
      <Button negative onClick={() => this.props.updateBookingCloseModal()} primary>
        <FormattedMessage
          id="add_booking.cancel"
          defaultMessage="Cancel"
        /> <Icon name='cancel' />
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
  const images = selector(state, 'images')
  return {
    loading: state.addBooking.loading,
    error: state.addBooking.error,
    token: state.auth.token,
    lang: state.appConfig.lang,
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
    images: images,
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

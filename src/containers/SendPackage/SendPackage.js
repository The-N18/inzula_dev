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

class SendPackage extends React.Component {

  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this);
  }

  state = {
    activeStep: 1,
    pictures: [],
    departure_location: "",
    product_description: "",
    product_name: "",
    product_category: "",
    product_weight: "",
    product_size: "",
    product_value: "",
    proposed_price: "",
    delivery_date: "",
    destination_location: "",
    recipient_name: "",
    recipient_phone_number: "",
    terms_conditions: false,
    user_agreement: false,
    isNextValid: false
  }

  handleChange = e => {
    console.log("handle change here");
    const {activeStep, user_agreement, terms_conditions, product_name, recipient_name, recipient_phone_number, destination_location, product_value, departure_location} = this.state;
    this.setState({ [e.target.name]: e.target.value });
    if(activeStep === 1) {
      if(product_name !== "" && recipient_name !== "" && recipient_phone_number !== "" && destination_location !== "" && product_value !== "" && departure_location !== "") {
        this.setState({ isNextValid: true});
      } else {
        this.setState({ isNextValid: false});
      }
    }
    if(activeStep === 2) {
      if(user_agreement !== false && terms_conditions !== false && product_name !== "" && recipient_name !== "" && recipient_phone_number !== "" && destination_location !== "" && product_value !== "" && departure_location !== "") {
        this.setState({ isNextValid: true});
      } else {
        this.setState({ isNextValid: false});
      }
    }
  };

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

  handleToggleCheckbox = () => {
    const terms_conditions = !(this.state.terms_conditions);
    this.setState({terms_conditions});
  }

  handleSelectChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  }


  handleToggleUserAgreementCheckbox = () => {
    const user_agreement = !(this.state.user_agreement);
    this.setState({user_agreement});
  }

  handleDateTimeChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = e => {
    const {userId, userProfileId, createNotification, tripId} = this.props;
    e.preventDefault();
    const { pictures, departure_location, product_description, product_name, product_category, product_weight, product_size, product_value, proposed_price, delivery_date, destination_location, recipient_name,
    recipient_phone_number, terms_conditions, user_agreement} = this.state;
    const created_by = {"user": userId};
    if(userProfileId === null && userId === null) {
      createNotification({
        message: 'Please login to add your request',
        type: NOTIFICATION_TYPE_WARNING,
        duration: 10000,
        canDismiss: true,
      });
    } else {
      this.props.addRequest(tripId, created_by, pictures, departure_location, product_description, product_name, product_category, product_weight, product_size, product_value, proposed_price, delivery_date, destination_location, recipient_name,
      recipient_phone_number, terms_conditions, user_agreement);
    }
    this.setState({ departure_location: '', product_description: '',
                    product_name: '', product_category: '',
                    product_weight: '', product_size: '',
                    product_value: '', proposed_price: '',
                    delivery_date: '', destination_location: '',
                    recipient_name: '', recipient_phone_number: '',
                    terms_conditions: false,
                    user_agreement: false,
                    pictures: [], activeStep: 1 });
  };


  render() {
    const { token, tripId } = this.props;
    const { isNextValid, user_agreement, terms_conditions, activeStep, departure_location, proposed_price, product_description, product_name, product_category, product_weight, product_size, product_value, delivery_date, destination_location, recipient_name, recipient_phone_number  } = this.state;
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
          <Form>
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
                      <span className={"form-details-display"}><b>Product name:</b> {this.state.product_name}</span>
                      <span className={"form-details-display"}><b>Product location:</b> {this.state.departure_location}</span>
                      <span className={"form-details-display"}><b>Delivery date:</b> {this.state.delivery_date}</span>
                      <span className={"form-details-display"}><b>Product category:</b> {this.state.product_category}</span>
                      <span className={"form-details-display"}><b>Product size:</b> {this.state.product_size}</span>
                      <span className={"form-details-display"}><b>Proposed price:</b> {this.state.proposed_price}</span>
                      <span className={"form-details-display"}><b>Recipient name:</b> {this.state.recipient_name}</span>
                      <span className={"form-details-display"}><b>Recipient phone number:</b> {this.state.recipient_phone_number}</span>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                      <span className={"form-details-display"} title={this.state.product_description}><b>Product description:</b> {this.state.product_description}</span>
                      <span className={"form-details-display"}><b>Pickup address:</b> {this.state.destination_location}</span>
                      <span className={"form-details-display"}><b>Weight:</b> {this.state.product_weight}</span>
                      <span className={"form-details-display"}><b>Product value:</b> {this.state.product_value}</span>
                      <span className={"form-details-display"}><b>Recipient name:</b> {this.state.recipient_name}</span>
                      <span className={"form-details-display"}><b>Recipient phone number:</b> {this.state.recipient_phone_number}</span>
                    </Grid.Column>
                  </Grid.Row>
                  </Grid> : ''}
                {activeStep === 1 ?
                  <Form.Group widths='equal'>
                  <Form.Input
                    onChange={this.handleChange}
                    value={product_name}
                    name="product_name"
                    fluid
                    icon="text cursor"
                    iconPosition="left"
                    placeholder="Product name"
                  />
                  <Form.Input
                      onChange={this.handleChange}
                      value={departure_location}
                      name="departure_location"
                      fluid
                      icon="location arrow"
                      iconPosition="left"
                      placeholder="Product location"
                    />
                    <DateInput
                      name="delivery_date"
                      placeholder="Delivery Date"
                      value={delivery_date}
                      iconPosition="left"
                      onChange={this.handleDateTimeChange}
                      dateFormat="YYYY-MM-DD"
                    />
                  </Form.Group> : ''}
                  {activeStep === 1 ?
                    <Form.Group widths='equal'>
                    <Form.Input
                        onChange={this.handleChange}
                        value={destination_location}
                        name="destination_location"
                        fluid
                        icon="map pin"
                        iconPosition="left"
                        placeholder="Pickup address"
                      />
                        <Select
                          onChange={this.handleSelectChange}
                          name="product_category"
                          fluid
                          placeholder='Product category'
                          options={categoryOptions} />
                        <Select
                          onChange={this.handleSelectChange}
                          name="product_weight"
                          fluid
                          placeholder='Product weight'
                          options={weightOptions} />


                    </Form.Group> : ''}
                    {activeStep === 1 ?
                      <Form.Group widths='equal'>
                      <Select
                        onChange={this.handleSelectChange}
                        name="product_size"
                        fluid
                        placeholder='Product size'
                        options={sizeOptions} />
                        <Select
                          onChange={this.handleSelectChange}
                          name="product_value"
                          fluid
                          placeholder='Product value'
                          options={valueOptions} />
                        <Form.Input
                          value={proposed_price}
                          name="proposed_price"
                          fluid
                          icon="money bill alternate outline"
                          iconPosition="left"
                          placeholder="Proposed price"
                          readOnly
                        />


                      </Form.Group> : ''}
                      {activeStep === 1 ?
                        <Form.Group widths='equal'>
                        <Form.Input
                          onChange={this.handleChange}
                          value={recipient_name}
                          name="recipient_name"
                          fluid
                          icon="user"
                          iconPosition="left"
                          placeholder="Reciever's name"
                        />
                        <Form.Input
                          onChange={this.handleChange}
                          value={recipient_phone_number}
                          name="recipient_phone_number"
                          fluid
                          icon="phone"
                          iconPosition="left"
                          placeholder="Reciever's phone number"
                          type='number'
                        />
                        </Form.Group> : ''}
                        {activeStep === 1 ?
                          <TextArea
                          placeholder='Short description of the product'
                          onChange={this.handleChange}
                          value={product_description}
                          name="product_description" /> : '' }
                        {activeStep === 2 ?
                          <Form.Checkbox
                            className={"checkboxes-align-left"}
                            name="terms_conditions"
                            label='I have read and accept the terms and conditions'
                            required
                            checked={terms_conditions}
                            onChange={this.handleToggleCheckbox}/> :
                          ''}
                        {activeStep === 2 ?
                          <Form.Checkbox
                            className={"checkboxes-align-left"}
                            name="user_agreement"
                            label='I agree to the user agreement'
                            checked={user_agreement}
                            required
                            onChange={this.handleToggleUserAgreementCheckbox}/> :
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
                          disabled={!isNextValid}
                          onClick={this.handleSubmit.bind(this)}
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
          </Form>
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.addBooking.loading,
    error: state.addBooking.error,
    token: state.auth.token,
    userId: state.userInfo.userId,
    userProfileId: state.userInfo.userProfileId,
    username: state.userInfo.username,
    authenticated: state.auth.token !== null
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendPackage);

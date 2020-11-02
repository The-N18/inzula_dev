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
import {createNotification, NOTIFICATION_TYPE_SUCCESS} from 'react-redux-notify';
import { bookingAddition } from "../../store/actions/addBooking";

class SendPackage extends React.Component {

  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this);
  }

  state = {
    activeStep: 1,
    pictures: [],
    product_location: "",
    product_description: "",
    product_name: "",
    product_category: "",
    product_weight: "",
    product_size: "",
    product_value: "",
    proposed_price: "",
    delivery_date: "",
    pickup_address: "",
    recipient_name: "",
    recipient_phone_number: "",
    terms_conditions: false,
    user_agreement: false,
    isNextValid: false
  }

  handleChange = e => {
    console.log("handle change here");
    const {activeStep, user_agreement, terms_conditions, product_name, recipient_name, recipient_phone_number, pickup_address, product_value, product_location} = this.state;
    this.setState({ [e.target.name]: e.target.value });
    if(activeStep === 1) {
      if(product_name !== "" && recipient_name !== "" && recipient_phone_number !== "" && pickup_address !== "" && product_value !== "" && product_location !== "") {
        this.setState({ isNextValid: true});
      } else {
        this.setState({ isNextValid: false});
      }
    }
    if(activeStep === 2) {
      if(user_agreement !== false && terms_conditions !== false && product_name !== "" && recipient_name !== "" && recipient_phone_number !== "" && pickup_address !== "" && product_value !== "" && product_location !== "") {
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

  handleSizeChange = (e, data) => {
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
    const {userId, userProfileId, createNotification} = this.props;
    e.preventDefault();
    const { pictures, product_location, product_description, product_name, product_category, product_weight, product_size, product_value, proposed_price, delivery_date, pickup_address, recipient_name,
    recipient_phone_number, terms_conditions, user_agreement} = this.state;
    const created_by = {"user": userId};
    this.props.addRequest(created_by, pictures, product_location, product_description, product_name, product_category, product_weight, product_size, product_value, proposed_price, delivery_date, pickup_address, recipient_name,
    recipient_phone_number, terms_conditions, user_agreement);
    createNotification({
      message: 'Your request has been added',
      type: NOTIFICATION_TYPE_SUCCESS,
      duration: 0,
      canDismiss: true,
    });
  };


  render() {
    const { token } = this.props;
    const { isNextValid, user_agreement, terms_conditions, activeStep, product_location, proposed_price, product_description, product_name, product_category, product_weight, product_size, product_value, delivery_date, pickup_address, recipient_name, recipient_phone_number  } = this.state;
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
    return (
      <Segment style={{ padding: "2em 0em" }} vertical textAlign="center">
        <Step.Group ordered unstackable>
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
                      <span className={"form-details-display"}><b>Product location:</b> {this.state.product_location}</span>
                      <span className={"form-details-display"}><b>Delivery date:</b> {this.state.delivery_date}</span>
                      <span className={"form-details-display"}><b>Product category:</b> {this.state.product_category}</span>
                      <span className={"form-details-display"}><b>Product size:</b> {this.state.product_size}</span>
                      <span className={"form-details-display"}><b>Proposed price:</b> {this.state.proposed_price}</span>
                      <span className={"form-details-display"}><b>Recipient name:</b> {this.state.recipient_name}</span>
                      <span className={"form-details-display"}><b>Recipient phone number:</b> {this.state.recipient_phone_number}</span>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                      <span className={"form-details-display"} title={this.state.product_description}><b>Product description:</b> {this.state.product_description}</span>
                      <span className={"form-details-display"}><b>Pickup address:</b> {this.state.pickup_address}</span>
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
                      value={product_location}
                      name="product_location"
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
                        value={pickup_address}
                        name="pickup_address"
                        fluid
                        icon="map pin"
                        iconPosition="left"
                        placeholder="Pickup address"
                      />
                      <Form.Input
                          onChange={this.handleChange}
                          value={product_category}
                          name="product_category"
                          fluid
                          icon="user"
                          iconPosition="left"
                          placeholder="Product category"
                        />
                        <Form.Input
                          onChange={this.handleChange}
                          value={product_weight}
                          name="product_weight"
                          fluid
                          icon="weight"
                          iconPosition="left"
                          placeholder="Weight (kg)"
                          type='number'
                        />


                    </Form.Group> : ''}
                    {activeStep === 1 ?
                      <Form.Group widths='equal'>
                      {/*<Form.Input
                        onChange={this.handleChange}
                        value={product_size}
                        name="product_size"
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="Size (length * width * height)"
                         type='number'
                      />*/}
                      <Select
                        onChange={this.handleSizeChange}
                        name="product_size"
                        fluid
                        placeholder='Product size'
                        options={sizeOptions} />
                      <Form.Input
                          onChange={this.handleChange}
                          value={product_value}
                          name="product_value"
                          fluid
                          icon="user"
                          iconPosition="left"
                          placeholder="Value"
                        />
                        <Form.Input
                          onChange={this.handleChange}
                          value={proposed_price}
                          name="proposed_price"
                          fluid
                          icon="money bill alternate outline"
                          iconPosition="left"
                          placeholder="Proposed price"
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
    addRequest: (created_by, pictures, product_location, product_description, product_name, product_category, product_weight, product_size, product_value, proposed_price, delivery_date, pickup_address, recipient_name,
    recipient_phone_number, terms_conditions, user_agreement) => dispatch(bookingAddition(created_by, pictures, product_location, product_description, product_name, product_category, product_weight, product_size, product_value, proposed_price, delivery_date, pickup_address, recipient_name,
    recipient_phone_number, terms_conditions, user_agreement)),
    createNotification: (config) => {dispatch(createNotification(config))},
  };
};

SendPackage.propTypes = {
  token: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendPackage);

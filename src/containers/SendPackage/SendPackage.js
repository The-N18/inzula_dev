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
  TextArea
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authLogin } from "../../store/actions/auth";
import styles from './sendpackage.css';
import PropTypes from "prop-types";
import { backend_url } from "../../configurations";
import ImageUploader from 'react-images-upload';

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
    recipient_phone_number: ""
  }

  handleChange = e => {
    console.log("handle change here");
    this.setState({ [e.target.name]: e.target.value });
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

  render() {
    const { token } = this.props;
    const { activeStep, product_location, proposed_price, product_description, product_name, product_category, product_weight, product_size, product_value, delivery_date, pickup_address, recipient_name, recipient_phone_number  } = this.state;
    // if(token === null) {
    //   console.log("TOKEN");
    //   console.log(token);
    //   return <Redirect to="/" />;
    // }
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
                    <Image centered bordered circular src= {backend_url() + '/static/images/convenient.png'} />
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
                {activeStep === 1 ?
                  <Form.Group widths='equal'>
                  <Form.Input
                      onChange={this.handleChange}
                      value={product_location}
                      name="product_location"
                      fluid
                      icon="location arrow"
                      iconPosition="left"
                      placeholder="Product location"
                    />
                    <Form.Input
                      onChange={this.handleChange}
                      value={product_description}
                      name="product_description"
                      fluid
                      icon="text cursor"
                      iconPosition="left"
                      placeholder="Product description"
                    />
                    <Form.Input
                      onChange={this.handleChange}
                      value={delivery_date}
                      name="delivery_date"
                      fluid
                      icon="calendar"
                      iconPosition="left"
                      placeholder="Delivery date"
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
                      />
                    </Form.Group> : ''}
                    {activeStep === 1 ?
                      <Form.Group widths='equal'>
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
                        />
                        <Form.Input
                          onChange={this.handleChange}
                          value={product_size}
                          name="product_size"
                          fluid
                          icon="user"
                          iconPosition="left"
                          placeholder="Size (length * width * height)"
                        />
                      </Form.Group> : ''}
                      {activeStep === 1 ?
                        <Form.Group widths='equal'>
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
                          <TextArea
                          placeholder='Short description of the product'
                          onChange={this.handleChange}
                          value={product_description}
                          name="product_description" /> : '' }
                        {activeStep === 2 ? <Button icon labelPosition='left'
                          className={"buttoncolor step-button"}
                          size="large"
                          disabled={false}
                          onClick={this.handleBackButtonClick.bind(this)}
                        >
                          <Icon name='left arrow' /> Back
                        </Button> : ''}
                        <Button icon labelPosition='right'
                          className={"buttoncolor step-button"}
                          size="large"
                          disabled={false}
                          onClick={this.handleButtonClick.bind(this)}
                        >
                          {activeStep === 1 ? <span>Next
                          <Icon name='right arrow' /></span> : <span>Confirm request <Icon name='check' /></span>}
                        </Button>
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
    loading: state.auth.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

SendPackage.propTypes = {
  token: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendPackage);

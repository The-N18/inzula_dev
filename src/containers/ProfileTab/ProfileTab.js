import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Select,
  Image
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './profiletab.css';
import { backend_url } from "../../configurations";
import ImageUploader from 'react-images-upload';


class ProfileTab extends React.Component {
  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this);
  }

  state = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    passport_number: "",
    pictures: []
  };

  onDrop = (picture) => {
    console.log(picture);
      this.setState({
          pictures: this.state.pictures.concat(picture),
      });
  }

  render() {
    const countryOptions = [
      { key: 'af', value: 'af', text: 'Afghanistan' },
      { key: 'ax', value: 'ax', text: 'Aland Islands' },
      { key: 'al', value: 'al', text: 'Albania' },
      { key: 'dz', value: 'dz', text: 'Algeria' },
      { key: 'as', value: 'as', text: 'American Samoa' },
      { key: 'ad', value: 'ad', text: 'Andorra' },
      { key: 'ao', value: 'ao', text: 'Angola' },
      { key: 'ai', value: 'ai', text: 'Anguilla' },
      { key: 'ag', value: 'ag', text: 'Antigua' },
      { key: 'ar', value: 'ar', text: 'Argentina' },
      { key: 'am', value: 'am', text: 'Armenia' },
      { key: 'aw', value: 'aw', text: 'Aruba' },
      { key: 'au', value: 'au', text: 'Australia' },
      { key: 'at', value: 'at', text: 'Austria' },
      { key: 'az', value: 'az', text: 'Azerbaijan' },
      { key: 'bs', value: 'bs', text: 'Bahamas' },
      { key: 'bh', value: 'bh', text: 'Bahrain' },
      { key: 'bd', value: 'bd', text: 'Bangladesh' },
      { key: 'bb', value: 'bb', text: 'Barbados' },
      { key: 'by', value: 'by', text: 'Belarus' },
      { key: 'be', value: 'be', text: 'Belgium' },
      { key: 'bz', value: 'bz', text: 'Belize' },
      { key: 'bj', value: 'bj', text: 'Benin' },
    ];
    const { first_name, last_name, phone_number, email, passport_number } = this.state;
    const { loading } = this.props;
    return (
      <Segment basic className={"profile-tab-section"}>
      <Grid className={"profile-tab-section-grid"}>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} tablet={16} computer={5}>
            <Segment className={"profile-tab-card"}>
              <Image centered bordered circular src= {backend_url() + '/static/images/convenient.png'} />
              <Segment basic textAlign="center">
              <Header as='h4' className={"profile-tab-card-title"}>John Doe</Header>
              <p >Member since: December 2020</p>
              <p >Phone number: +000000000</p>
              <p >Email: johndoe@gmail.com</p>
              <p >Passport number: 0000000</p>
              </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={11} className={"profile-tab-card bordered-column"}>
          <Grid className={"profile-tab-section-grid"}>
            <Grid.Row columns={2}>
              <Grid.Column mobile={16} tablet={16} computer={5}>
                <Segment basic>
                  <Image centered bordered circular src= {backend_url() + '/static/images/convenient.png'} />
                  <ImageUploader
                      withIcon={true}
                      buttonText='Choose profile image'
                      onChange={this.onDrop}
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                      singleImage={true}
                      withPreview={true}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={11}>
                <Segment basic textAlign="center">
                <Header as='h4' className={"profile-tab-card-title"}>Personal information</Header>
                <Form size="large" onSubmit={this.handleSubmit}>
                  <Segment basic>
                  <Form.Group widths='equal'>
                    <Form.Input
                      onChange={this.handleChange}
                      value={first_name}
                      name="first_name"
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="First name"
                      required
                    />
                    <Form.Input
                      onChange={this.handleChange}
                      value={last_name}
                      name="last_name"
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Last name"
                      required
                    />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Input
                      onChange={this.handleChange}
                      value={phone_number}
                      name="phone_number"
                      fluid
                      icon="phone"
                      iconPosition="left"
                      placeholder="Phone number"
                      required
                    />
                      <Form.Input
                        onChange={this.handleChange}
                        value={email}
                        name="email"
                        fluid
                        icon="mail"
                        iconPosition="left"
                        placeholder="E-mail address"
                        required
                      />
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Select
                        placeholder='Select your country'
                        options={countryOptions} />
                      <Form.Input
                        onChange={this.handleChange}
                        value={passport_number}
                        name="passport_number"
                        fluid
                        icon="address book outline"
                        iconPosition="left"
                        placeholder="Passport number"
                        required
                      />
                    </Form.Group>
                    <Button
                      className={"buttoncolor"}
                      size="large"
                      loading={loading}
                      disabled={true}
                    >
                      Save
                    </Button>
                  </Segment>
                </Form>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

ProfileTab.propTypes = {
  profileType: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileTab);

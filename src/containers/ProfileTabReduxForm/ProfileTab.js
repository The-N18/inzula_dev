import React from "react";
import PropTypes from "prop-types";
import {Field, reduxForm} from 'redux-form';
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
import { backend_url, get_img_url } from "../../configurations";
import ImageUploader from 'react-images-upload';
import { updateUserProfile } from "../../store/actions/auth";
import { validate } from "./validation";
import {countries} from "../../utils/countries";
import CSRFToken from "../../containers/CSRFToken";
import DjangoCSRFToken from 'django-react-csrftoken';
import {renderField, renderDropdownList} from "../../containers/ReduxForm/renderField";
import {FormattedMessage, FormattedDate} from 'react-intl'

class ProfileTab extends React.Component {
  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this);
  }

  state = {
    picture: [],
  }

  onDrop = (picture) => {
    console.log(picture);
      this.setState({
          picture: picture,
      });
  }

  submitForm = (val) => {
    const country = val['country'] && val['country']['value'] ? val['country']['value'] : val['country'];
    this.props.updateProfile(val['first_name'], val['last_name'], val['phone_number'], val['email'], country, val['passport_number'], this.state.picture);
  }

  render () {
    const {handleSubmit, token, loading, pristine, reset, submitting, invalid, date_joined, profile_pic, passport_number, phone_number, email} = this.props;
    return (
      <Segment basic className={"profile-tab-section"}>
      <Grid className={"profile-tab-section-grid"}>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} tablet={16} computer={5}>
            <Segment className={"profile-tab-card"}>
              <Image centered bordered circular src= {profile_pic !== null && profile_pic !== "null" ? get_img_url(profile_pic) : backend_url() + '/static/images/user_avatar.png'} />
              <Segment basic textAlign="center">
              <Header as='h4' className={"profile-tab-card-title"}>{this.props.first_name} {this.props.last_name}</Header>
              {date_joined ? <p><FormattedMessage
                id="profile_tab.member_since"
                defaultMessage="Member since"
              /><FormattedDate
                                  value={date_joined}
                                  year="numeric"
                                  month="long"
                                  day="numeric"
                                  weekday="long"
                                /></p> : ''}
              {phone_number ? <p><FormattedMessage
                id="profile_tab.phone_number_disp"
                defaultMessage="Phone number:"
              />{phone_number}</p> : ''}
              {email ? <p><FormattedMessage
                id="profile_tab.email_disp"
                defaultMessage="Email:"
              /> {email}</p> : ''}
              {passport_number ? <p><FormattedMessage
                id="profile_tab.passport_number_disp"
                defaultMessage="Passport number: "
              />{passport_number}</p> : ''}
              </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={11} className={"profile-tab-card bordered-column"}>
          <Grid className={"profile-tab-section-grid"}>
            <Grid.Row columns={2}>
              <Grid.Column mobile={16} tablet={16} computer={5}>
                <Segment basic>
                  <Image centered bordered circular src= {profile_pic !== null && profile_pic !== "null" ? get_img_url(profile_pic) : backend_url() + '/static/images/user_avatar.png'} />
                  <ImageUploader
                      withIcon={true}
                      buttonText={<FormattedMessage
                        id="profile_tab.choose_profile_image"
                        defaultMessage="Choose profile image"
                      />}
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
                <Header as='h4' className={"profile-tab-card-title"}>
                  <FormattedMessage
                    id="profile_tab.personal_information"
                    defaultMessage="Personal information"
                  />
                </Header>
                <form onSubmit={handleSubmit(this.submitForm)}>
                  <CSRFToken/>
                  <DjangoCSRFToken/>
                  <Segment basic>
                  <div>
                    <label htmlFor="first_name">
                      <FormattedMessage
                        id="profile_tab.first_name"
                        defaultMessage="First name"
                      /></label>
                    <div>
                      <Field
                        name="first_name"
                        component="input"
                        type="text"
                        placeholder="First name"
                        label="First name"
                        className={"custom-field"}
                        component={renderField}
                      />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="last_name">
                        <FormattedMessage
                          id="profile_tab.last_name"
                          defaultMessage="Last name"
                        />
                      </label>
                      <div>
                      <Field
                        name="last_name"
                        component="input"
                        type="text"
                        placeholder="Last name"
                        label="Last name"
                        className={"custom-field"}
                        component={renderField}
                      />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone_number">
                        <FormattedMessage
                          id="profile_tab.phone_number"
                          defaultMessage="Phone number"
                        />
                      </label>
                      <div>
                    <Field
                      name="phone_number"
                      component="input"
                      type="text"
                      placeholder="Phone number"
                      label="Phone number"
                      className={"custom-field"}
                      component={renderField}
                    />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email">
                      <FormattedMessage
                        id="profile_tab.email"
                        defaultMessage="Email"
                      />
                    </label>
                    <div>
                      <Field
                        name="email"
                        component="input"
                        type="email"
                        placeholder="Email address"
                        label="Email address"
                        className={"custom-field"}
                        component={renderField}
                        disabled
                      />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="country">
                        <FormattedMessage
                          id="profile_tab.country"
                          defaultMessage="Country"
                        />
                      </label>
                      <div>
                        <Field
                          name="country"
                          placeholder='Country'
                          component={renderDropdownList}
                          data={countries}
                          valueField="value"
                          textField="text" />
                        </div>
                      </div>
                    <div>
                      <label htmlFor="country">
                        <FormattedMessage
                          id="profile_tab.passport_number"
                          defaultMessage="Passport number"
                        />
                      </label>
                      <div>
                      <Field
                        name="passport_number"
                        component="input"
                        type="text"
                        placeholder="Passport number"
                        label="Passport number"
                        className={"custom-field"}
                        component={renderField}
                      />
                      </div>
                    </div>
                    <Button
                      className={"buttoncolor"}
                      size="large"
                      loading={loading}
                      disabled={invalid}
                    >
                    <FormattedMessage
                      id="profile_tab.save"
                      defaultMessage="Save"
                    />
                    </Button>
                  </Segment>
                </form>
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
    first_name: state.userInfo.first_name,
    last_name: state.userInfo.last_name,
    passport_number: state.userInfo.passport_number,
    email: state.userInfo.email,
    date_joined: state.userInfo.date_joined,
    phone_number: state.userInfo.phone_number,
    profile_pic: state.userInfo.profile_pic,
    initialValues: state.userInfo.profileData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (first_name, last_name, phone_number, email, country, passport_number, profile_pic) =>
      dispatch(updateUserProfile(first_name, last_name, phone_number, email, country, passport_number, profile_pic)),
  };
};

ProfileTab.propTypes = {
  profileType: PropTypes.string,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "profile", enableReinitialize: true, validate })(ProfileTab));

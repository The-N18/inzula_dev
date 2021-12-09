import React from "react";
import PropTypes from "prop-types";
import {Field, reduxForm} from 'redux-form';
import {
  Button,
  Grid,
  Header,
  Segment,
  Image
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './profiletab.css';
import { backend_url, get_img_url } from "../../configurations";
import ImageUploader from 'react-images-upload';
import { updateUserProfile } from "../../store/actions/auth";
import { validate } from "./validation";
import {countries} from "../../utils/countries";
import CSRFToken from "../../containers/CSRFToken";
import DjangoCSRFToken from 'django-react-csrftoken';
import {renderField, renderDropdownList, renderPhoneNumber} from "../../containers/ReduxForm/renderField";
import {FormattedMessage, FormattedDate} from 'react-intl'
import { openDeleteAccount } from "../../store/actions/deleteAccount";
import {userTypeOptions, userTypeOptionsFr, sexOptions, sexOptionsFr} from "../../utils/options";
import Files from 'react-files';
// import 'react-phone-number-input/style.css';



class ProfileTab extends React.Component {
  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this);
  }

  state = {
    picture: [],
    passport: [],
  }

  onDrop = (picture) => {
      this.setState({
          picture: picture,
      });
  }

  onFilesChange = (files) => {
    this.setState({
      passport: files,
  });
  }

  onFilesError = (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message);

  }

  submitForm = (val) => {
    const user_type = val['user_type'] && val['user_type']['value']  ? val['user_type']['value'] : val['user_type'];
    const sex = val['sex'] && val['sex']['value']  ? val['sex']['value'] : val['sex'];
    const country = val['country'] && val['country']['value'] ? val['country']['value'] : val['country'];
    this.props.updateProfile(val['first_name'], val['last_name'], val['phone_number'], val['email'], country, val['passport_number'], this.state.picture, user_type, sex, this.state.passport);
  }

  deleteYourAccount = () => {
    this.props.openDeleteAccount();
  }

  render () {
    const {handleSubmit, loading, deleteLoading, username, invalid, date_joined, profile_pic, passport_number, phone_number, email, lang, id_document} = this.props;
    const {passport} = this.state;
    return (
      <Segment basic className={"profile-tab-section"}>
      <Grid className={"profile-tab-section-grid"}>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} tablet={16} computer={6}>
            <Segment className={"profile-tab-card"}>
              <Image centered bordered circular src= {profile_pic !== null && profile_pic !== "null" ? get_img_url(profile_pic) : backend_url() + '/static/images/user_avatar.png'} />
              <ImageUploader
                      withIcon={false}
                      buttonText={<FormattedMessage
                        id="profile_tab.choose_profile_image"
                        defaultMessage="Choose profile image"
                      />}
                      onChange={this.onDrop}
                      maxFileSize={5242880}
                      singleImage={true}
                      withPreview={true}
                      label={""}
                      fileTypeError={<FormattedMessage
                        id="profile_tab.file_type_error"
                        defaultMessage="File type not accepted"
                      />}
                      fileSizeError={<FormattedMessage
                        id="profile_tab.file_size_error"
                        defaultMessage="File is too big"
                      />}
                  />
              <Segment basic textAlign="left">
              <p><FormattedMessage
                id="profile_tab.username_"
                defaultMessage="Username:"
              />{username}</p>
              <p><FormattedMessage
                id="profile_tab.fullname_"
                defaultMessage="Name:"
              />{this.props.first_name} {this.props.last_name}</p>
              {date_joined ? <p><FormattedMessage
                id="profile_tab.member_since"
                defaultMessage="Member since"
              /><FormattedDate
                                  value={date_joined}
                                  year="numeric"
                                  month="short"
                                  day="numeric"
                                  weekday="short"
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
            <Segment className={"profile-tab-card"}>
              <Button
                className={"buttoncolor"}
                size="large"
                loading={deleteLoading}
                onClick={this.deleteYourAccount.bind(this)}
              >
              <FormattedMessage
                id="profile_tab.delete_account"
                defaultMessage="Delete account"
              />
              </Button>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={10} className={"profile-tab-card bordered-column"}>
          <Grid className={"profile-tab-section-grid"}>
            <Grid.Row columns={2}>
              <Grid.Column mobile={16} tablet={16} computer={16}>
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
                      <span><FormattedMessage
                        id="signup.default_profile_type"
                        defaultMessage="Default profile type"
                      /></span>
                      <Field
                        name="user_type"
                        component={renderDropdownList}
                        data={lang === "en" ? userTypeOptions : userTypeOptionsFr}
                        valueField="value"
                        textField="text"/>
                      </div>
                    <div>
                    <span><FormattedMessage
                      id="profile_tab.sex"
                      defaultMessage="Sex"
                    /></span>
                    <Field
                      name="sex"
                      component={renderDropdownList}
                      data={lang === "en" ? sexOptions : sexOptionsFr}
                      valueField="value"
                      textField="text"/>
                    </div>
                    <div>
                      <label htmlFor="phone_number">
                        <FormattedMessage
                          id="profile_tab.phone_number"
                          defaultMessage="Phone number"
                        />
                      </label>
                    <div>
                    {/* <Field
                      name="phone_number"
                      component="input"
                      type="text"
                      placeholder="Phone number"
                      label="Phone number"
                      className={"custom-field"}
                      component={renderField}
                    /> */}
                    <Field
                      type="text"
                      name="phone_number"
                      component={renderPhoneNumber}
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
                        className={"custom-field"}
                        component={renderField}
                      />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="country">
                        <FormattedMessage
                          id="profile_tab.passport_proof"
                          defaultMessage="Passport proof"
                        />
                      </label>
                      <div>
                      <Files
                        className='files-dropzone'
                        onChange={this.onFilesChange}
                        onError={this.onFilesError}
                        accepts={['.pdf', '.doc', '.docx']}
                        maxFiles={1}
                        maxFileSize={10000000}
                        minFileSize={0}
                        clickable
                      >
                        <Button
                          className={"buttoncolor-passport"}
                          size="small"
                        >
                        <FormattedMessage
                          id="profile_tab.passport_upload_btn"
                          defaultMessage="Save"
                        />
                        </Button>
                        <p className={"passport-file-name"}>{passport.length > 0 ? passport[0]['name'] : ''}</p>
                        <p className={"passport-file-name"}>{id_document !== null ? id_document : ''}</p>
                      </Files>
                      </div>
                    </div>
                    <Button
                      className={"buttoncolor"}
                      size="large"
                      loading={loading}
                      disabled={invalid}
                      type="submit"
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
    deleteLoading: state.auth.deleteLoading,
    first_name: state.userInfo.first_name,
    last_name: state.userInfo.last_name,
    username: state.userInfo.username,
    passport_number: state.userInfo.passport_number,
    email: state.userInfo.email,
    user_type: state.userInfo.user_type,
    lang: state.appConfig.lang,
    date_joined: state.userInfo.date_joined,
    phone_number: state.userInfo.phone_number,
    profile_pic: state.userInfo.profile_pic,
    id_document: state.userInfo.id_document,
    initialValues: state.userInfo.profileData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (first_name, last_name, phone_number, email, country, passport_number, profile_pic, user_type, sex, passport_file) =>
      dispatch(updateUserProfile(first_name, last_name, phone_number, email, country, passport_number, profile_pic, user_type, sex, passport_file)),
    openDeleteAccount: () => dispatch(openDeleteAccount())
  };
};

ProfileTab.propTypes = {
  profileType: PropTypes.string,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "profile", enableReinitialize: true, validate })(ProfileTab));

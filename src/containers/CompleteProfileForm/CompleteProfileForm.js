import React, {useState} from "react";
import PropTypes from "prop-types";
import {Field, reduxForm} from 'redux-form';
import {
  Button,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './completeprofileform.css';
import { completeProfileInfo } from "../../store/actions/auth";
import { validate } from "./validation";
import {countries} from "../../utils/countries";
import CSRFToken from "../CSRFToken";
import DjangoCSRFToken from 'django-react-csrftoken';
import {renderField, renderDropdownList, renderPhoneNumber} from "../ReduxForm/renderField";
import {FormattedMessage} from 'react-intl'
import {sexOptions, sexOptionsFr} from "../../utils/options";
import Files from 'react-files';
// import 'react-phone-number-input/style.css';



class CompleteProfileForm extends React.Component {
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
    const sex = val['sex'] && val['sex']['value']  ? val['sex']['value'] : val['sex'];
    const country = val['country'] && val['country']['value'] ? val['country']['value'] : val['country'];
    this.props.completeProfileInfo(val['first_name'], val['last_name'], val['phone_number'], country, val['passport_number'], sex);
  }

  deleteYourAccount = () => {
    this.props.openDeleteAccount();
  }

  render () {
    const {handleSubmit, loading, invalid, lang, id_document} = this.props;
    const {passport} = this.state;
    return (
      <Segment basic className={"profile-tab-section"}>
          <Grid className={"profile-tab-section-grid"}>
            <Grid.Row columns={1}>
              <Grid.Column mobile={16} tablet={16} computer={16}>
                <Segment basic textAlign="center">
                <Header as='h4' className={"profile-tab-card-title"}>
                  <FormattedMessage
                    id="profile_tab.personal_information"
                    defaultMessage="Personal information"
                  />
                </Header>
                <form onSubmit={handleSubmit(this.submitForm)}>
                  <Segment basic>
                    <CSRFToken/>
                    <DjangoCSRFToken/>
                    <div>
                      <label htmlFor="first_name">
                        <FormattedMessage
                          id="profile_tab.first_name"
                          defaultMessage="First name"
                        /></label>
                      </div>
                        <Field
                          name="first_name"
                          component="input"
                          type="text"
                          placeholder="First name"
                          label="First name"
                          className={"custom-field"}
                          component={renderField}
                        />
                      <div>
                      <label htmlFor="last_name">
                        <FormattedMessage
                          id="profile_tab.last_name"
                          defaultMessage="Last name"
                        />
                      </label>
                      </div>
                      <Field
                        name="last_name"
                        component="input"
                        type="text"
                        placeholder="Last name"
                        label="Last name"
                        className={"custom-field"}
                        component={renderField}
                      />
                    <div>
                    <span><FormattedMessage
                      id="profile_tab.sex"
                      defaultMessage="Sex"
                    /></span>
                    </div>
                    <Field
                      name="sex"
                      component={renderDropdownList}
                      data={lang === "en" ? sexOptions : sexOptionsFr}
                      valueField="value"
                      textField="text"/>
                    <div>
                      <label htmlFor="phone_number">
                        <FormattedMessage
                          id="profile_tab.phone_number"
                          defaultMessage="Phone number"
                        />
                      </label>
                    </div>
                    <Field
                      type="text"
                      name="phone_number"
                      component={renderPhoneNumber}
                    />
                    <div>
                      <label htmlFor="country">
                        <FormattedMessage
                          id="profile_tab.country"
                          defaultMessage="Country"
                        />
                      </label>
                      </div>
                        <Field
                          name="country"
                          placeholder='Country'
                          component={renderDropdownList}
                          data={countries}
                          valueField="value"
                          textField="text" />
                    <div>
                      <label htmlFor="country">
                        <FormattedMessage
                          id="profile_tab.passport_number"
                          defaultMessage="Passport number"
                        />
                      </label>
                      </div>
                      <Field
                        name="passport_number"
                        component="input"
                        type="text"
                        placeholder="Passport number"
                        label="Passport number"
                        className={"custom-field"}
                        component={renderField}
                      />
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
    completeProfileInfo: (first_name, last_name, phone_number, country, passport_number, sex, passport_file) =>
      dispatch(completeProfileInfo(first_name, last_name, phone_number, country, passport_number, sex, passport_file)),
  };
};

CompleteProfileForm.propTypes = {
  profileType: PropTypes.string,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "complete_profile_form", enableReinitialize: true, validate })(CompleteProfileForm));

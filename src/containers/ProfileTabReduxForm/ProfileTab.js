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

    this.state = {
      picture: [],
      passport: [],
    }

    this.imgUploadButtonRef = React.createRef();
    this.imgUploadPreviewRef = React.createRef();
  }



  // onDrop = (picture) => {
  //   console.log("PICTURE",picture);

  //     this.setState({
  //         picture: picture,
  //     });
  // }

  onDrop = () => {
    const curFiles = this.imgUploadButtonRef.current.files;
    console.log("PICTURE",curFiles);
    
    if(curFiles.length!=0){
      this.imgUploadPreviewRef.current.src = URL.createObjectURL(curFiles[0]);

      this.setState({
        picture: curFiles,
    });
    }

    
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
      <React.Fragment>
        <div className="dashboard-content">
          <div className="dashboard-form mb-4">
            <div className="row">
              {/* Profile */}
              <div className="col-lg-6 col-md-6 col-xs-12 padding-right-30">
                <div className="dashboard-list">
                  <h4 className="gray"> Details du profil</h4>
                  <div className="dashboard-list-static">
                    {/* Avatar */}
                    <div className="edit-profile-photo">
                      {/* <img src="/images/user-avatar.jpg" alt="" /> */}
                      <img ref={this.imgUploadPreviewRef} src="/images/user-avatar.jpg"  alt="Preview" />
                      <div className="change-photo-btn">
                        <div className="photoUpload">
                          <span><i className="fa fa-upload" /> Importer Photo</span>
                          <input type="file" onChange={this.onDrop} ref={this.imgUploadButtonRef} className="upload" />
                        </div>
                      </div>
                    </div>
                    {/* Details */}
                    <div className="my-profile">
                      <div className="form-group">
                        <label>Prénom *</label>
                        <Field
                          name="first_name"
                          component="input"
                          type="text"
                          placeholder="First name"
                          label="First name"
                          className={"custom-field"}
                          component={renderField}
                        />
                        {/* <input defaultValue="Hermann" type="text" /> */}
                      </div> 
                      <div className="form-group">
                        <label>Nom *</label>
                        <Field
                          name="last_name"
                          component="input"
                          type="text"
                          placeholder="Last name"
                          label="Last name"
                          className={"custom-field"}
                          component={renderField}
                        />
                        {/* <input defaultValue="TEST" type="text" /> */}
                      </div>
                      <div className="input-box">
                        <select className="niceSelect">
                          <option value={1}>Sexe *</option>
                          <option value={2}>Masculin</option>
                          <option value={3}>Feminin</option>
                        </select>
                      </div><br />
                      <div className="form-group">
                        <label>Adresse Mail *</label>
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
                        {/* <input defaultValue="hermann@test.com" type="text" /> */}
                      </div> 													
                      <div className="form-group">
                        <label>Numéro de téléphone *</label>
                        <input defaultValue="(00237) 642758594" type="text" />
                      </div>
                      {/* <div class="form-group">
                                                        <label>Adresse Mail *</label>
                                                        <input value="hermann@test.com" type="text">
                                                    </div>  */}
                    </div>
                    <div className="form-btn">
                      <a href="#" className="nir-btn">Sauvegarder</a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Change Password */}
              <div className="col-lg-6 col-md-6 col-xs-12 padding-left-30">
                <div className="dashboard-list margin-top-0">
                  {/* <h4 class="gray">Autres informations</h4> */}
                  <div className="dashboard-list-static">
                    {/* <div class="input-box">
														<select class="niceSelect">
															<option value="1">Type de profil par défaut</option>
															<option value="2">Expéditeur</option>
															<option value="3">Transporteur</option>
														</select>
													</div> <br>

													<div class="input-box">
														<select class="niceSelect">
															<option value="1">Pays de résidence</option>
															<option value="2">Argentina</option>
															<option value="3">Belgium</option>
															<option value="4">Canada</option>
															<option value="5">Denmark</option>
														</select>
													</div> <br> */}
                    
                    <div className="form-group">
                      <label className="fb-input"><i className="fab fa-facebook" /> Facebook</label>
                      <input placeholder="https://www.facebook.com/" type="text" />
                    </div>
                    <div className="form-group mb-0">
                      <label>Passeport</label>
                      <div className="input-box">
                        <label className="upload-file mb-0">
                          <input type="file" />
                          <i className="far fa-image" />
                          <span>Cliquez ici pour uploader votre passeport</span>
                        </label>
                      </div>                             
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-form mb-4">
          <div className="dashboard-password">
            <h4>Modifier le mot de passe</h4>
            <form>
              <div className="row">
                <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label>Mot de passe actuel</label>
                    <input type="password" placeholder="*********" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label>Nouveau mot de passe</label>
                    <input type="password" />
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label>Re-Saisir le nouveau mot de passe</label>
                    <input type="password" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-btn mar-top-15">
                    <a href="#" className="nir-btn">Sauvegarder</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
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

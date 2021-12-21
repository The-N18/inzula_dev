import React, {Component} from 'react';
import {Field, reduxForm, reset} from 'redux-form';
import styles from './signup.css';
import {
  Segment,
  Button,
  Grid,
  Header,
  Icon,
  Modal
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { authSignup, authSetDiscountText } from "../../store/actions/auth";
import { openSignupModal, closeSignupModal } from "../../store/actions/signupModal";
import { openLoginParentModal } from "../../store/actions/loginParentModal";
import { closeSignupParentModal } from "../../store/actions/signupParentModal";
import { connect } from "react-redux";
import { validate } from "./validation";
import {renderField, renderDropdownList} from "../../containers/ReduxForm/renderField";
import {FormattedMessage} from 'react-intl'
import { withRouter } from "react-router-dom";
import {userTypeOptions, userTypeOptionsFr} from "../../utils/options";


class RegistrationForm extends Component {

  submitForm = (val) => {
    console.log('FORM VALUE',val);
    
    const {with_discount} = this.props;

    console.log('With discount',with_discount)

    const user_type = val['user_type'] 
    this.props.signup(val['first_name'], val['last_name'], val['username'], val['email'], val['password1'], val['password2'], val['terms_conditions'], user_type, with_discount);
  }

  handleSignin = () => {
    this.props.closeSignupModal();
    this.props.closeSignupParentModal();
    this.props.openLoginParentModal();
  }

  handleOnTermsClick = () => {
    const win = window.open("/terms", "_blank");
    win.focus();
  }

  render () {
    const {handleSubmit, token, loading, invalid, discountText, open, lang} = this.props;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-form text-center">
        <form>
          <Field
            name="first_name"
            component="input"
            placeholder="Prénom"
            type="text"
            component={renderField}
          />
          <Field
            name="last_name"
            component="input"
            placeholder="Nom"
            type="text"
            component={renderField}
          />
          <Field
            name="username"
            component="input"
            placeholder="Nom d'utilisateur"
            type="text"
            component={renderField}
          />
          <Field
            name="email"
            component="input"
            placeholder="Adresse mail"
            type="email"
            component={renderField}
          />
          <Field
            name="password1"
            component="input"
            placeholder="Mot de passe"
            type="password"
            component={renderField}
          />
          <Field
            name="password2"
            component="input"
            placeholder="Confirmation mot de passe"
            type="password"
            component={renderField}
          />
          <Field
            name="user_type"
            type="text"
            component={({ input, data, valueField, textField, meta: { touched, error, warning }}) => 
            <div className="input-box">
              <select {...input} className="niceSelect">
                <option value={""}>Profil par défaut</option>
                <option value={"sender"}>Expéditeur</option>
                <option value={"carrier"}>Transporteur</option>
              </select>
              {touched && ((error && <span className={"error-on-input"}>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
            }
          /><br />
                                      
        </form>
        <div className="form-btn">
          <a href="#" onClick={handleSubmit(this.submitForm)} className={`nir-btn ${invalid?'disabled':''}`}>Inscrivez-vous</a>
        </div>
        <div className="form-group mb-0 form-checkbox mt-3">
          <Field 
            name="terms_conditions" 
            id="terms_conditions"
            type="checkbox"
            component="input"
          />
           J'ai lu et je m'engage à respecter les<a onClick={this.handleOnTermsClick.bind(this)} className style={{color: '#a10115'}}> règles de bienveillance</a> du site et j'accepte l'utilisation des cookies
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    discountText: state.auth.discountText,
    open: state.signupModal.open,
    with_discount: state.signupModal.with_discount,
    lang: state.appConfig.lang,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (first_name, last_name, username, email, password1, password2, terms_conditions, user_type, with_discount) =>
      dispatch(authSignup(first_name, last_name, username, email, password1, password2, terms_conditions, user_type, with_discount)),
    setDiscountText: (discountText) => dispatch(authSetDiscountText(discountText)),
    openSignupModal: () => dispatch(openSignupModal()),
    closeSignupModal: () => dispatch(closeSignupModal()),
    closeSignupParentModal: () => dispatch(closeSignupParentModal()),
    openLoginParentModal: () => dispatch(openLoginParentModal()),
  };
};

let RegistrationFormConnected = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm));

const afterSubmit = (result, dispatch) => dispatch(reset('signup'));

RegistrationFormConnected = reduxForm ({
  form: 'signup', onSubmitSuccess: afterSubmit,
  validate
}) (RegistrationFormConnected);

export default RegistrationFormConnected;

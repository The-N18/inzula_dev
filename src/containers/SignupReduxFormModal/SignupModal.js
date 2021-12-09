import React, {Component} from 'react';
import {Field, reduxForm, reset} from 'redux-form';
// import styles from './signup.css';
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
    const {with_discount} = this.props;
    const user_type = val['user_type'] ? val['user_type']['value'] : '';
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
      <Modal
      closeIcon
        centered={false}
        open={open}
        onClose={() => this.props.closeSignupModal()}
        onOpen={() => this.props.openSignupModal()}
        size='large'
      >
        <Modal.Header>
          <FormattedMessage
            id="signup.title"
            defaultMessage="Signup"
          />
        </Modal.Header>
        <Modal.Content scrolling>
      <Segment vertical>
      <Grid
        textAlign="center"
        style={{ height: "60vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {discountText !== null ? <Header as="h4" textAlign="center" color="teal" className={"discountheader"}>
            {discountText}
          </Header> : ''}
          <React.Fragment>
      <form onSubmit={handleSubmit(this.submitForm)}>
      <Segment raised className={"signupcard"}>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} tablet={16} computer={8}>
          <div>
            <label for="first_name">
              <FormattedMessage
                id="signup.f_name"
                defaultMessage="First name"
              />
            </label>
            <Field
              name="first_name"
              component="input"
              type="text"
              component={renderField}
            />
          </div>
          </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={8}>
        <div>
          <label for="last_name">
            <FormattedMessage
              id="signup.l_name"
              defaultMessage="Last name"
            />
          </label>
          <Field
            name="last_name"
            component="input"
            type="text"
            component={renderField}
          />
          </div>
        </Grid.Column>
        </Grid.Row>
      </Grid>
      <div>
      <label for="username">
        <FormattedMessage
          id="signup.username"
          defaultMessage="Username"
        />
      </label>
      <Field
        name="username"
        component="input"
        type="text"
        component={renderField}
      />
      </div>
      <div>
      <label for="email">
        <FormattedMessage
          id="signup.email"
          defaultMessage="Email"
        />
      </label>
        <Field
          name="email"
          component="input"
          type="email"
          component={renderField}
        />
        </div>
        <div>
        <label for="password">
          <FormattedMessage
            id="signup.password"
            defaultMessage="Password"
          />
        </label>
        <Field
          name="password1"
          component="input"
          type="password"
          component={renderField}
        />
        </div>
        <div>
        <label for="password2">
          <FormattedMessage
            id="signup.confirm_password"
            defaultMessage="Confirm password"
          />
        </label>
        <Field
          name="password2"
          component="input"
          type="password"
          component={renderField}
        />
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
        </div>
        <div className={"push-left"}>
            <Field name="terms_conditions" id="terms_conditions" component="input" type="checkbox"/>
            <label className={"anchor-style"} onClick={this.handleOnTermsClick.bind(this)}><FormattedMessage
              id="signup.agree_terms"
              defaultMessage="I agree to the Terms and Conditions"
            />
          </label>
        </div>
        <Button
          type="submit"
          size="large"
          className={"buttoncolor"}
          loading={loading}
          disabled={invalid}
        >
        <FormattedMessage
          id="signup.signup"
          defaultMessage="Signup"
        />
        </Button>
        </Segment>
      </form>
      <Segment raised className={"signupcard"}>
        <FormattedMessage
          id="signup.have_account"
          defaultMessage="Already have an account?"
        /> <span className={"mimic-anchor"} onClick={this.handleSignin.bind(this)}>
        <FormattedMessage
          id="signup.login"
          defaultMessage="Login"
        /></span>
      </Segment>
    </React.Fragment>
  </Grid.Column>
</Grid>
</Segment>
</Modal.Content>
<Modal.Actions>
  <Button negative onClick={() => this.props.closeSignupModal()} primary>
    <FormattedMessage
      id="signup.cancel"
      defaultMessage="Cancel"
    /> <Icon name='cancel' />
  </Button>
</Modal.Actions>
</Modal>
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

import React from "react";
import {
  Segment,
  Header,
  Button
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './resetpassword.css';
import { withRouter } from "react-router-dom";
import { resetPassword } from "../../store/actions/auth";
import {FormattedMessage} from 'react-intl'
import {Field, reset, reduxForm} from 'redux-form';
import { validate } from "./validation";
import {renderField} from "../../containers/ReduxForm/renderField";

class ResetPassword extends React.Component {

    submitForm = (val) => {
      const { match } = this.props;
      this.props.resetPassword(match.params.uid, match.params.token, val['new_password1'], val['new_password2']);
    }

  render() {
    const {loading, handleSubmit, invalid} = this.props;
    return (
      <Segment style={{ padding: "12em 0em" }} vertical basic>
        <Header as="h4" textAlign="center" color="teal">
          <FormattedMessage
            id="reset_password.title"
            defaultMessage="Reset your password"
          />
        </Header>
          <Segment basic textAlign="center" className={"signupparent-segment"}>
          <Segment raised className={"signupparentcard"} textAlign="center">
            <form onSubmit={handleSubmit(this.submitForm)}>
            <div>
              <label for="new_password1">
                <FormattedMessage
                  id="reset_password.new_password1"
                  defaultMessage="Password"
                />
              </label>
              <Field
                name="new_password1"
                component="input"
                type="password"
                component={renderField}
              />
            </div>
            <div>
              <label for="new_password2">
                <FormattedMessage
                  id="reset_password.new_password2"
                  defaultMessage="Re-enter password"
                />
              </label>
              <Field
                name="new_password2"
                component="input"
                type="password"
                component={renderField}
              />
            </div>
            <Button
              type="submit"
              size="large"
              className={"buttoncolor"}
              disabled={invalid}
              loading={loading}
            >
            <FormattedMessage
              id="reset_password.reset_password_btn"
              defaultMessage="Reset password"
            />
            </Button>
            </form>
          </Segment>
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.verifyUser.loading,
    error: state.verifyUser.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: (uid, token, password1, password2) => dispatch(resetPassword(uid, token, password1, password2)),
  };
};

const afterSubmit = (result, dispatch) => dispatch(reset('reset_password'));

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "reset_password", onSubmitSuccess: afterSubmit, validate})(ResetPassword)));

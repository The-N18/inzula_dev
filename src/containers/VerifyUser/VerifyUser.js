import React from "react";
import {
  Segment,
  Icon,
  Header
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './verifyuser.css';
import { withRouter } from "react-router-dom";
import { verifyUser } from "../../store/actions/verifyUser";
import {FormattedMessage} from 'react-intl'

class VerifyUser extends React.Component {

  componentDidMount = () => {
    const { match } = this.props;
    this.props.verifyUser(match.params.verificationKey);
    }

  render() {
    const {loading, error, match} = this.props;
    return (
      <Segment style={{ padding: "12em 0em" }} vertical basic>
        <Header as="h4" textAlign="center" color="teal">
          <FormattedMessage
            id="verify_email.title"
            defaultMessage="Verifying your email..."
          />
        </Header>
          <Segment basic textAlign="center" className={"signupparent-segment"}>
          <Segment raised className={"signupparentcard"} textAlign="center">
            {!loading && error === null ? <span className={"verification-success"}><Icon size='massive' name='checkmark' /> <FormattedMessage
              id="verify_email.success"
              defaultMessage="Email has been verified successfully"
            /></span> : ''}
            {error || !match.params.verificationKey? <span className={"verification-failed"}><Icon size='massive' name='close' /><FormattedMessage
              id="verify_email.failed"
              defaultMessage="Failed to verify your email address."
            /></span> : ''}
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
    verifyUser: (verificationKey) => dispatch(verifyUser(verificationKey)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
)(VerifyUser)
);

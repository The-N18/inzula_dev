import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";

import CustomLayout from "./containers/Layout/Layout";
import {IntlProvider} from 'react-intl'
import * as messagesInEnglish from "./intl/en";
import * as messagesInFrench from "./intl/fr";

// import $ from 'jquery';
// window.jQuery = $;



class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  getMessagesFromLang = (lang) => {
    switch (lang) {
      case "fr":
        return messagesInFrench.msg;
      case "en":
        return messagesInEnglish.msg;
      default:
        return messagesInEnglish.msg;
    }
  }

  render() {
    const {lang} = this.props;
    return (
      <IntlProvider locale={lang} messages={this.getMessagesFromLang(lang)}>
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </Router>
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    lang: state.appConfig.lang
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

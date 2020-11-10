import React from "react";
import {
  Button,
  Form,
  Grid,
  Image,
  Segment,
  Dropdown,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { setLang } from "../../store/actions/appConfig";
import styles from './languageswitcherselector.css';
import { backend_url } from "../../configurations";


class LanguageSwitcherSelector extends React.Component {

  render() {
    const {lang} = this.props;
    const languages = [
        { code: 'en', name: 'English', img: backend_url() + '/static/images/icons/english.png'},
        { code: 'fr', name: 'Francais', img: backend_url() + '/static/images/icons/french.jpg'}
      ];
    return (
      <div className="lang">
      {/* return <Image bordered circular inline className={"lang-image"} src={language.img} onClick={() => {this.props.setLang(language.code)}}/>;*/}
        <span className={lang === "en" ? "lang-span active-lang" : "lang-span lang-en"} onClick={() => {this.props.setLang('en')}}>EN</span>
        <span className={lang === "fr" ? "lang-span active-lang" : "lang-span lang-fr"} onClick={() => {this.props.setLang('fr')}}>FR</span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.appConfig.lang,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLang: (lang) => dispatch(setLang(lang))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSwitcherSelector);

import React from "react";
import {
  Message,
  Segment,
  Tab,
  Radio,
  Grid
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// import styles from './myprofile.css';
// import ProfileTab from "../../containers/ProfileTab/ProfileTab";
import ProfileTab from "../../containers/ProfileTabReduxForm/ProfileTab";
import TripsReservationsList from "../../containers/TripsReservationsList/TripsReservationsList";
import SenderCarrierNotifsList from "../../containers/SenderCarrierNotifsList/SenderCarrierNotifsList";
import UserFinance from "../../containers/UserFinance/UserFinance";
import UserBookingsList from "../../containers/UserBookingsList/UserBookingsList";
import { setActiveIndex } from "../../store/actions/myProfile";
import $ from "jquery";
import { toggleProfileType } from "../../store/actions/userInfo";
import {FormattedMessage} from 'react-intl';





class MyProfile extends React.Component {

  state = {
    isMobile: false,
    isTablet: false
  };

  handleScreenSize = () => {
    if($(window).width() < 768) {
      this.setState({ isMobile: true });
    }
    if($(window).width() >= 768) {
      this.setState({ isTablet: true });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleScreenSize, false);
    this.handleScreenSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreenSize);
  }

  handleTabChange = (e, { activeIndex }) => {
    this.props.setActiveIndex(activeIndex);
  }

  handleRadioChange = (e, data) => {
    const {profileType, activeIndex} = this.props;
    if(profileType === "carrier" && activeIndex === 4) {
      this.props.setActiveIndex(0);
    }
    this.props.toggleProfileType(profileType === "sender" ? "carrier" : "sender");
  };

  render() {
    
    return (
      <h2>Here he Just sets the tabs</h2>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    token: state.auth.token,
    activeIndex: state.myProfile.activeIndex,
    profileType: state.userInfo.profileType,
    lang: state.appConfig.lang
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveIndex: (activeIndex) => dispatch(setActiveIndex(activeIndex)),
    toggleProfileType: (profileType) => dispatch(toggleProfileType(profileType)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfile);

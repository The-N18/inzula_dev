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
import styles from './myprofile.css';
// import ProfileTab from "../../containers/ProfileTab/ProfileTab";
import ProfileTab from "../../containers/ProfileTabReduxForm/ProfileTab";
import TripsReservationsList from "../../containers/TripsReservationsList/TripsReservationsList";
import SenderCarrierNotifsList from "../../containers/SenderCarrierNotifsList/SenderCarrierNotifsList";
import UserFinance from "../../containers/UserFinance/UserFinance";
import UserBookingsList from "../../containers/UserBookingsList/UserBookingsList";
import { setActiveIndex } from "../../store/actions/myProfile";
import $ from "jquery";
import { toggleProfileType } from "../../store/actions/userInfo";



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
    const { token, activeIndex, profileType } = this.props;
    const {isMobile} = this.state;
    // if (token === null) {
    //   return <Redirect to="/" />;
    // }
    const panes = [
      {
        menuItem: { key: 'profile', icon: 'user', content: isMobile ? '' : 'Profile' },
        render: () => <Tab.Pane attached={false}><ProfileTab/></Tab.Pane>,
      },
      {
        menuItem: { key: 'reservation', icon: 'calendar', content: profileType === "sender" ? 'My Reservations' : 'My Trips' },
        render: () => <Tab.Pane attached={false}><TripsReservationsList/></Tab.Pane>,
      },
      {
        menuItem: { key: 'alerts', icon: 'bell', content: isMobile ? '' : 'Alerts' },
        render: () => <Tab.Pane attached={false}><SenderCarrierNotifsList/></Tab.Pane>,
      },
      {
        menuItem: { key: 'finances', icon: 'money bill alternate outline', content: isMobile ? '' : 'Finances' },
        render: () => <Tab.Pane attached={false}><UserFinance/></Tab.Pane>,
      },
    ];

    const tabs = profileType === "sender" ? panes : [...panes, {
      menuItem: { key: 'booking', icon: 'calendar', content: 'Booked Trips'},
      render: () => <Tab.Pane attached={false}><UserBookingsList/></Tab.Pane>,
    },]

    return (
      <Segment style={{ padding: "7em 0em" }} vertical>
        <Grid verticalAlign="middle">
          <Grid.Row verticalAlign="middle" columns={3}>
            <Grid.Column mobile={16} tablet={16} computer={6}>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={6}>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={4} textAlign={"right"} float={"right"}>
              <div>
                <Message floating compact info>
                    You are in {profileType} mode. Switch?
                    <Radio
                      toggle
                      checked={profileType === "sender"}
                      onChange={this.handleRadioChange}
                      />
                </Message>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Tab
          activeIndex={activeIndex}
          menu={{ borderless: true, attached: false, tabular: false }}
          panes={tabs}
          onTabChange={this.handleTabChange}
        />
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    token: state.auth.token,
    activeIndex: state.myProfile.activeIndex,
    profileType: state.userInfo.profileType
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

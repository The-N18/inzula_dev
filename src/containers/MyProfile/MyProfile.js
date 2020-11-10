import React from "react";
import {
  Message,
  Segment,
  Tab,
  Radio
} from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styles from './myprofile.css';
import ProfileTab from "../../containers/ProfileTab/ProfileTab";
import TripsReservationsList from "../../containers/TripsReservationsList/TripsReservationsList";
import { setActiveIndex } from "../../store/actions/myProfile";



class MyProfile extends React.Component {

  state = {
    profileType: "sender",
  };

  // handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

  handleTabChange = (e, { activeIndex }) => {
    this.props.setActiveIndex(activeIndex);
  }

  handleRadioChange = (e, data) => {
    const { profileType } = this.state;
    if(profileType === "sender") {
      this.setState({ profileType: "carrier" });
    } else {
      this.setState({ profileType: "sender" });
    }

  };

  render() {
    const { token, activeIndex } = this.props;
    const {profileType} = this.state;
    // if (token === null) {
    //   return <Redirect to="/" />;
    // }
    const panes = [
      {
        menuItem: { key: 'profile', icon: 'user', content: 'Profile' },
        render: () => <Tab.Pane attached={false}><ProfileTab profileType={profileType}/></Tab.Pane>,
      },
      {
        menuItem: { key: 'reservation', icon: 'calendar', content: profileType === "sender" ? 'Reservations' : 'Trips' },
        render: () => <Tab.Pane attached={false}><TripsReservationsList profileType={profileType}/></Tab.Pane>,
      },
      {
        menuItem: { key: 'alerts', icon: 'bell', content: 'Alerts' },
        render: () => <Tab.Pane attached={false}>Tab 4 Content</Tab.Pane>,
      },
      {
        menuItem: { key: 'finances', icon: 'money bill alternate outline', content: 'Finances' },
        render: () => <Tab.Pane attached={false}>Tab 5 Content</Tab.Pane>,
      },
    ];

    return (
      <Segment style={{ padding: "7em 0em" }} vertical>
        <Message className={"pushleft"}>
          You are in {profileType} mode. Switch?
          <div>
            <Radio
              toggle
              checked={profileType === "sender"}
              onChange={this.handleRadioChange}
              />
          </div>
        </Message>
        <Tab
          activeIndex={activeIndex}
          menu={{ borderless: true, attached: false, tabular: false }}
          panes={panes}
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
    activeIndex: state.myProfile.activeIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveIndex: (activeIndex) => dispatch(setActiveIndex(activeIndex)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfile);

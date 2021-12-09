import React from "react";
import {
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './tripsreservationslist.css';
import CarrierNotifsList from "../../containers/CarrierNotifsList/CarrierNotifsList";
import SenderNotifsList from "../../containers/SenderNotifsList/SenderNotifsList";


class SenderCarrierNotifsList extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
  };

  render() {
    const { profileType } = this.props;
    return (
      <Segment basic className={"profile-tab-section"}>
        {profileType === "sender" ? <SenderNotifsList/> : <CarrierNotifsList/>}

      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    profileType: state.userInfo.profileType
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

SenderCarrierNotifsList.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SenderCarrierNotifsList);

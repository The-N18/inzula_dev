import React from "react";
import PropTypes from "prop-types";
import {
  Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
// import styles from './tripsreservationslist.css';
import UserTripsList from "../../containers/UserTripsList/UserTripsList";
import UserReservationsList from "../../containers/UserReservationsList/UserReservationsList";


class TripsReservationsList extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
  };

  render() {
    const { profileType } = this.props;
    return (
      <Segment basic className={"profile-tab-section"}>
        {profileType === "sender" ? <UserReservationsList selectable={false} editable={true}/> : <UserTripsList/>}

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

TripsReservationsList.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripsReservationsList);

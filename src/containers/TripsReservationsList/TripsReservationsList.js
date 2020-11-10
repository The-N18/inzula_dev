import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Select,
  Image
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './tripsreservationslist.css';
import { backend_url } from "../../configurations";
import ImageUploader from 'react-images-upload';
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
        {profileType === "sender" ? <UserReservationsList selectable={false}/> : <UserTripsList/>}

      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

TripsReservationsList.propTypes = {
  profileType: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripsReservationsList);

import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
  Container
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { searchTrips } from "../../store/actions/auth";
import styles from './transport.css';
import AddTripForm from "../../containers/AddTripForm/AddTripForm";
import SearchTripsForm from "../../containers/SearchTripsForm/SearchTripsForm";

class Transport extends React.Component {

  render() {
    return (
      <Segment style={{ padding: "8em 0em" }} vertical>
        <AddTripForm/>
        <SearchTripsForm/>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transport);

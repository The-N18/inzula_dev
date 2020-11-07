import React from "react";
import {
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './transport.css';
import AddTripForm from "../../containers/AddTripForm/AddTripForm";
import TransportHowToMakeMoney from "../../containers/TransportHowToMakeMoney/TransportHowToMakeMoney";
import SearchBookingRequestsForm from "../../containers/SearchBookingRequestsForm/SearchBookingRequestsForm";

class Transport extends React.Component {

  render() {
    return (
      <Segment style={{ padding: "8em 0em" }} vertical>
        <AddTripForm/>
        <SearchBookingRequestsForm/>
        <TransportHowToMakeMoney/>
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

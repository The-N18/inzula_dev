import React from "react";
import {
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './transport.css';
import AddTripFormWithText from "../../containers/AddTripFormWithText/AddTripFormWithText";
import TransportHowToMakeMoney from "../../containers/TransportHowToMakeMoney/TransportHowToMakeMoney";
import SearchBookingRequestsForm from "../../containers/SearchBookingRequestsReduxForm/SearchBookingRequestsForm";

class Transport extends React.Component {

  render() {
    return (
      <Segment style={{ padding: "8em 0em" }} vertical>
        <AddTripFormWithText/>
        <SearchBookingRequestsForm inNewPage={false}/>
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

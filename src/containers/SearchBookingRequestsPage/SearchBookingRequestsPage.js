import React from "react";
import {
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './searchbookingrequests.css';
import AddTripForm from "../../containers/AddTripForm/AddTripForm";
import TransportHowToMakeMoney from "../../containers/TransportHowToMakeMoney/TransportHowToMakeMoney";
import SearchBookingRequestsForm from "../../containers/SearchBookingRequestsReduxForm/SearchBookingRequestsForm";

class SearchBookingRequestsPage extends React.Component {

  render() {
    return (
      <Segment basic style={{ padding: "8em 0em" }} textAlign="center">
        <SearchBookingRequestsForm inNewPage={true}/>
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
)(SearchBookingRequestsPage);

import React from "react";
import {
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import styles from './sendpage.css';
import SearchTripsForm from "../../containers/SearchTripsForm/SearchTripsForm";
import SendPackageModal from "../../containers/SendPackageModal/SendPackageModal";
import SelectReservationsModal from "../../containers/SelectReservationsModal/SelectReservationsModal";

class SendPage extends React.Component {

  render() {
    return (
      <Segment style={{ padding: "8em 0em" }} vertical>
        <SelectReservationsModal/>
        <SendPackageModal/>
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
)(SendPage);

import React from "react";

import { connect } from "react-redux";
// import styles from './transport.css';
import AddTripFormWithText from "../../containers/AddTripFormWithText/AddTripFormWithText";
import TransportHowToMakeMoney from "../../containers/TransportHowToMakeMoney/TransportHowToMakeMoney";
import SearchBookingRequestsForm from "../../containers/SearchBookingRequestsReduxForm/SearchBookingRequestsForm";

class Transport extends React.Component {

  render() {
    return (
      <div>
        <AddTripFormWithText/>
        {/* <SearchBookingRequestsForm inNewPage={false}/>
        <TransportHowToMakeMoney/> */}
      </div>
        
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

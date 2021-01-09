import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Radio
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { tripAddition, toggleCheck } from "../../store/actions/addTrip";
import styles from './addtripformwithtext.css';
import {NOTIFICATION_TYPE_WARNING} from 'react-redux-notify';
import { createNotif } from "../../store/actions/appConfig";
import {formValueSelector} from 'redux-form';
import { openLoginParentModal } from "../../store/actions/loginParentModal";
import {FormattedMessage} from 'react-intl'
import AddTripForm from "../../containers/AddTripFormRedux/AddTripForm";


class AddTripFormWithText extends React.Component {

  constructor(props) {
    super(props)

    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);

  }

  recaptchaLoaded() {
    console.log('capcha successfully loaded');
  }

  handleSubscribe() {
    if (this.state.isVerified) {
      alert('You have successfully subscribed!');
    } else {
      alert('Please verify that you are a human!');
    }
  }

  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true
      })
    }
  }


  state = {
    isVerified: false,
  };


  submitForm = (val) => {
    const {userId, authenticated, trip_type_check} = this.props;
    const createdBy = {"user": userId};
    console.log(val);
    if(authenticated) {
      const departureLocation = val['departure_location'] ? val['departure_location']['pk'] : null;
      const destinationLocation = val['destination_location'] ? val['destination_location']['pk'] : null;
      const depdate = val['depart_date'];
      const cbdate = val['comeback_date'] ? val['comeback_date'] : '';
      this.props.addTrip(createdBy, departureLocation, destinationLocation, depdate, cbdate, trip_type_check);
    } else {
      this.props.createNotif("add_trip.login_msg", "Please login to add a new trip", NOTIFICATION_TYPE_WARNING);
      this.props.openLoginModal();
    }
  }

  handleDateTimeChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleOnClick = (item) => {
    this.props.history.push(item);
  };

  toggleCheck = (k) => {
    this.props.toggleCheck(this.props.trip_type_check);
  }

  componentDidMount() {
    this.props.toggleCheck("round_trip");
  }


  render() {
    const { loading, userId, handleSubmit, pristine, reset, submitting, invalid, trip_type_check } = this.props;
    const { departure_location, destination_location, depart_date, comeback_date, trip_type } = this.state;
    return (
      <Segment style={{ padding: "2em 0em" }} vertical className={"segment-bg-img"}>
        <Segment basic>
        <Grid verticalAlign="middle">
          <Grid.Row verticalAlign="middle" className={"add-trip-grid"}>
            <Grid.Column  mobile={16} tablet={16} computer={8} textAlign="center" verticalAlign="middle" className={"add-trip-grid-column"}>
              <Segment basic>
              <Header as="h2" textAlign="center">
                <FormattedMessage
                  id="add_trip_form.earn_money"
                  defaultMessage="Earn money every time you travel."
                />
              </Header>
              <Header as="h4" textAlign="center">
                <FormattedMessage
                  id="add_trip_form.deliver_parcels"
                  defaultMessage="Deliver parcels to individuals wishing to ship at low prices and amortize your travel costs."
                />
              </Header>
              <Button
                size="small"
                className={"buttoncolor search-button"}
                onClick={this.handleOnClick.bind(this, '/')}
              >
              <FormattedMessage
                id="add_trip_form.how_it_works"
                defaultMessage="How does it work?"
              />
              </Button>
              </Segment>
            </Grid.Column>
            <Grid.Column  mobile={16} tablet={16} computer={8} className={"add-trip-grid-column"}>
            <Segment>
            <Header as="h4" textAlign="center" className={"add-trip-form-header"}>
              <FormattedMessage
                id="add_trip_form.add_trip"
                defaultMessage="Add information about your trip to earn money."
              />
            </Header>
            <AddTripForm />
            </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Segment>
      </Segment>
    );
  }
}

const selector = formValueSelector('add_trip')

const mapStateToProps = state => {
  const trip_type = selector(state, 'trip_type')
  const depart_date = selector(state, 'depart_date')
  return {
    loading: state.addTrip.loading,
    error: state.addTrip.error,
    trip_type_check: state.addTrip.trip_type_check,
    token: state.auth.token,
    userId: state.userInfo.userId,
    userProfileId: state.userInfo.userProfileId,
    username: state.userInfo.username,
    authenticated: state.auth.token !== null,
    trip_type: trip_type,
    depart_date: depart_date,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTrip: (created_by, departure_location, destination_location, depart_date, comeback_date, trip_type) => dispatch(tripAddition(created_by, departure_location, destination_location, depart_date, comeback_date, trip_type)),
    openLoginModal: () => dispatch(openLoginParentModal()),
    createNotif: (key, default_text, type) => dispatch(createNotif(key, default_text, type)),
    toggleCheck: (trip_type) => dispatch(toggleCheck(trip_type)),
  };
};

// export default withRouter(
// connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AddTripForm)
// );

// let AddTripFormConnected = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AddTripForm);
//
// AddTripFormConnected = reduxForm ({
//   form: 'add_trip',
//   validate
// }) (AddTripFormConnected);
//
// export default AddTripFormConnected;


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTripFormWithText));

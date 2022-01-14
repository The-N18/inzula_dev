import React from "react";
import {
  Button,
  Grid,
  Segment,
  Modal,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import styles from './addtripform.css';
import CSRFToken from "../../containers/CSRFToken";
import {renderDateTimePicker, renderCitiesList} from "../../containers/ReduxForm/renderField";
import { validate } from "./validation";
import {Field, reset, reduxForm, formValueSelector} from 'redux-form';
import { updateTripOpenModal, updateTripCloseModal } from "../../store/actions/updateTripModal";
import { updateTrip } from "../../store/actions/addTrip";
import {FormattedMessage} from 'react-intl'
import 'react-widgets/dist/css/react-widgets.css';
import $ from "jquery";

class UpdateTripForm extends React.Component {

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
    const {userId, pk} = this.props;
    const createdBy = {"user": userId};
    const departureLocation = val['departure_location'] ? val['departure_location']['pk'] : null;
    const destinationLocation = val['destination_location'] ? val['destination_location']['pk'] : null;
    const depdate = val['depart_date'];
    const cbdate = val['comeback_date'] ? val['comeback_date'] : '';
    const dta = {
      "created_by": createdBy,
      "departure_location": departureLocation,
      "destination_location": destinationLocation,
      "depart_date": depdate,
      "comeback_date": cbdate,
      "trip_type": val['trip_type'],
      "pk": pk
    };
    this.props.updateTrip(dta);
    this.props.updateTripCloseModal();
    $("#updateTrip").modal("hide");
  }

  handleDateTimeChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleOnClick = (item) => {
    this.props.history.push(item);
  };

  render() {
    const { loading, handleSubmit, invalid, open, lang } = this.props;
    return (

      <div className="modal fade"  id="updateTrip" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered  modal-xl" role="document">
          <div className="modal-content" style={{height:"55%"}}>
              <div className="modal-header p-4">
                <FormattedMessage
                  id="add_trip_modal.title"
                  defaultMessage="Add Trip"
                />
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body p-0">
                <div className="login-content p-4">
                {/* <Segment style={{ padding: "1em 0em" }} vertical> */}
                  {/* <Grid verticalAlign="middle">
                    <Grid.Row verticalAlign="middle" className={"add-trip-grid"}> */}
                      <form onSubmit={handleSubmit(this.submitForm)} className={"update-trip-form"}>
                        <CSRFToken/>
                        <Segment>
                            {/* <div>
                              <label><FormattedMessage
                                id="update_trip.trip"
                                defaultMessage="Trip"
                              /></label>
                              <Field
                                name="trip_type"
                                component={renderSelectList}
                                data={[ 'round_trip', 'one_way_trip' ]}/>
                            </div> */}
                          <Field
                            name="departure_location"
                            label={lang === "en" ? "Select departure location" : "Sélectionnez le lieu de départ"}
                            type="text"
                            className={"custom-field"}
                            component={renderCitiesList}
                          />
                          <Field
                            name="destination_location"
                            label={lang === "en" ? "Select destination location" : "Sélectionnez la destination"}
                            type="text"
                            className={"custom-field"}
                            component={renderCitiesList}
                          />
                          <div>
                            <label><FormattedMessage
                              id="update_trip.departure_date"
                              defaultMessage="Departure Date"
                            /></label>
                            <Field
                              name="depart_date"
                              showTime={false}
                              component={renderDateTimePicker}
                              min={new Date()}
                            />
                          </div>
                          {this.props.trip_type === "round_trip" ? <div>
                            <label><FormattedMessage
                              id="update_trip.return_date"
                              defaultMessage="Return Date"
                            /></label>
                            <Field
                              name="comeback_date"
                              showTime={false}
                              component={renderDateTimePicker}
                              min={new Date(this.props.depart_date)}
                            />
                          </div> : "" }
                        <Button
                          size="large"
                          type="submit"
                          loading={loading}
                          disabled={invalid}
                          className={"buttoncolor transport-add-trip-button"}
                          title={"Please login to add a new trip"}
                        >
                        <FormattedMessage
                          id="update_trip.btn_title"
                          defaultMessage="Update your trip"
                        />
                        </Button>
                        </Segment>
                      </form>
                    {/* </Grid.Row>
                  </Grid> */}
                {/* </Segment> */}
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => this.props.updateTripCloseModal()} >
                  <FormattedMessage
                    id="update_trip.cancel"
                    defaultMessage="Cancel"
                  />
                </button>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector('update_trip')

const mapStateToProps = state => {
  const trip_type = selector(state, 'trip_type')
  const depart_date = selector(state, 'depart_date')
  return {
    loading: state.updateTripModal.loading,
    error: state.updateTripModal.error,
    token: state.auth.token,
    lang: state.appConfig.lang,
    userId: state.userInfo.userId,
    userProfileId: state.userInfo.userProfileId,
    username: state.userInfo.username,
    authenticated: state.auth.token !== null,
    trip_type: trip_type,
    depart_date: depart_date,
    open: state.updateTripModal.open,
    pk: state.updateTripModal.pk,
    initialValues: state.updateTripModal.tripInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTripCloseModal: () => dispatch(updateTripCloseModal()),
    updateTripOpenModal: () => dispatch(updateTripOpenModal()),
    updateTrip: (values) => dispatch(updateTrip(values)),
  };
};

const afterSubmit = (result, dispatch) => dispatch(reset('update_trip'));

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({ form: "update_trip", onSubmitSuccess: afterSubmit, enableReinitialize: true, validate })(UpdateTripForm)));

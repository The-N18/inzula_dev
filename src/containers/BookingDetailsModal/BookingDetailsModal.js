import React from "react";

import { connect } from "react-redux";
// import styles from './sendpackage.css';

import {
  Image
} from "semantic-ui-react";

import { backend_url} from "../../configurations";
// import ImageUploader from 'react-images-upload';
import {FormattedMessage,FormattedDate} from 'react-intl'
import { optionToText, sizeOptions, sizeOptionsFr, categoryOptions, categoryOptionsFr, weightOptions, weightOptionsFr, valueOptions, valueOptionsFr } from "../../utils/options";

import $ from 'jquery';
window.jQuery = $;
require('bootstrap');

// import { makeStyles } from '@material-ui/core/styles';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';





function BookingDetailsModal(props){
    const {initialValues,pk, title, description, images,
        arrival_date, departure_location, editable, recipient_phone_number, recipient_name,
        destination_location, weight, space, price, product_category, request_by_username,
        proposed_price, validate_decline, can_propose, lang, status, confirmed_by_sender} = props;


//   const classes = useStyles();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [pictures, setPictures] = React.useState([]);


    const closeBookingDetailsModal = () => {
        $("#bookingDetails").modal("hide");
    }
  


    return (

        <div className="modal fade"  id="bookingDetails" tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
            <div className="modal-content">
                <div className="modal-header p-4">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                </div>
                <div className="modal-body p-0">
                <div className="login-content p-4">
                    <div className="dashboard-content">
                        <div className="add-listing">   
                        <div className="listing-main">
                            <div className="addlist-inner mb-3">
                            <div className="addlist-title">
                                <h4 className="m-0"><i className="fa fa-cube pr-2" />Détails du colis</h4>
                            </div>
                            <div className="addlist-content bg-white">

                                <div className="row">
                                    <div className="col-lg-3 col-md-3 col-xs-12">

                                        {initialValues.images && initialValues.images.length > 0 ? initialValues.images.map((item, index) => (
                                            <Image centered bordered size="massive" src={item['name']} />
                                        )) : <Image centered src={backend_url() + '/static/images/default_booking_image.png'} verticalAlign="middle" size="massive"/>}

                                    </div>
                                    <div className="col-lg-9 col-md-9 col-xs-12">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-xs-12">
                                                <p><strong>{initialValues.product_name}</strong></p>
                                                <p className={"booking-card-items-style"}><FormattedMessage
                                                    id="booking_card.description"
                                                    defaultMessage="Description:"
                                                /> {initialValues.product_description}</p>
                                                <p className={"booking-card-items-style"}><FormattedMessage
                                                    id="booking_card.arrival_date"
                                                    defaultMessage="Arrival date:"
                                                /> <FormattedDate
                                                    value={initialValues.delivery_date}
                                                    year="numeric"
                                                    month="short"
                                                    day="numeric"
                                                    weekday="short"
                                                    /></p>
                                                <p className={"booking-card-items-style"}><FormattedMessage
                                                    id="booking_card.departure_loc"
                                                    defaultMessage="Departure:"
                                                /> {initialValues.departure_location && initialValues.departure_location["label"] ? initialValues.departure_location["label"] : ""}</p>
                                                <p className={"booking-card-items-style"}><FormattedMessage
                                                    id="booking_card.pickup_loc"
                                                    defaultMessage="Pickup location:"
                                                /> {initialValues.destination_location && initialValues.destination_location["label"] ? initialValues.destination_location["label"] : ""}</p>
                                                <p className={"booking-card-items-style"}><FormattedMessage
                                                    id="booking_card.recipient_name"
                                                    defaultMessage="Recipient:"
                                                /> {initialValues.recipient_name}</p>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-xs-12">
                                                <p className={"booking-card-items-style"}><FormattedMessage
                                                    id="booking_card.weight"
                                                    defaultMessage="Weight:"
                                                /> {optionToText(initialValues.product_weight, lang === "fr" ? weightOptionsFr : weightOptions)}</p>
                                                <p className={"booking-card-items-style"}><FormattedMessage
                                                    id="booking_card.size"
                                                    defaultMessage="Size:"
                                                /> {optionToText(initialValues.product_size, lang === "fr" ? sizeOptionsFr : sizeOptions)}</p>
                                                <p className={"booking-card-items-style"}><FormattedMessage
                                                    id="booking_card.category"
                                                    defaultMessage="Category:"
                                                /> {optionToText(initialValues.product_category, lang === "fr" ? categoryOptionsFr : categoryOptions)}</p>
                                                <p className={"booking-card-items-style"}><FormattedMessage
                                                    id="booking_card.value"
                                                    defaultMessage="Value:"
                                                /> {optionToText(initialValues.product_value, lang === "fr" ? valueOptionsFr : valueOptions)}</p>
                                                <p className={"booking-card-items-style"}><FormattedMessage
                                                    id="booking_card.price"
                                                    defaultMessage="Price:"
                                                /> {initialValues.proposed_price} euros</p>
                                                <p className={"booking-card-items-style"}><FormattedMessage
                                                    id="booking_card.recipient_phone_number"
                                                    defaultMessage="Recipient Phone:"
                                                /> {initialValues.recipient_phone_number}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
                <div class="modal-footer">
                {/* <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={closeBookingDetailsModal} >Annuler</button> */}
                </div>
            </div>
            </div>
        </div>
      
    );
  
}

const mapStateToProps = state => {

    return {
      loading: state.addBooking.loading,
      error: state.addBooking.error,
      token: state.auth.token,
      lang: state.appConfig.lang,
      userId: state.userInfo.userId,
      userProfileId: state.userInfo.userProfileId,
      username: state.userInfo.username,
      authenticated: state.auth.token !== null,
      initialValues: state.updateBookingModal.bookingInfo,
      open: state.updateBookingModal.open,
      pk: state.updateBookingModal.pk,
    };
  };
  


export default connect(
    mapStateToProps
)(BookingDetailsModal);
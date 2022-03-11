import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';
import { searchBookings } from "./searchBookings";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const openCanclePriceProposalConfirm = (isCancle=false) => {
  console.log("openCanclePriceProposalConfirm isCancle",isCancle)
  return {
    type: actionTypes.CANCLE_PRICE_PROPOSAL_CONFIRM_OPEN_MODAL,
    isCancle: isCancle
  };
};

export const setPriceProposalId = (priceProposalId) => {
  return {
    type: actionTypes.CANCLE_PRICE_PROPOSAL_CONFIRM_SET_PRICE_PROPOSAL_ID,
    priceProposalId: priceProposalId,
  };
};

export const setCancleProposalBookingId = (bookingId) => {
  return {
    type: actionTypes.CANCLE_PRICE_PROPOSAL_CONFIRM_SET_BOOKING_ID,
    bookingId: bookingId,
  };
};

export const closeCanclePriceProposalConfirm = () => {
  return {
    type: actionTypes.CANCLE_PRICE_PROPOSAL_CONFIRM_CLOSE_MODAL,
  };
};

export const canclePriceProposal = (bookingId) => {
  const userProfileId = localStorage.getItem("userProfileId");
  const config = {
            headers: { 'content-type': 'multipart/form-data' }
          };
  return dispatch => {
    axios
      .delete(api_url() + "/bookings/proposed_price/"+bookingId+"/", {params: {userProfileId:userProfileId, bookingId:bookingId}}, config)
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(createNotification({
          message: 'Your price proposal has been cancled',
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
        dispatch(closeCanclePriceProposalConfirm())
        dispatch(searchBookings("", "", "", "", "", "", "", userProfileId, "", ""))
      })
      .catch(err => {
        dispatch(createNotification({
          message: 'Failed to cancle your price proposal',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

export const refusePriceProposal = (priceProposalId) => {
  const userProfileId = localStorage.getItem("userProfileId");
  const config = {
            headers: { 'content-type': 'multipart/form-data' }
          };
  return dispatch => {
    axios
      .delete(api_url() + "/bookings/price_proposal/"+priceProposalId+"/", {}, config)
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(createNotification({
          message: 'The price proposal has been cancled',
          type: NOTIFICATION_TYPE_SUCCESS,
          duration: 10000,
          canDismiss: true,
        }));
        // dispatch(searchBookings("", "", "", "", "", "", "", userProfileId, "", ""))
      })
      .catch(err => {
        dispatch(createNotification({
          message: 'Failed to cancle this price proposal',
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}
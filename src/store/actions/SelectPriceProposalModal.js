import axios from "axios";
import * as actionTypes from "./actionTypes";
import { api_url, AUTH_TIMEOUT } from "../../configurations";
import {checkAuthTimeout} from "./auth";
import {createNotification, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';
import { closeCanclePriceProposalConfirm } from "./CanclePriceProposalConfirm";
import $ from "jquery";
import { getInitialReservations } from "./userReservations";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


export const openSelectPriceProposal = (bookingId) => {
  return {
    type: actionTypes.SELECT_PRICE_PROPOSAL_MODAL_OPEN_MODAL,
    bookingId: bookingId
  };
};

export const closeSelectPriceProposal = () => {
  return {
    type: actionTypes.SELECT_PRICE_PROPOSAL_MODAL_CLOSE_MODAL,
  };
};

export const getProposalsStart = () => {
  return {
    type: actionTypes.SELECT_PRICE_PROPOSAL_MODAL_GET_PROPOSALS_START
  };
};

export const selectSingleProposal = (selectedProposalId) => {
  return {
    type: actionTypes.SELECT_PRICE_PROPOSAL_MODAL_SELECT_PROPOSAL,
    selectedProposalId: selectedProposalId,
  };
};

export const getProposalsSuccess = (priceProposals) => {
  return {
    type: actionTypes.SELECT_PRICE_PROPOSAL_MODAL_GET_PROPOSALS_SUCCESS,
    priceProposals: priceProposals,
    loading: false,
  };
};

export const getProposalsFail = error => {
  return {
    type: actionTypes.SELECT_PRICE_PROPOSAL_MODAL_GET_PROPOSALS_FAIL,
    error: error
  };
};


export const getProposals = (booking_id) => {
  const userId = localStorage.getItem("userProfileId");
  return dispatch => {
    dispatch(getProposalsStart());
    axios
      .get(api_url() + "/bookings/get_proposals", {
            params: {
              booking_id: booking_id
            }
          })
      .then(res => {
        dispatch(checkAuthTimeout(AUTH_TIMEOUT));
        dispatch(getProposalsSuccess(res.data["results"], res.data["next"], res.data["count"]));

        dispatch(closeCanclePriceProposalConfirm());

        if(res.data["results"].length == 0){
          dispatch(getInitialReservations(userId));
          $('#selectPriceProposalModal').off('hidden.bs.modal');
          $('#selectPriceProposalModal').modal('hide');
          dispatch(closeSelectPriceProposal());
        }

      })
      .catch(err => {
        dispatch(getProposalsFail(err));
        dispatch(createNotification({
          message: "Failed to get price proposals",
          type: NOTIFICATION_TYPE_ERROR,
          duration: 10000,
          canDismiss: true,
        }));
      });
  };
}

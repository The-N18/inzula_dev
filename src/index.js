import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import notifyReducer from 'react-redux-notify';

import authReducer from "./store/reducers/auth";
import verifyUserReducer from "./store/reducers/verifyUser";
import appConfigReducer from "./store/reducers/appConfig";
import myProfileReducer from "./store/reducers/myProfile";
import bankAccountFormModalReducer from "./store/reducers/bankAccountFormModal";
import userFinanceReducer from "./store/reducers/userFinance";
import searchbookingsReducer from "./store/reducers/searchBookings";
import incomingFinancialTransactionsReducer from "./store/reducers/incomingFinancialTransactions";
import depositFinancialTransactionsReducer from "./store/reducers/depositFinancialTransactions";
import withdrawalFinancialTransactionsReducer from "./store/reducers/withdrawalFinancialTransactions";
import failedFinancialTransactionsReducer from "./store/reducers/failedFinancialTransactions";
import outgoingFinancialTransactionsReducer from "./store/reducers/outgoingFinancialTransactions";
import proposePriceOnBookingReducer from "./store/reducers/proposePriceOnBooking";
import paymentFormModalReducer from "./store/reducers/paymentFormModal";
import confirmBookingPriceReducer from "./store/reducers/confirmBookingPrice";
import searchbookingsPageReducer from "./store/reducers/searchBookingsPage";
import searchtripsReducer from "./store/reducers/searchTrips";
import sendPackageModalReducer from "./store/reducers/sendPackageModal";
import userinfoReducer from "./store/reducers/userInfo";
import addbookingReducer from "./store/reducers/addBooking";
import addTripReducer from "./store/reducers/addTrip";
import userTripsReducer from "./store/reducers/userTrips";
import senderNotifsReducer from "./store/reducers/senderNotifs";
import carrierNotifsReducer from "./store/reducers/carrierNotifs";
import userReservationsReducer from "./store/reducers/userReservations";
import userBookingsReducer from "./store/reducers/userBookings";
import selectReservationsModalReducer from "./store/reducers/selectReservationsModal";
import signupParentModalReducer from "./store/reducers/signupParentModal";
import loginParentModalReducer from "./store/reducers/loginParentModal";
import signupModalReducer from "./store/reducers/signupModal";
import loginModalReducer from "./store/reducers/loginModal";
import forgotPasswordModalReducer from "./store/reducers/forgotPasswordModal";
import paymentOptionsModalReducer from "./store/reducers/paymentOptionsModal";
import deleteBookingConfirmReducer from "./store/reducers/deleteBookingConfirm";
import deleteTripConfirmReducer from "./store/reducers/deleteTripConfirm";
import updateTripModalReducer from "./store/reducers/updateTripModal";
import addTripModalReducer from "./store/reducers/addTripModal";
import updateBookingModalReducer from "./store/reducers/updateBookingModal";
import declineBookingReducer from "./store/reducers/declineBooking";
import cancelBookingReducer from "./store/reducers/cancelBooking";
import validateBookingReducer from "./store/reducers/validateBooking";
import deleteAccountReducer from "./store/reducers/deleteAccount";
import selectableUserReservationsReducer from "./store/reducers/selectableUserReservations";
import myFundsReducer from "./store/reducers/myFunds";
import myPaymentMethodsReducer from "./store/reducers/myPaymentMethods";
import completeProfileModalReducer from "./store/reducers/completeProfileModal";
import selectCreditCardModalReducer from "./store/reducers/selectCreditCardModal";
import productDeliveryModalReducer from "./store/reducers/productDeliveryModal";
import verifyYourEmailReducer from "./store/reducers/verifyYourEmail";
import { reducer as formReducer } from 'redux-form'
import axios from 'axios';
import MessengerCustomerChat from 'react-messenger-customer-chat';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  verifyUser: verifyUserReducer,
  appConfig: appConfigReducer,
  myProfile: myProfileReducer,
  searchBookings: searchbookingsReducer,
  searchTrips: searchtripsReducer,
  sendPackageModal: sendPackageModalReducer,
  selectReservationsModal: selectReservationsModalReducer,
  userInfo: userinfoReducer,
  addBooking: addbookingReducer,
  addTrip: addTripReducer,
  userTrips: userTripsReducer,
  userReservations: userReservationsReducer,
  selectableUserReservations: selectableUserReservationsReducer,
  userBookings: userBookingsReducer,
  senderNotifs: senderNotifsReducer,
  carrierNotifs: carrierNotifsReducer,
  notifications: notifyReducer,
  signupParentModal: signupParentModalReducer,
  loginParentModal: loginParentModalReducer,
  signupModal: signupModalReducer,
  loginModal: loginModalReducer,
  forgotPasswordModal: forgotPasswordModalReducer,
  paymentFormModal: paymentFormModalReducer,
  deleteBookingConfirm: deleteBookingConfirmReducer,
  deleteTripConfirm: deleteTripConfirmReducer,
  updateTripModal: updateTripModalReducer,
  addTripModal: addTripModalReducer,
  updateBookingModal: updateBookingModalReducer,
  searchbookingsPage: searchbookingsPageReducer,
  proposePriceOnBooking: proposePriceOnBookingReducer,
  confirmBookingPrice: confirmBookingPriceReducer,
  declineBooking: declineBookingReducer,
  cancelBooking: cancelBookingReducer,
  validateBooking: validateBookingReducer,
  deleteAccount: deleteAccountReducer,
  userFinance: userFinanceReducer,
  incomingFinancialTransactions: incomingFinancialTransactionsReducer,
  depositFinancialTransactions: depositFinancialTransactionsReducer,
  withdrawalFinancialTransactions: withdrawalFinancialTransactionsReducer,
  outgoingFinancialTransactions: outgoingFinancialTransactionsReducer,
  failedFinancialTransactions: failedFinancialTransactionsReducer,
  myFunds: myFundsReducer,
  myPaymentMethods: myPaymentMethodsReducer,
  paymentOptionsModal: paymentOptionsModalReducer,
  selectCreditCardModal: selectCreditCardModalReducer,
  bankAccountFormModal: bankAccountFormModalReducer,
  completeProfileModal: completeProfileModalReducer,
  productDeliveryModal: productDeliveryModalReducer,
  verifyYourEmail: verifyYourEmailReducer,
});

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
    <MessengerCustomerChat
        pageId="104964201310475"
        appId="126437972651965"
        themeColor="#bc1823"
        loggedInGreeting="Bonjour! Comment pouvons nous vous aider?"
        loggedOutGreeting="Bonjour! Comment pouvons nous vous aider?"
      />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();

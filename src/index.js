import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import notifyReducer from 'react-redux-notify';

import authReducer from "./store/reducers/auth";
import appConfigReducer from "./store/reducers/appConfig";
import myProfileReducer from "./store/reducers/myProfile";
import searchbookingsReducer from "./store/reducers/searchBookings";
import proposePriceOnBookingReducer from "./store/reducers/proposePriceOnBooking";
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
import deleteBookingConfirmReducer from "./store/reducers/deleteBookingConfirm";
import deleteTripConfirmReducer from "./store/reducers/deleteTripConfirm";
import updateTripModalReducer from "./store/reducers/updateTripModal";
import updateBookingModalReducer from "./store/reducers/updateBookingModal";
import { reducer as formReducer } from 'redux-form'
import axios from 'axios';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
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
  userBookings: userBookingsReducer,
  senderNotifs: senderNotifsReducer,
  carrierNotifs: carrierNotifsReducer,
  notifications: notifyReducer,
  signupParentModal: signupParentModalReducer,
  loginParentModal: loginParentModalReducer,
  signupModal: signupModalReducer,
  loginModal: loginModalReducer,
  deleteBookingConfirm: deleteBookingConfirmReducer,
  deleteTripConfirm: deleteTripConfirmReducer,
  updateTripModal: updateTripModalReducer,
  updateBookingModal: updateBookingModalReducer,
  searchbookingsPage: searchbookingsPageReducer,
  proposePriceOnBooking: proposePriceOnBookingReducer,
});

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();

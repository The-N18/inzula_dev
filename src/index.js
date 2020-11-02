import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import notifyReducer from 'react-redux-notify';

import authReducer from "./store/reducers/auth";
import searchbookingsReducer from "./store/reducers/searchBookings";
import userinfoReducer from "./store/reducers/userInfo";
import addbookingReducer from "./store/reducers/addBooking";
import addTripReducer from "./store/reducers/addTrip";
import userTripsReducer from "./store/reducers/userTrips";
import axios from 'axios';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  searchBookings: searchbookingsReducer,
  userInfo: userinfoReducer,
  addBooking: addbookingReducer,
  addTrip: addTripReducer,
  userTrips: userTripsReducer,
  notifications: notifyReducer
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

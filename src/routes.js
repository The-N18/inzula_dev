import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login/Login";
import LoginRedux from "./containers/LoginReduxForm/Login";
import Signup from "./containers/Signup/Signup";
import SignupRedux from "./containers/SignupReduxForm/Signup";
import LoginParent from "./containers/LoginParent/LoginParent";
import SignupParent from "./containers/SignupParent/SignupParent";
import MyProfile from "./containers/MyProfile/MyProfile";
import Transport from "./containers/Transport/Transport";
import VerifyUser from "./containers/VerifyUser/VerifyUser";
import HomepageLayout from "./containers/Home";
import SendPage from "./containers/SendPage/SendPage";
import SearchBookingRequestsPage from "./containers/SearchBookingRequestsPage/SearchBookingRequestsPage";
import SignupParentWithDiscount from "./containers/SignupParentWithDiscount/SignupParentWithDiscount";

const BaseRouter = () => (
  <Hoc>
    <Route path="/signupdiscount" component={SignupParentWithDiscount} />
    <Route path="/profile" component={MyProfile} />
    <Route path="/transport" component={Transport} />
    <Route path="/dispatch" component={SendPage} />
    <Route path="/search_bookings" component={SearchBookingRequestsPage} />
    <Route path="/verify/:verificationKey" component={VerifyUser} />
    <Route exact path="/" component={HomepageLayout} />
  </Hoc>
);

export default BaseRouter;

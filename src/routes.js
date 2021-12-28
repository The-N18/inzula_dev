import React from "react";
import { Route, Switch } from "react-router-dom";
import Hoc from "./hoc/hoc";

import MyProfile from "./containers/MyProfile/MyProfile";
import Transport from "./containers/Transport/Transport";
import VerifyUser from "./containers/VerifyUser/VerifyUser";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import HomepageLayout from "./containers/Home";
import SendPage from "./containers/SendPage/SendPage";
import Faqs from "./containers/staticpages/Faqs/Faqs";
import Terms from "./containers/staticpages/Terms/Terms";
import Transparency from "./containers/staticpages/Transparency/Transparency";
import Legal from "./containers/staticpages/Legal/Legal";
import Insurance from "./containers/staticpages/Insurance/Insurance";
import UserAgreement from "./containers/staticpages/UserAgreement/UserAgreement";
import SearchBookingRequestsPage from "./containers/SearchBookingRequestsPage/SearchBookingRequestsPage";
import SignupParentWithDiscount from "./containers/SignupParentWithDiscount/SignupParentWithDiscount";
import DashboardLayout from "./containers/DashboardLayourt/DashboardLayout";

const BaseRouter = () => (
  <Hoc>
    <Switch>
      <Route path="/signupdiscount" component={SignupParentWithDiscount} />
      <Route path="/profile" component={MyProfile} />
      <Route path="/transport" component={Transport} />
      <Route path="/dispatch" component={SendPage} />
      <Route path="/faqs" component={Faqs} />
      <Route path="/terms" component={Terms} />
      <Route path="/useragreement" component={UserAgreement} />
      <Route path="/transparency" component={Transparency} />
      <Route path="/legal" component={Legal} />
      <Route path="/insurance" component={Insurance} />
      <Route path="/search_bookings" component={SearchBookingRequestsPage} />
      <Route path="/verify/:verificationKey" component={VerifyUser} />
      <Route path="/reset/:uid/:token" component={ResetPassword} />
      <Route path="/dashboard" component={DashboardLayout} />
      <Route exact path="/" component={HomepageLayout} />
    </Switch>
  </Hoc>
);


export default BaseRouter;

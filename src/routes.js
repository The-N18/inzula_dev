import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import MyProfile from "./containers/MyProfile/MyProfile";
import Transport from "./containers/Transport/Transport";
import HomepageLayout from "./containers/Home";
import SendPage from "./containers/SendPage/SendPage";

const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/profile" component={MyProfile} />
    <Route path="/transport" component={Transport} />
    <Route path="/dispatch" component={SendPage} />
    <Route exact path="/" component={HomepageLayout} />
  </Hoc>
);

export default BaseRouter;

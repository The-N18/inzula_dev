import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import Transport from "./containers/Transport/Transport";
import HomepageLayout from "./containers/Home";

const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/transport" component={Transport} />
    <Route exact path="/" component={HomepageLayout} />
  </Hoc>
);

export default BaseRouter;

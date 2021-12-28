import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProfileTab from "./containers/ProfileTabReduxForm/ProfileTab";
import UpdateBooking from "./containers/UpdateBookingModal/UpdateBooking";

const DashboardRouter = () => {

    const {path} = useRouteMatch();

    console.log("PATH",path);
    
    return (
        <Switch> 
            <Route path={`${path}/profile`} component={ProfileTab} />
            <Route path={`${path}/add-booking`} component={UpdateBooking} />
        </Switch>
         

        
    );
}


export default DashboardRouter;
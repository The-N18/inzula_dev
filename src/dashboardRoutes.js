import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProfileTab from "./containers/ProfileTabReduxForm/ProfileTab";
import SenderCarrierNotifsList from "./containers/SenderCarrierNotifsList/SenderCarrierNotifsList";
import TripsReservationsList from "./containers/TripsReservationsList/TripsReservationsList";

const DashboardRouter = () => {

    const {path} = useRouteMatch();

    console.log("PATH",path);
    
    return (
        <Switch> 
            <Route path={`${path}/profile`} component={ProfileTab} />
            <Route path={`${path}/my-bookings`} component={TripsReservationsList} />
            <Route path={`${path}/alerts`} component={SenderCarrierNotifsList} />
        </Switch>
         

        
    );
}


export default DashboardRouter;
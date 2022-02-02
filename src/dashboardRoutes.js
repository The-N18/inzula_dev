import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProfileTab from "./containers/ProfileTabReduxForm/ProfileTab";
import SenderCarrierNotifsList from "./containers/SenderCarrierNotifsList/SenderCarrierNotifsList";
import TripsReservationsList from "./containers/TripsReservationsList/TripsReservationsList";
import UserBookingsList from "./containers/UserBookingsList/UserBookingsList";

const DashboardRouter = () => {

    const {path} = useRouteMatch();

    console.log("PATH",path);
    
    return (
        <Switch> 
            <Route path={`${path}/profile`} component={ProfileTab} />
            <Route path={`${path}/my-bookings`} component={TripsReservationsList} />
            <Route path={`${path}/alerts`} component={SenderCarrierNotifsList} />
            <Route path={`${path}/my-reservations`} component={UserBookingsList} />
        </Switch>
         

        
    );
}


export default DashboardRouter;
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProfileTab from "./containers/ProfileTabReduxForm/ProfileTab";
import SendPackage from "./containers/SendPackageReduxForm/SendPackage";
import TripsReservationsList from "./containers/TripsReservationsList/TripsReservationsList";

const DashboardRouter = () => {

    const {path} = useRouteMatch();

    console.log("PATH",path);
    
    return (
        <Switch> 
            <Route path={`${path}/profile`} component={ProfileTab} />
            <Route path={`${path}/add-booking`} component={SendPackage} />
            <Route path={`${path}/reservation-list`} component={TripsReservationsList} />
        </Switch>
         

        
    );
}


export default DashboardRouter;
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProfileTab from "./containers/ProfileTabReduxForm/ProfileTab";
import SenderCarrierNotifsList from "./containers/SenderCarrierNotifsList/SenderCarrierNotifsList";
import TripsReservationsList from "./containers/TripsReservationsList/TripsReservationsList";
import UserBookingsList from "./containers/UserBookingsList/UserBookingsList";
import OutgoingFinancialTransactionsList from "./containers/OutgoingFinancialTransactionsList/OutgoingFinancialTransactionsList";
import DepositFinancialTransactionsList from "./containers/DepositFinancialTransactionsList/DepositFinancialTransactionsList";
import ProtectedRoute from "./protected_route";
import WithdrawalFinancialTransactionsList from "./containers/WithdrawalFinancialTransactionsList/WithdrawalFinancialTransactionsList";


const DashboardRouter = () => {

    const {path} = useRouteMatch();

    console.log("PATH",path);
    
    return (
        <Switch> 
            <ProtectedRoute path={`${path}/profile`} component={ProfileTab}></ProtectedRoute>
            {/* <Route path={`${path}/profile`} component={ProfileTab} /> */}
            <ProtectedRoute path={`${path}/my-bookings`} component={TripsReservationsList}></ProtectedRoute>
            {/* <Route path={`${path}/my-bookings`} component={TripsReservationsList} /> */}
            <ProtectedRoute path={`${path}/alerts`} component={SenderCarrierNotifsList}></ProtectedRoute>
            {/* <Route path={`${path}/alerts`} component={SenderCarrierNotifsList} /> */}
            <ProtectedRoute path={`${path}/my-reservations`} component={UserBookingsList}></ProtectedRoute>
            {/* <Route path={`${path}/my-reservations`} component={UserBookingsList} /> */}
            <ProtectedRoute path={`${path}/my-transactions`} component={OutgoingFinancialTransactionsList}></ProtectedRoute>
            <ProtectedRoute path={`${path}/fund-deposit`} component={DepositFinancialTransactionsList}></ProtectedRoute>
            <ProtectedRoute path={`${path}/funds-withdrawal`} component={WithdrawalFinancialTransactionsList}></ProtectedRoute>
            <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
    );
}


export default DashboardRouter;
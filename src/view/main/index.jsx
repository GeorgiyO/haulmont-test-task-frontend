import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";

import {Banks} from "./banks";
import {Overview} from "./overview";
import {Clients} from "./clients";
import {Credits} from "./credits";
import {CreditOffers} from "./creditOffers";

export function Main() {

    return (
        <div className={"main"}>
            <Switch>
                <Route exact path={"/"} component={Overview}/>
                <Route path={"/credits"} component={Credits}/>
                <Route path={"/banks"} component={Banks}/>
                <Route path={"/clients"} component={Clients}/>
                <Route paht={"/credits-offers"} component={CreditOffers}/>
            </Switch>
        </div>
    );
}
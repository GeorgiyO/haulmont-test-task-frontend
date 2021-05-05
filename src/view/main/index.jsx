import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";

import {Banks} from "./banks";
import {Overview} from "./overview";

export function Main() {

    return (
        <div className={"main"}>
            main
            <Switch>
                <Route path={"/banks"} component={Banks}/>
                <Route path={"/"} component={Overview}/>
            </Switch>
        </div>
    )
}
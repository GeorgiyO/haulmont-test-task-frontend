import React from "react";
import {
    useRouteMatch,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import {BanksList} from "./list";
import {AddBank} from "./add";
import {BankInstance} from "./instance";
import {UpdateBank} from "./update";

export function Banks() {
    const match = useRouteMatch();

    return (
        <div className={"entity-menu"}>
            <nav>
                <Link to={match.url}>banks list</Link>
                <Link to={match.url + "/add"}>add bank</Link>
            </nav>
            <Switch>
                <Route path={match.url + "/update/:id"} component={UpdateBank}/>
                <Route path={match.url + "/add"} component={AddBank}/>
                <Route path={match.url + "/:id"} component={BankInstance}/>
                <Route path={match.url} component={BanksList}/>
            </Switch>
        </div>
    )
}

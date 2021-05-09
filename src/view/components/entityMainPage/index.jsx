import React from "react";
import {
    useRouteMatch,
    Switch,
    Route,
    Link,
} from "react-router-dom";

export function EntityMainPage({updatePage, addPage, instancePage, listPage, entityName}) {

    const match = useRouteMatch();

    return (
        <div className={"entity-menu"}>
            <nav>
                <Link to={match.url}>{entityName + " list"}</Link>
                <Link to={match.url + "/add"}>{"add " + entityName}</Link>
            </nav>
            <Switch>
                <Route path={match.url + "/update/:id"} component={updatePage}/>
                <Route path={match.url + "/add"} component={addPage}/>
                <Route path={match.url + "/:id"} component={instancePage}/>
                <Route path={match.url} component={listPage}/>
            </Switch>
        </div>
    );
}

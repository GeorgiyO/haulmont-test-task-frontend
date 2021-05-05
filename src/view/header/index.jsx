import React from "react";
import {NavLink} from "react-router-dom";

export function Header() {
    return (
        <div className={"header"}>
            <NavLink activeClassName={"current"} to="/">Overview</NavLink>
            <NavLink activeClassName={"current"} to="/banks">Banks</NavLink>
        </div>
    );
}
import React from "react";
import {NavLink} from "react-router-dom";

export function Header() {
    return (
        <div className={"header"}>
            <NavLink activeClassName={"current"} to={"/"}>Overview</NavLink>
            <NavLink activeClassName={"current"} to={"/banks"}>Banks</NavLink>
            <NavLink activeClassName={"current"} to={"/clients"}>Clients</NavLink>
            <NavLink activeClassName={"current"} to={"/credits"}>Credits</NavLink>
            <NavLink activeClassName={"current"} to={"/credit-offers"}>Credit Offers</NavLink>
        </div>
    );
}
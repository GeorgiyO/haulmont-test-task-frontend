import React from "react";

export function Footer() {
    return (
        <div className={"footer"}>
            <a href={serverUrl + "/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/bank-controller"}>API</a>
        </div>
    )
}

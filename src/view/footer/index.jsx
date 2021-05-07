import React from "react";

export function Footer() {
    return (
        <div className={"footer"}>
            <a href={serverUrl + "/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/bank-controller"}>API</a>
            <a href={"#"}>Task details (rus.)</a>
            <a href={"https://github.com/GeorgiyO/Haulmont-test-task"}>GitHub Backend</a>
            <a href={"https://github.com/GeorgiyO/haulmont-test-task-frontend"}>GitHub Frontend</a>
        </div>
    )
}

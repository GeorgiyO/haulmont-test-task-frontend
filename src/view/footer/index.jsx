import React from "react";

export function Footer() {
    return (
        <div className={"footer"}>
            <a href={serverUrl + "/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config"}>API</a>
            <a href={"https://github.com/GeorgiyO/Haulmont-test-task/blob/master/meta/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5%20%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5%20Junior%20Java%20Developer.pdf"}>Task details (rus.)</a>
            <a href={"https://github.com/GeorgiyO/Haulmont-test-task"}>GitHub Backend</a>
            <a href={"https://github.com/GeorgiyO/haulmont-test-task-frontend"}>GitHub Frontend</a>
        </div>
    )
}

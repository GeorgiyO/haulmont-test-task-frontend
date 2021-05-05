import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter} from "react-router-dom";

import {Header} from "./header";
import {Main} from "./main";
import {Footer} from "./footer";

function Root() {
    return (
        <BrowserRouter>
            <div className={"root"}>
                <Header/>
                <Main/>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}

export function draw() {
    ReactDom.render(
        <Root/>,
        document.getElementById("root")
    );
}
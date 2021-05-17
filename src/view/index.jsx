import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import {Header} from "./header";
import {Main} from "./main";
import {Footer} from "./footer";

import "./style.scss";
import 'react-toastify/dist/ReactToastify.css';

function Root() {
    return (
        <BrowserRouter basename={rootUrl}>
            <div className={"content"}>
                <Header/>
                <Main/>
            </div>
            <Footer/>
            <ToastContainer/>
        </BrowserRouter>
    )
}

export function draw() {
    ReactDom.render(
        <Root/>,
        document.getElementById("root")
    );
}
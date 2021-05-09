import React from "react";
import {useHistory} from "react-router-dom";
import {API, ClientTemplate} from "/src/model/endpoints/client";
import {StringValidator} from "/src/model/validations";
import {Input} from "/src/view/components/input";
import {Observable} from "/src/domain/observable";

export function AddClient() {

    const history = useHistory();

    const template = new ClientTemplate();
    const errors = new Observable([]);

    const validate = function () {

    }

}

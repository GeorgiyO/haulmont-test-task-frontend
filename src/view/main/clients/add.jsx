import React from "react";
import {useHistory} from "react-router-dom";
import {API, ClientTemplate} from "src/model/entities/client";
import {ClientForm} from "./form";

export function AddClient() {

    const history = useHistory();

    const template = new ClientTemplate();

    const addClient = function () {
        if (template.validate()) {
            API.add(template.toInstance()).then((client) => {
                history.push("/clients/" + client.passportNumber);
            });
        }
    }

    return <ClientForm template={template} label={"Add client"} buttonLabel={"Add"} action={addClient}/>;
}

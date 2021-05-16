import React from "react";
import {API, ClientTemplate} from "src/model/entities/client";
import {ClientForm} from "src/view/main/clients/form";
import {UpdateEntity} from "src/view/components/updateEntity";

export function UpdateClient() {
    return <UpdateEntity template={new ClientTemplate()}
                         API={API}
                         formProvider={ClientForm}
                         entityUrl={"clients"}
                         entityName={"Client"}
                         entityToId={(client) => client.passportNumber}
    />;
}

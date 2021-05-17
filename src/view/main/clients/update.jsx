import React from "react";
import {API, ClientTemplate} from "src/model/entities/client";
import {UpdateEntity} from "src/view/components/entity/updateEntity";
import {ClientUpdateForm} from "src/view/main/clients/updateForm";

export function UpdateClient() {
    return <UpdateEntity template={new ClientTemplate()}
                         API={API}
                         formProvider={ClientUpdateForm}
                         entityUrl={"clients"}
                         entityName={"Client"}
                         entityToId={(client) => client.passportNumber}
    />;
}

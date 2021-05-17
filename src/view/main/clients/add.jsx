import React from "react";
import {API, ClientTemplate} from "src/model/entities/client";
import {AddEntity} from "src/view/components/entity/addEntity";
import {ClientAddForm} from "src/view/main/clients/addForm";

export function AddClient() {
    return <AddEntity template={new ClientTemplate()}
                      API={API}
                      formProvider={ClientAddForm}
                      entityUrl={"clients"}
                      entityName={"Client"}
                      entityToId={(client) => client.passportNumber}
    />;
}

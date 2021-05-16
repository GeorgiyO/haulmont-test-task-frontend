import React from "react";
import {API, ClientTemplate} from "src/model/entities/client";
import {ClientForm} from "./form";
import {AddEntity} from "src/view/components/addEntity";

export function AddClient() {
    return <AddEntity template={new ClientTemplate()}
                      API={API}
                      formProvider={ClientForm}
                      entityUrl={"clients"}
                      entityName={"Client"}
                      entityToId={(client) => client.passportNumber}
    />;
}

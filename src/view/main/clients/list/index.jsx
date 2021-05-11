import React from "react";
import {API} from "/src/model/entities/client";
import {Link} from "react-router-dom";
import {EntityList} from "/src/view/components/entityList";

export function ClientList() {
    return <EntityList API={API}
                       label={"Clients"}
                       entityToJsxFunction={(client) => (
                           <Link to={"/clients/" + client.passportNumber}>
                               {client.firstName} {client.secondName} {client.patronymic}
                           </Link>
                       )}
    />
}

import React from "react";
import {Link} from "react-router-dom";
import {API} from "src/model/entities/client";
import {EntityList} from "src/view/components/entity/entityList";

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

import React from "react";
import {Link} from "react-router-dom";
import {API} from "/src/model/entities/client";
import {EntityPage} from "../../../components/entityPage";
import {Entry} from "../../../components/entry";

export function ClientInstance() {
    return <EntityPage API={API}
                       url={"/clients"}
                       entityToJsxFunction={(client) => (
                           <div className={"entity-info"}>
                               <Entry info={"Name"} value={`${client.firstName} ${client.secondName} ${client.patronymic}`}/>
                               <Entry info={"Phone"} value={client.phone}/>
                               <Entry info={"Email"} value={client.email}/>
                           </div>
                       )}
    />;
}

import React from "react";
import {API} from "src/model/entities/client";
import {Entry} from "src/view/components/entry";
import {EntityPage} from "src/view/components/entityPage";

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

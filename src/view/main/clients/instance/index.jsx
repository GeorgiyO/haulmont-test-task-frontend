import React from "react";
import {Link} from "react-router-dom";
import {API} from "/src/model/entities/client";
import {EntityPage} from "../../../components/entityPage";

export function ClientInstance() {
    return <EntityPage API={API}
                       url={"/clients"}
                       entityToJsxFunction={(client) => (
                           <div className={"entity-info"}>
                               <p>{client.firstName} {client.secondName} {client.patronymic}</p>
                               <p>Phone: {client.phone}</p>
                               <p>Email: {client.email}</p>
                               <div>Bank: {
                                   client.bank ?
                                   <Link to={"/banks/" + client.bank.id}>{client.bank.name}</Link> :
                                   "None"
                               }
                               </div>
                           </div>
                       )}
    />;
}

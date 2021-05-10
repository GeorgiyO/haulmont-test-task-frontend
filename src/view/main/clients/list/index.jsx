import React from "react";
import {API} from "/src/model/endpoints/client";
import {Link} from "react-router-dom";
import {EntityList} from "/src/view/components/entityList";

export function ClientList() {
    return <EntityList API={API}
                       label={"Clients"}
                       entityToJsxFunction={(client) => {
                           const {firstName, secondName, patronymic, passportNumber} = client;
                           return (
                               <Link to={"/clients/" + passportNumber}>
                                   {`${firstName} ${secondName} ${patronymic}`}
                               </Link>
                           );
                       }}
    />
}

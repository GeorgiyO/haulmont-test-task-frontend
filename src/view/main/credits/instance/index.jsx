import React from "react";
import {EntityPage} from "../../../components/entityPage";
import {API} from "../../../../model/entities/credit";
import {Link} from "react-router-dom";

export function CreditInstance() {
    return <EntityPage API={API}
                       url={"/credits"}
                       entityToJsxFunction={(credit) => (
                           <div className={"entity-info"}>
                               <Link to={"/banks/" + credit.bank.id}>{credit.bank.name}</Link>
                               <p>Percentage: {credit.percentage}</p>
                               <p>Limit: {credit.limit}</p>
                           </div>
                       )}
    />;
}
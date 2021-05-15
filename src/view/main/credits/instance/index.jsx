import React from "react";
import {EntityPage} from "../../../components/entityPage";
import {API} from "../../../../model/entities/credit";
import {Link} from "react-router-dom";
import {Entry} from "../../../components/entry";

export function CreditInstance() {
    return <EntityPage API={API}
                       url={"/credits"}
                       entityToJsxFunction={(credit) => (
                           <div className={"entity-info"}>
                               <Entry info={"Bank"} value={<Link to={"/banks/" + credit.bank.id}>{credit.bank.name}</Link>}/>
                               <Entry info={"Percentage"} value={`${credit.percentage}%`}/>
                               <Entry info={"Limit"} value={credit.limit}/>
                           </div>
                       )}
    />;
}
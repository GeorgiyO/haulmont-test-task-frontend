import React from "react";
import {API} from "src/model/entities/credit";
import {Link} from "react-router-dom";
import {Entry} from "src/view/components/entry";
import {EntityPage} from "src/view/components/entityPage";

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
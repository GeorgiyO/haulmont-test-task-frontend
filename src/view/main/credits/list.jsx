import React from "react";
import {API} from "src/model/entities/credit";
import {Link} from "react-router-dom";
import {EntityList} from "src/view/components/entityList";

export function CreditList() {
    return <EntityList API={API}
                       label={"Credits"}
                       entityToJsxFunction={(credit) => (
                           <Link to={"/credits/" + credit.id}>
                               Bank: {credit.bank.name}; Limit: {credit.limit}; Percentage: {credit.percentage}%
                           </Link>
                       )}
    />
}

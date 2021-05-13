import React from "react";
import {EntityList} from "../../../components/entityList";
import {API} from "../../../../model/entities/credit";
import {Link} from "react-router-dom";

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

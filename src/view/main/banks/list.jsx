import React from "react";
import {API} from "src/model/entities/bank";
import {EntityList} from "src/view/components/entity/entityList";
import {Link} from "react-router-dom";

export function BankList() {
    return <EntityList API={API}
                       label={"Banks"}
                       entityToJsxFunction={(bank) => (
                           <Link to={"/banks/" + bank.id}>{bank.name}</Link>
                       )}
    />
}

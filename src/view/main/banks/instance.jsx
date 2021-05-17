import React from "react";
import {API} from "src/model/entities/bank";
import {EntityPage} from "src/view/components/entity/entityPage";

export function BankInstance() {
    return <EntityPage API={API}
                       url={"/banks"}
                       entityToJsxFunction={(bank) => <p>{bank.name}</p>}
    />;
}
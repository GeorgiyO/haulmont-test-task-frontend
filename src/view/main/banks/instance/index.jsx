import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {API} from "/src/model/entities/bank";
import {EntityPage} from "../../../components/entityPage";

export function BankInstance() {
    return <EntityPage API={API}
                       url={"/banks"}
                       entityToJsxFunction={(bank) => <p>{bank.name}</p>}
    />;
}
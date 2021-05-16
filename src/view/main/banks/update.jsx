import React from "react";
import {API, BankTemplate} from "src/model/entities/bank";
import {BankForm} from "./form";
import {UpdateEntity} from "src/view/components/updateEntity";

export function UpdateBank() {
    return <UpdateEntity template={new BankTemplate()}
                         API={API}
                         formProvider={BankForm}
                         entityUrl={"banks"}
                         entityName={"Bank"}
    />;
}

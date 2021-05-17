import React from "react";
import {API, CreditTemplate} from "src/model/entities/credit";
import {CreditForm} from "src/view/main/credits/form";
import {UpdateEntity} from "src/view/components/entity/updateEntity";

export function UpdateCredit() {
    return <UpdateEntity template={new CreditTemplate()}
                         API={API}
                         formProvider={CreditForm}
                         entityUrl={"credits"}
                         entityName={"Credit"}
    />;
}

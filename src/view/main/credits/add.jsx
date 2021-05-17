import React from "react";
import {API, CreditTemplate} from "src/model/entities/credit";
import {CreditForm} from "src/view/main/credits/form";
import {AddEntity} from "src/view/components/entity/addEntity";

export function AddCredit() {
    return <AddEntity template={new CreditTemplate()}
                      API={API}
                      formProvider={CreditForm}
                      entityUrl={"credits"}
                      entityName={"Credit"}
    />;
}

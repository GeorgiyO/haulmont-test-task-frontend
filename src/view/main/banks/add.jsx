import React from "react";
import {AddEntity} from "src/view/components/addEntity";
import {API, BankTemplate} from "src/model/entities/bank";
import {BankForm} from "src/view/main/banks/form";

export function AddBank() {
    return <AddEntity template={new BankTemplate()}
                      API={API}
                      formProvider={BankForm}
                      entityName={"Bank"}
                      entityUrl={"banks"}
    />
}

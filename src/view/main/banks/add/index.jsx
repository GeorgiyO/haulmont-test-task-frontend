import React from "react";
import {useHistory} from "react-router-dom";
import {API, BankTemplate} from "/src/model/entities/bank";
import {BankForm} from "../form";

export function AddBank() {

    const history = useHistory();

    const template = new BankTemplate();

    const addBank = function () {
        if (template.validate()) {
            API.add(template.toInstance()).then((bank) => {
                history.push("/banks/" + bank.id);
            });
        }
    };

    return <BankForm template={template} label={"Add bank"} buttonLabel={"Add"} action={addBank}/>;
}

import React from "react";
import {useHistory} from "react-router-dom";
import {API, CreditTemplate} from "../../../../model/entities/credit";
import {CreditForm} from "../form";

export function AddCredit() {

    const history = useHistory();

    const template = new CreditTemplate();

    const addCredit = function () {
        if (template.validate()) {
            API.add(template.toInstance()).then((credit) => {
                history.push("/credits/" + credit.id);
            });
        }
    }

    return <CreditForm template={template} label={"Add credit"} buttonLabel={"Add"} action={addCredit}/>
}

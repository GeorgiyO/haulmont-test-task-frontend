import React from "react";
import {useHistory} from "react-router-dom";
import {API, CreditOfferTemplate} from "../../../../model/entities/creditOffer";
import {CreditOfferForm} from "../form";

export function AddCreditOffer() {

    const history = useHistory();

    const template = new CreditOfferTemplate();

    const addCreditOffer = function () {
        if (template.validate()) {
            API.add(template.toInstance()).then((creditOffer) => {
                history.push("/credit-offers/" + creditOffer.id);
            });
        }
    }

    return <CreditOfferForm template={template} label={"Add credit"} buttonLabel={"Add"} action={addCreditOffer}/>
}
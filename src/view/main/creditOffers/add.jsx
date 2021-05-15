import React from "react";
import {useHistory} from "react-router-dom";
import {API, CreditOfferTemplate} from "src/model/entities/creditOffer";
import {CreditOfferForm} from "src/view/main/creditOffers/form";

export function AddCreditOffer() {

    const history = useHistory();

    const template = new CreditOfferTemplate();

    const addCreditOffer = function () {
        if (template.validate()) {
            console.log(template.toInstance());
            API.add(template.toInstance()).then((creditOffer) => {
                console.log(creditOffer);
                history.push("/credit-offers/" + creditOffer.id);
            });
        }
    }

    return <CreditOfferForm template={template} label={"Add credit"} buttonLabel={"Add"} action={addCreditOffer}/>
}
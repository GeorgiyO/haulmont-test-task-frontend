import React from "react";
import {API, CreditOfferTemplate} from "src/model/entities/creditOffer";
import {CreditOfferForm} from "src/view/main/creditOffers/form";
import {UpdateEntity} from "src/view/components/updateEntity";

export function UpdateCreditOffer() {
    return <UpdateEntity template={new CreditOfferTemplate()}
                         API={API}
                         formProvider={CreditOfferForm}
                         entityUrl={"credit-offers"}
                         entityName={"Credit Offer"}
    />;
}

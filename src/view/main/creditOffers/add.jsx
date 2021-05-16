import React from "react";
import {API, CreditOfferTemplate} from "src/model/entities/creditOffer";
import {CreditOfferForm} from "src/view/main/creditOffers/form";
import {AddEntity} from "src/view/components/addEntity";

export function AddCreditOffer() {
    return <AddEntity template={new CreditOfferTemplate()}
                      API={API}
                      formProvider={CreditOfferForm}
                      entityUrl={"credit-offers"}
                      entityName={"Credit Offer"}
    />;
}
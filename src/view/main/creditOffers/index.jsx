import React from "react";
import {EntityMainPage} from "../../components/entityMainPage";
import {AddCreditOffer} from "./add";
import {UpdateCreditOffer} from "./update";
import {CreditOfferInstance} from "./instance";
import {CreditOffersList} from "./list";

export function CreditOffers() {
    return <EntityMainPage addPage={AddCreditOffer}
                           updatePage={UpdateCreditOffer}
                           instancePage={CreditOfferInstance}
                           listPage={CreditOffersList}
                           entityName={"credit offer"}
    />
}

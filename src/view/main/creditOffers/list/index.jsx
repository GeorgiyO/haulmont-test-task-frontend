import React from "react";
import {EntityList} from "../../../components/entityList";
import {API} from "../../../../model/entities/creditOffer";
import {Link} from "react-router-dom";

export function CreditOffersList() {
    return <EntityList API={API}
                       label={"Credit Offers"}
                       entityToJsxFunction={(creditOffer) => (
                           <Link to={"/credit-offers/" + creditOffer.id}>
                               {creditOffer.client.firstName} {creditOffer.client.secondName} {creditOffer.client.patronymic}
                               - {creditOffer.credit.bank.name} - {creditOffer.paymentAmount}
                           </Link>
                       )}
    />
}

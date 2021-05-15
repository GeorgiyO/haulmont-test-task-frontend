import React from "react";
import {API} from "src/model/entities/creditOffer";
import {Link} from "react-router-dom";
import {EntityList} from "src/view/components/entityList";

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

import React from "react";
import {EntityPage} from "../../../components/entityPage";
import {API} from "../../../../model/entities/creditOffer";
import {Link} from "react-router-dom";
import {Entry} from "../../../components/entry";

export function CreditOfferInstance() {
    return <EntityPage API={API}
                       url={"/credit-offers"}
                       entityToJsxFunction={(creditOffer) => {
                           const {firstName, secondName, patronymic, passportNumber} = creditOffer.client;
                           const credit = creditOffer.credit;
                           const bank = creditOffer.credit.bank;
                           return (
                               <div className={"entity-info"}>
                                   <p>Client: <Link to={"/clients/" + passportNumber}>
                                       {firstName} {secondName} {patronymic}
                                   </Link></p>
                                   <p>Bank: <Link to={"/banks/" + bank.id}>
                                       {bank.name}
                                   </Link></p>
                                   <p>Credit info: <Link to={"/credits/" + credit.id}>
                                       limit - {credit.limit}; percentage - {credit.percentage}%
                                   </Link></p>
                                   <p>Payment amount: {creditOffer.paymentAmount}</p>
                                   <p>Payment graph:</p>
                                   <div className={"payment-graph"}>
                                       {creditOffer.paymentGraph.map((graphElement, i) => {
                                           const date = new Date(graphElement.date);
                                           const year = date.getUTCFullYear();
                                           const month = date.getUTCMonth();
                                           const day = date.getUTCDate();
                                           return (
                                               <div key={i} className={"element"}>
                                                   <Entry info={"Date"} value={`${year}-${month}-${day}`}/>
                                                   <Entry info={"Total payment"} value={graphElement.totalPayment}/>
                                                   <Entry info={"Body payment"} value={graphElement.bodyPayment}/>
                                                   <Entry info={"Percentage payment"} value={graphElement.percentagePayment}/>
                                               </div>
                                           );
                                       })}
                                   </div>
                               </div>
                           );
                       }}
    />
}
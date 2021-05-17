import React from "react";
import {API} from "src/model/entities/creditOffer";
import {Link} from "react-router-dom";
import {Entry} from "src/view/components/entry";
import {EntityPage} from "src/view/components/entity/entityPage";

export function CreditOfferInstance() {
    return <EntityPage API={API}
                       url={"/credit-offers"}
                       entityToJsxFunction={(creditOffer) => {
                           const {firstName, secondName, patronymic, passportNumber} = creditOffer.client;
                           const credit = creditOffer.credit;
                           const bank = creditOffer.credit.bank;
                           return (
                               <div className={"entity-info"}>
                                   <Entry info={"Client"}
                                          value={
                                              <Link to={"/clients/" + passportNumber}>
                                                  {firstName} {secondName} {patronymic}
                                              </Link>
                                          }
                                   />
                                   <Entry info={"Bank"}
                                          value={
                                              <Link to={"/banks/" + bank.id}>
                                                  {bank.name}
                                              </Link>
                                          }
                                   />
                                   <Entry info={"Credit info"}
                                          value={
                                              <Link to={"/credits/" + credit.id}>
                                                  limit - {credit.limit}; percentage - {credit.percentage}%
                                              </Link>
                                          }
                                   />
                                   <Entry info={"Payment amount"} value={creditOffer.paymentAmount}
                                   />
                                   <p>Payment graph:</p>
                                   <div className={"payment-graph"}>
                                       {creditOffer.paymentGraph.map((graphElement, i) => {
                                           const date = new Date(graphElement.date);

                                           let year = date.getUTCFullYear();

                                           let month = date.getUTCMonth() + 1;
                                           month = month < 10 ? "0" + month : String(month);

                                           let day = date.getUTCDate();
                                           return (
                                               <div key={i} className={"element"}>
                                                   <Entry info={"Date"} value={`${year}-${month}-${day}`}/>
                                                   <Entry info={"Total payment"} value={graphElement.totalPayment}/>
                                                   <Entry info={"Body payment"} value={graphElement.bodyPayment}/>
                                                   <Entry info={"Percentage payment"}
                                                          value={graphElement.percentagePayment}/>
                                               </div>
                                           );
                                       })}
                                   </div>
                               </div>
                           );
                       }}
    />
}
import React from "react";
import {Input} from "../../../components/input";
import {EntitySelect} from "../../../components/entitySelect";
import {API as CreditAPI} from "../../../../model/entities/credit";
import {API as ClientAPI} from "../../../../model/entities/client";
import {Entry} from "../../../components/entry";

export function CreditOfferForm({template, label, buttonLabel, action}) {
    const errors = template.errors;

    return (
        <div className={"entity-form"}>
            <h2>{label}:</h2>
            <ExtraInfo template={template}/>
            <EntitySelect label={"Credit"} valueRef={template.credit} entitiesSupplier={CreditAPI.getAll}
                          entityToText={(credit) => `${credit.bank.name}; ${credit.percentage}%; limit: ${credit.limit}`}
            />
            <EntitySelect label={"Client"} valueRef={template.client} entitiesSupplier={ClientAPI.getAll}
                          entityToText={(client) => `${client.firstName} ${client.secondName} ${client.patronymic}`}
            />
            <PaymentGraphForm template={template}/>
        </div>
    );
}

function ExtraInfo({template}) {

    const [bodyPayment, setBodyPayment] = React.useState(0);
    const [percentage, setPercentage] = React.useState(0);

    React.useEffect(() => {
        template.paymentAmount.consumers.add(setBodyPayment);
        template.credit.consumers.add(setPercentage);
        return function () {
            template.paymentAmount.consumers.delete(setBodyPayment);
            template.credit.consumers.delete(setPercentage);
        }
    }, []);

    const percentagePayment = bodyPayment * percentage / 100;

    return (
        <div className={"credit-offer-extra-info"}>
            <p>Payment: </p>
            <Entry info={"Body"} value={bodyPayment}/>
            <Entry info={"Percentage"} value={percentagePayment}/>
            <Entry info={"Total"} value={bodyPayment + percentagePayment}/>
        </div>
    )
}

function PaymentGraphForm({template}) {
    const errors = template.errors;

    
}
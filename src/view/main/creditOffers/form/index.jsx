import React from "react";
import {Input} from "../../../components/input";
import {EntitySelect} from "../../../components/entitySelect";
import {API as CreditAPI} from "../../../../model/entities/credit";
import {API as ClientAPI} from "../../../../model/entities/client";
import {Entry} from "../../../components/entry";
import {Observable} from "../../../../domain/observable";

export function CreditOfferForm({template, label, buttonLabel, action}) {

    return (
        <div className={"entity-form"}>

            <ExtraInfo template={template}/>    {/* fixed position -> to right of the screen */}

            <h2>{label}:</h2>
            <EntitySelect label={"Client"} valueRef={template.client} entitiesSupplier={ClientAPI.getAll}
                          entityToText={(client) => `${client.firstName} ${client.secondName} ${client.patronymic}`}
            />
            <EntitySelect label={"Credit"} valueRef={template.credit} entitiesSupplier={CreditAPI.getAll}
                          entityToText={(credit) => `${credit.bank.name}; ${credit.percentage}%; limit: ${credit.limit}`}
            />
            <Input type={"number"} label={"Payment amount"}
                   valueRef={template.paymentAmount} errorsRef={template.errors.paymentAmount}
                   inputDecorator={(val) => {
                       val = Input.positiveNumber(val);
                       val = Math.min(val, template.credit.get().limit);
                       return val.toString();
                   }}
            />
            <PaymentGraphForm template={template}/>
            <button onClick={action}>{buttonLabel}</button>
        </div>
    );
}

function ExtraInfo({template}) {

    const [bodyPayment] = Observable.useWatch(template.paymentAmount);
    const [monthPayment] = Observable.useWatch(template.monthPayment);
    const [credit] = Observable.useWatch(template.credit);
    const [length] = Observable.useWatch(template.paymentGraphLength);

    const percentage = credit.percentage;

    const percentagePayment = +bodyPayment * percentage / 100;
    const totalPayment = +bodyPayment + percentagePayment;

    return (
        <div className={"credit-offer-extra-info"}>
            <Entry info={"Percentage"} value={percentagePayment.toFixed(2)}/>
            <Entry info={"Total"} value={totalPayment.toFixed(2)}/>
            <Entry info={"Month"} value={monthPayment.toFixed(2)}/>
            <Entry info={"Payments count"} value={length}/>
        </div>
    )
}

function PaymentGraphForm({template}) {

    const forceUpdate = useForceUpdate();

    const addElement = () => {
        template.addGraphElement();
        forceUpdate();
    };

    const removeElement = (index) => {
        template.removeGraphElement(index);
        forceUpdate();
    }

    return (
        <div className={"payment-graph-form"}>
            <div className={"payment-graph"}>
                {template.paymentGraph.map((element, i) => (
                    <PaymentGraphElementForm key={nextId()} element={element} removeElement={() => removeElement(i)}
                                             template={template}/>
                ))}
            </div>
            <button onClick={addElement}>Add element</button>
        </div>
    )
}

function PaymentGraphElementForm({element, removeElement, template}) {

    const errors = element.errors;

    const [monthPayment] = Observable.useWatch(template.monthPayment);

    return (
        <div className={"element with-close-button"}>
            <Input type={"date"} label={"Date"} valueRef={element.date} errorsRef={errors.date}/>
            <Input type={"number"} label={"Body payment"} valueRef={element.bodyPayment}
                   errorsRef={errors.bodyPayment}
                   inputDecorator={(val) => {
                       element.percentagePayment.set(monthPayment - val);
                       return val.toString();
                   }}
            />
            <Input type={"number"} label={"Percentage payment"} valueRef={element.percentagePayment}
                   errorsRef={errors.percentagePayment}
                   inputDecorator={(val) => {
                       element.bodyPayment.set(monthPayment - val);
                       return val.toString();
                   }}
            />
            <button className={"red small close-button"} onClick={removeElement}>Remove</button>
        </div>
    );
}

function nextId() {
    return ++nextId.val;
}

nextId.val = Number.MIN_SAFE_INTEGER;

function useForceUpdate() {
    const [value, setValue] = React.useState(0); // integer state
    return () => setValue((value) => ++value); // update the state to force render
}
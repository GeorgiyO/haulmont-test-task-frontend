import React from "react";
import {API as CreditAPI} from "src/model/entities/credit";
import {API as ClientAPI} from "src/model/entities/client";
import {Observable} from "src/domain/observable";
import {Input} from "src/view/components/input";
import {Entry} from "src/view/components/entry";
import {EntitySelect} from "src/view/components/entitySelect";

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
            <PaymentGraphTemplateCreator template={template}/>
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
    const [graphPercentageSum] = Observable.useWatch(template.graphPercentageSum);

    const percentage = credit.percentage;

    const percentagePayment = +bodyPayment * percentage / 100;
    const totalPayment = +bodyPayment + percentagePayment;

    return (
        <div className={"credit-offer-extra-info"}>
            <Entry info={"Total"} value={totalPayment.toFixed(2)}/>
            <Entry info={"Month"} value={monthPayment.toFixed(2)}/>
            <Entry info={"Payments count"} value={length}/>
            <br/>
            <Entry info={"Percentage"} value={percentagePayment.toFixed(2)}/>
            <Entry info={"Graph percentage sum"} value={graphPercentageSum.toFixed(2)}/>
            <Entry info={"Difference"} value={(percentagePayment - graphPercentageSum).toFixed(2)}/>
        </div>
    );
}

function PaymentGraphForm({template}) {

    Observable.useWatch(template.paymentGraphLength);   // update on change

    const addElement = () => {
        template.addGraphElement();
    };

    const removeElement = (index) => {
        template.removeGraphElement(index);
    }

    return (
        <div className={"payment-graph-form"}>
            <div className={"payment-graph"}>
                {template.paymentGraph.map((element, i) => (
                    <PaymentGraphElementForm key={nextId()} element={element} removeElement={() => removeElement(i)}
                                             template={template}/>
                ))}
            </div>
            <button onClick={addElement}>Add graph element</button>
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

function PaymentGraphTemplateCreator({template}) {

    const paymentDay = new Observable(new Date().getUTCDay() + 1);
    const paymentGraphCount = new Observable(template.paymentGraphLength.get());

    React.useEffect(() => {

        const setPaymentGraphCount = paymentGraphCount.set.bind(paymentGraphCount);
        template.paymentGraphLength.watch(setPaymentGraphCount);

        return function () {
            template.paymentGraphLength.unwatch(setPaymentGraphCount);
        }
    }, []);

    const createTemplate = () => {
        const date = new Date();

        const nextDate = function () {
            date.setUTCMonth(date.getUTCMonth() + 1);
            return date.toISOString().substring(0, 10);
        }

        const count = paymentGraphCount.get() - template.paymentGraph.length;

        if (count < 0) {
            for (let i = 0; i < -count; i++) {
                template.removeGraphElement(template.paymentGraph.length - 1);
            }
        } else {
            for (let i = 0; i < count; i++) {
                template.addGraphElement();
                const created = template.paymentGraph[template.paymentGraph.length - 1];
                created.date.set(nextDate());
            }
        }
    }

    return (
        <div className={"payment-graph-template-creator"}>
            <p>Pattern creator:</p>
            <Input type={"number"} label={"elements count"} valueRef={paymentGraphCount}
                   inputDecorator={Input.positiveNumberAsString}
            />
            <Input type={"number"} label={"payment day"} valueRef={paymentDay}
                   inputDecorator={(val) => {
                       val = Input.positiveNumber(val);
                       return Math.min(val, 30);
                   }}
            />
            <button onClick={createTemplate}>Create</button>
        </div>
    )
}

function nextId() {
    return ++nextId.val;
}

nextId.val = Number.MIN_SAFE_INTEGER;
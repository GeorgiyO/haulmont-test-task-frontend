import {RESTApi} from "src/model/entityRESTTemplate";
import {Observable} from "src/domain/observable";
import {NumberValidator} from "src/model/validations";
import {PaymentGraphElementTemplate} from "./paymentGraphElement";

export function CreditOffer(paymentAmount, client, credit, paymentGraph) {

    console.log(paymentGraph);

    Object.defineProperty(this, "id", {
        enumerable: false
    });
    this.paymentAmount = paymentAmount;
    this.paymentGraph = paymentGraph;
    if (client && !isNaN(client.passportNumber)) {
        this.client = client;
    }
    if (credit && !isNaN(credit.id)) {
        this.credit = credit;
    }
}

export class CreditOfferTemplate {

    constructor() {
        this.paymentAmount = new Observable("0");
        this.client = new Observable({});
        this.credit = new Observable({percentage: 0});
        this.errors = this.getErrorsRefs();
        this.paymentGraph = [];

        this.monthPayment = new Observable(0);
        this.paymentGraphLength = new Observable(0);
        this.graphPercentageSum = new Observable(0);

        this.paymentAmount.watch((val) => {
            this.updateMonthPayment(val, this.credit.get().percentage, this.paymentGraphLength.get());
        });
        this.credit.watch((credit) => {
            this.updateMonthPayment(this.paymentAmount.get(), credit.percentage, this.paymentGraphLength.get());
        });
        this.paymentGraphLength.watch((length) => {
            this.updateMonthPayment(this.paymentAmount.get(), this.credit.get().percentage, length);
        });

        this.updateMonthPayment(this.paymentAmount.get(), this.credit.get().percentage, this.paymentGraphLength.get());
    }

    toInstance() {
        return new CreditOffer(
            Number(this.paymentAmount.get()),
            this.client.get(),
            this.credit.get(),
            this.paymentGraph.map((pg) => pg.toInstance())
        );
    }

    fromInstance(instance) {
        this.paymentAmount.set(instance.paymentAmount);
        this.client.set(instance.client);
        this.credit.set(instance.credit);
        instance.paymentGraph.forEach((pge) => {
            this.addGraphElement(new PaymentGraphElementTemplate().fromInstance(pge));
        });
        return this;
    }

    getErrorsRefs() {
        let res = {};
        Object.keys(this).forEach((k) => {
            res[k] = new Observable([]);
        });
        return res;
    }

    validate() {
        this.errors.paymentAmount.set(
            NumberValidator.positiveInt(this.paymentAmount.get())
        );
        this.paymentGraph.forEach((pg) => pg.validate());

        return this.isValid();
    }

    isValid() {

        for (let errArr of Object.values(this.errors)) {
            if (errArr.get().length !== 0) {
                return false;
            }
        }

        for (let paymentGraphElement of this.paymentGraph) {
            if (!paymentGraphElement.isValid()) {
                return false;
            }
        }

        return true;
    }

    addGraphElement(element = new PaymentGraphElementTemplate()) {

        element.monthListener = this.monthPayment.watch((val) => {
            const percentage = this.credit.get().percentage;

            const bodyPayment = val / (1 + percentage / 100);
            const percentagePayment = val - bodyPayment;

            element.bodyPayment.set(bodyPayment);
            element.percentagePayment.set(percentagePayment);
        });

        element.percentagePayment.watch((newVal, oldVal) => {
            this.graphPercentageSum.set(
                this.graphPercentageSum.get() + newVal - oldVal
            );
        });

        this.paymentGraph.push(element);
        this.paymentGraphLength.set(this.paymentGraph.length);
    }

    removeGraphElement(index) {
        const [element] = this.paymentGraph.splice(index, 1);

        this.monthPayment.unwatch(element.monthListener);

        this.paymentGraphLength.set(this.paymentGraph.length);
    }

    updateMonthPayment(paymentAmount, percentage, length) {
        let val = length === 0 ?
                  0 :
                  paymentAmount / length;

        val *= 1 + percentage / 100;

        this.monthPayment.set(val);
    }

}

export const API = new RESTApi(serverUrl + "/credit-offers");
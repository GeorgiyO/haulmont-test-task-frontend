import {RESTApi} from "../../entityRESTTemplate";
import {Observable} from "../../../domain/observable";
import {NumberValidator, StringValidator} from "../../validations";
import {PaymentGraphElementTemplate} from "../paymentGraphElement";

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

export function CreditOfferTemplate() {
    this.paymentAmount = new Observable("0");
    this.client = new Observable({});
    this.credit = new Observable({percentage: 0});
    this.errors = this.getErrorsRefs();

    this.paymentGraph = [];
    this.monthPayment = new Observable(0);
    this.paymentGraphLength = new Observable(0);

    this.paymentAmount.watch((val) => {
        this.updateMonthPayment(val, this.credit.get().percentage, this.paymentGraphLength.get());
    });
    this.credit.watch((credit) => {
        this.updateMonthPayment(this.paymentAmount.get(), credit.percentage, this.paymentGraphLength.get());
    });
    this.paymentGraphLength.watch((length) => {
        this.updateMonthPayment(this.paymentAmount.get(), this.credit.get().percentage, length);
    })
}

CreditOfferTemplate.prototype = {

    toInstance() {
        return new CreditOffer(
            Number(this.paymentAmount.get()),
            this.client.get(),
            this.credit.get(),
            this.paymentGraph.map((pg) => pg.toInstance())
        );
    },

    fromInstance(instance) {
        this.paymentAmount.set(instance.paymentAmount);
        this.paymentGraph.set(instance.paymentGraph.map(
            (pg) => new PaymentGraphElementTemplate().fromInstance(pg))
        );
        this.client.set(instance.client);
        this.credit.set(instance.credit);
    },

    getErrorsRefs() {
        let res = {};
        Object.keys(this).forEach((k) => {
            res[k] = new Observable([]);
        });
        return res;
    },

    validate() {
        this.errors.paymentAmount.set(
            NumberValidator.positiveInt(this.paymentAmount.get())
        );
        this.paymentGraph.forEach((pg) => pg.validate());

        return this.isValid();
    },

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
        ;

        return true;
    },

    addGraphElement() {
        const element = new PaymentGraphElementTemplate();

        element.monthListener = this.monthPayment.watch((val) => {
            const percentage = this.credit.get().percentage;

            const percentagePayment = val * percentage / 100;
            const bodyPayment = val - percentagePayment;

            element.bodyPayment.set(bodyPayment);
            element.percentagePayment.set(percentagePayment);
        });

        this.paymentGraph.push(element);
        this.paymentGraphLength.set(this.paymentGraph.length);
    },

    removeGraphElement(index) {
        const [element] = this.paymentGraph.splice(index, 1);

        this.monthPayment.unwatch(element.monthListener);

        this.paymentGraphLength.set(this.paymentGraph.length);
    },

    updateMonthPayment(paymentAmount, percentage, length) {
        let val = length === 0 ?
                  0 :
                  paymentAmount / length;

        val += val * percentage / 100;

        this.monthPayment.set(val);
    }

}

export const API = new RESTApi(serverUrl + "/credit-offers");
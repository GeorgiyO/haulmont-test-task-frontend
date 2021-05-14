import {RESTApi} from "../../entityRESTTemplate";
import {Observable} from "../../../domain/observable";
import {NumberValidator, StringValidator} from "../../validations";
import {PaymentGraphElementTemplate} from "../paymentGraphElement";

export function CreditOffer(paymentAmount, client, credit, paymentGraph) {
    Object.defineProperty(this, "id", {
        enumerable: false
    });
    this.paymentAmount = paymentAmount;
    this.paymentGraph = paymentGraph;
    if (client && !isNaN(client.id)) {
        this.client = client;
    }
    if (credit && !isNaN(credit.id)) {
        this.credit = credit;
    }
}

export function CreditOfferTemplate() {
    this.paymentAmount = new Observable("");
    this.client = new Observable({});
    this.credit = new Observable({});
    this.errors = this.getErrorsRefs();

    this.paymentGraph = [];
    this.monthPayment = new Observable(0);

    this.paymentAmount.watch((val) => {
        this.updateMonthPayment(val, this.credit.get().percentage);
    });
    this.credit.watch((credit) => {
        this.updateMonthPayment(this.paymentAmount.get(), credit.percentage);
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
        return this.paymentGraph.isValid();
    },

    addGraphElement() {
        this.paymentGraph.push(new PaymentGraphElementTemplate());
        this.updateMonthPayment(this.paymentAmount.get(), this.credit.get().percentage);
    },

    removeGraphElement(index) {
        this.paymentGraph.splice(index, 1);
        this.updateMonthPayment(this.paymentAmount.get(), this.credit.get().percentage);
    },

    updateMonthPayment(paymentAmount, percentage) {
        let length = this.paymentGraph.length;

        let val = length === 0 ?
                  0 :
              paymentAmount / length;

        val += val * percentage / 100;

        this.monthPayment.set(val);
    }

}

export const API = new RESTApi(serverUrl + "/credit-offers");
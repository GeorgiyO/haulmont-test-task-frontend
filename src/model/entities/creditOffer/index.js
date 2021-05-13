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
    this.paymentGraph = [];
    this.errors = this.getErrorsRefs();
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
        this.paymentGraph.validate();
        return this.isValid();
    },

    isValid() {
        for (let errArr of Object.values(this.errors)) {
            if (errArr.get().length !== 0) {
                return false;
            }
        }
        return this.paymentGraph.isValid();
    }

}

export const API = new RESTApi(serverUrl + "/credit-offers");
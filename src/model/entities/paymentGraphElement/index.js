import {Observable} from "../../../domain/observable";
import {DateValidator, NumberValidator} from "../../validations";

export function PaymentGraphElement(date, totalPayment, bodyPayment, percentagePayment) {
    Object.defineProperty(this, "id", {
        enumerable: false
    });
    this.date = date;
    this.totalPayment = totalPayment;
    this.bodyPayment = bodyPayment;
    this.percentagePayment = percentagePayment;
}

export function PaymentGraphElementTemplate() {
    this.date = new Observable("");
    this.totalPayment = new Observable("");
    this.bodyPayment = new Observable("");
    this.percentagePayment = new Observable("");
    this.errors = this.getErrorsRefs();
}

PaymentGraphElementTemplate.prototype = {

    toInstance() {
        return new PaymentGraphElement(
            this.date.get(),
            Number.parseInt(this.totalPayment.get()),
            Number.parseInt(this.bodyPayment.get()),
            Number.parseInt(this.percentagePayment.get())
        );
    },

    fromInstance(instance) {
        this.date.set(instance.date);
        this.forEachPaymentProp((key) => {
            this[key].set(String(instance[key]));
        });
        return this;
    },

    getErrorsRefs() {
        let res = {};
        Object.keys(this).forEach((k) => {
            res[k] = new Observable([]);
        });
        return res;
    },

    validate() {
        this.forEachPaymentProp((key) => {
            this.errors[key].set(NumberValidator.positiveInt(this[key].get()));
        });
        this.errors.date.set(DateValidator.future(this.date.get()));
        return this.isValid();
    },

    isValid() {
        for (let errArr of Object.values(this.errors)) {
            if (errArr.get().length !== 0) {
                return false;
            }
        }
        return true;
    },

    forEachPaymentProp(callback) {
        ["totalPayment", "bodyPayment", "percentagePayment"].forEach(callback);
    }

}
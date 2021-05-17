import {Observable} from "src/domain/observable";
import {DateValidator, NumberValidator} from "src/model/validations";

export function PaymentGraphElement(date, totalPayment, bodyPayment, percentagePayment) {
    Object.defineProperty(this, "id", {
        enumerable: false
    });
    this.date = date;
    this.bodyPayment = bodyPayment;
    this.percentagePayment = percentagePayment;
    this.totalPayment = bodyPayment + percentagePayment;
}

export class PaymentGraphElementTemplate {

    constructor() {
        this.date = new Observable("");
        this.bodyPayment = new Observable("0");
        this.percentagePayment = new Observable("0");
        this.errors = this.getErrorsRefs();
    }

    toInstance() {
        return new PaymentGraphElement(
            this.date.get(),
            Number.parseInt(this.bodyPayment.get() + this.percentagePayment.get()),
            Number.parseInt(this.bodyPayment.get()),
            Number.parseInt(this.percentagePayment.get())
        );
    }

    fromInstance(instance) {
        this.date.set(instance.date);
        this.forEachPaymentProp((key) => {
            this[key].set(String(instance[key]));
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
        this.forEachPaymentProp((key) => {
            this.errors[key].set(NumberValidator.positive(this[key].get()));
        });
        this.errors.date.set(DateValidator.future(this.date.get()));
        return this.isValid();
    }

    isValid() {
        for (let errArr of Object.values(this.errors)) {
            if (errArr.get().length !== 0) {
                return false;
            }
        }
        return true;
    }

    forEachPaymentProp(callback) {
        ["bodyPayment", "percentagePayment"].forEach(callback);
    }

}
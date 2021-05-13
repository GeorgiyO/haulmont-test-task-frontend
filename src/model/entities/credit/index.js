import {RESTApi} from "../../entityRESTTemplate";
import {Observable} from "../../../domain/observable";
import {NumberValidator} from "../../validations";
import {API as BankAPI} from "../bank";

export function Credit(percentage, limit, bank) {
    Object.defineProperty(this, "id", {
        enumerable: false
    });
    this.percentage = percentage;
    this.limit = limit;
    if (bank && !isNaN(bank.id)) {
        this.bank = bank;
    }
}

export function CreditTemplate() {
    this.percentage = new Observable("");
    this.limit = new Observable("");
    this.bank = new Observable({});
    this.errors = this.getErrorsRefs();
}

CreditTemplate.prototype = {

    toInstance() {
        return new Credit(
            Number.parseFloat(this.percentage.get()),
            Number.parseInt(this.limit.get()),
            this.bank.get()
        )
    },

    fromInstance(instance) {
        this.percentage.set(instance.percentage)
        this.limit.set(instance.limit);
        this.bank.set(instance.bank);
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
        this.errors.percentage.set(
            new NumberValidator()
                .init(this.percentage.get())
                .checkPositive()
                .errors
        );
        this.errors.limit.set(NumberValidator.positiveInt(this.limit.get()));

        return this.isValid();
    },

    isValid() {
        for (let errArr of Object.values(this.errors)) {
            if (errArr.get().length !== 0) {
                return false;
            }
        }
        return true;
    }
}

export const API = new RESTApi(serverUrl + "/credits");

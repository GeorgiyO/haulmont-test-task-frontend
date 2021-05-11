import {RESTApi} from "../../entityRESTTemplate";
import {Observable} from "/src/domain/observable";
import {StringValidator} from "../../validations";

export function Bank(name) {
    Object.defineProperty(this, "id", {
        enumerable: false
    });
    this.name = name;
}

export function BankTemplate() {
    this.name = new Observable("");
    this.errors = this.getErrorsRefs();
}

BankTemplate.prototype = {
    
    toInstance() {
        return new Bank(this.name.get());
    },

    fromInstance(instance) {
        this.name.set(instance.name);
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
        this.errors.name.set(StringValidator.notBlank250LengthMin(this.name.get()));
        return this.isValid();
    },

    isValid() {
        return this.errors.name.get().length === 0;
    }
}

export const API = new RESTApi(serverUrl + "/banks");

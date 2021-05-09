import {RESTApi} from "../entityRESTTemplate";
import {Observable} from "/src/domain/observable";

export function Bank(name) {
    Object.defineProperty(this, "id", {
        enumerable: false
    });
    this.name = name;
}

export function BankTemplate() {
    this.name = new Observable();
}
BankTemplate.prototype.toInstance = function () {
    return new Bank(this.name.get());
}

export const API = new RESTApi(serverUrl + "/banks");

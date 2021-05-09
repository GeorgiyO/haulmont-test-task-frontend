import {RESTApi} from "../entityRESTTemplate";
import {Observable} from "/src/domain/observable";

export function Client(passportNumber, firstName, secondName, patronymic, email, phone, bank) {
    this.passportNumber = passportNumber;
    this.firstName = firstName;
    this.secondName = secondName;
    this.patronymic = patronymic;
    this.email = email;
    this.phone = phone;
    this.bank = bank;
}

export function ClientTemplate() {
    this.passportNumber = new Observable();
    this.firstName = new Observable();
    this.secondName = new Observable();
    this.patronymic = new Observable();
    this.email = new Observable();
    this.phone = new Observable();
    this.bank = new Observable();
}
ClientTemplate.prototype.toInstance = function () {
    return new Client(
        this.passportNumber.get(),
        this.firstName.get(),
        this.secondName.get(),
        this.patronymic.get(),
        this.email.get(),
        this.phone.get(),
        this.bank.get()
    )
}

export const API = new RESTApi(serverUrl + "/clients");

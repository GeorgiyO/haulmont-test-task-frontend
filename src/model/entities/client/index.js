import {RESTApi} from "../../entityRESTTemplate";
import {Observable} from "/src/domain/observable";
import {StringValidator} from "../../validations";

export function Client(passportNumber, firstName, secondName, patronymic, email, phone, bank) {
    this.passportNumber = passportNumber;
    this.firstName = firstName;
    this.secondName = secondName;
    this.patronymic = patronymic;
    this.email = email;
    this.phone = phone;
    if (bank && !isNaN(bank.id)) {
        this.bank = bank;
    }
}

export function ClientTemplate() {
    this.passportNumber = new Observable("");
    this.firstName = new Observable("");
    this.secondName = new Observable("");
    this.patronymic = new Observable("");
    this.email = new Observable("");
    this.phone = new Observable("");
    this.bankId = new Observable("");
    this.errors = this.getErrorsRefs();
}

ClientTemplate.prototype = {

    toInstance() {
        return new Client(
            Number.parseInt(this.passportNumber.get().split(" ").join("")),
            this.firstName.get(),
            this.secondName.get(),
            this.patronymic.get(),
            this.email.get(),
            this.phone.get(),
            {id: Number.parseInt(this.bankId.get())}
        );
    },

    fromInstance(instance) {
        for (let key of ["firstName", "secondName", "patronymic", "email", "phone"]) {
            this[key].set(instance[key]);
        }
        this.bankId.set(instance.bank.id);

        let passport = String(instance.bank.id);
        passport = "0".repeat(10 - passport.length) + passport;
        this.passportNumber.set(passport);
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
        ["firstName", "secondName", "patronymic"].forEach((nameProp) => {
            this.errors[nameProp].set(StringValidator.notBlank250LengthMin(this[nameProp].get()));
        })
        this.errors.passportNumber.set(
            new StringValidator()
                .init(this.passportNumber.get())
                .checkPassport()
                .errors
        );
        this.errors.email.set(
            new StringValidator()
                .init(this.email.get())
                .checkNoWhitespaces()
                .checkEmail()
                .errors
        );
        this.errors.phone.set(
            new StringValidator()
                .init(this.phone.get())
                .checkNoWhitespaces()
                .checkPhone()
                .errors
        );
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

export const API = new RESTApi(serverUrl + "/clients");

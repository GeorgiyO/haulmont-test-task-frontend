import {RESTApi} from "../../entityRESTTemplate";
import {Observable} from "/src/domain/observable";
import {StringValidator} from "../../validations";

export function Client(passportNumber, firstName, secondName, patronymic, email, phone) {
    this.passportNumber = passportNumber;
    this.firstName = firstName;
    this.secondName = secondName;
    this.patronymic = patronymic;
    this.email = email;
    this.phone = phone;
}

export function ClientTemplate() {
    this.passportNumber = new Observable("0");
    this.firstName = new Observable("");
    this.secondName = new Observable("");
    this.patronymic = new Observable("");
    this.email = new Observable("");
    this.phone = new Observable("");
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
            this.phone.get()
        );
    },

    fromInstance(instance) {
        ["firstName", "secondName", "patronymic", "email", "phone"].forEach((key) => {
            this[key].set(instance[key]);
        });
        let passport = String(instance.client.passportNumber);
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
        this.forEachNameProp((key) => {
            this.errors[key].set(StringValidator.notBlank250LengthMin(this[key].get()));
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
    },

    forEachNameProp(callback) {
        ["firstName", "secondName", "patronymic"].forEach(callback);
    }
}

export const API = new RESTApi(serverUrl + "/clients");

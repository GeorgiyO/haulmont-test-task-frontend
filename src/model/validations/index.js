const PHONE_REG_EXP = new RegExp("^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$");

class Validation {

    constructor() {
        this.errors = [];
        this.valid = true;
        this.value = undefined;
        this.invalidType = false;
    }

    checkType(type, cause) {
        if (typeof this.value !== type) {
            this.setInvalid(`field must be a ${type}`);
            this.invalidType = true;
        }
    }

    setInvalid(cause) {
        this.errors.push(cause);
        this.valid = false;
    }

    /**
     * @param {function} validationConsumer - () => boolean, if true then setInvalid(errorMessage);
     * @param {string} errorMessage
     */
    check(validationConsumer, errorMessage) {
        if (this.invalidType) return;
        if (validationConsumer()) {
            this.setInvalid(errorMessage);
        }
    }
}

export class StringValidation extends Validation {

    constructor(value) {
        super();
        this.value = value;
        this.checkType("string");
    }

    checkLessOrEqualsThen(size) {
        this.check(
            () => this.value.length <= size,
            `field length must be less or equals then ${size}`
        );
    }

    checkPhone() {
        this.check(
            () => PHONE_REG_EXP.test(this.value),
            "field is not a phone"
        );
    }
}

export class NumberValidation extends Validation {



}


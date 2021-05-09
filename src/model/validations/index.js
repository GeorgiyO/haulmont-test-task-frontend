const PHONE_REG_EXP = new RegExp("^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$");

class Validator {

    init() {
        this.errors = [];
        this.value = undefined;
        this.valid = true;
        this.invalidType = false;
        return this;
    }

    checkType(type) {
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
     * @param {function} validationConsumer - () => boolean, if false then setInvalid(errorMessage);
     * @param {string} errorMessage
     */
    check(validationConsumer, errorMessage) {
        if (this.invalidType) return;
        if (!validationConsumer()) {
            this.setInvalid(errorMessage);
        }
        return this;
    }
}

export class StringValidator extends Validator {

    static notBlank250LengthMin(val) {
        return this.instance.init(val)
            .checkNotBlank()
            .checkLessOrEqualsThen(250)
            .errors;
    }

    init(value) {
        super.init();
        this.value = value;
        this.checkType("string");
        return this;
    }

    checkLessOrEqualsThen(size) {
        this.check(
            () => this.value.length <= size,
            `field length must be less or equals then ${size}`
        );
        return this;
    }

    checkNotBlank() {
        this.check(
            () => this.value.trim().length !== 0,
            "field mustn't contains whitespaces"
        );
        return this;
    }

    checkPhone() {
        this.check(
            () => PHONE_REG_EXP.test(this.value),
            "field is not a phone"
        );
        return this;
    }
}
StringValidator.instance = new StringValidator();

export class NumberValidator extends Validator {

    static positiveInt = function (val) {
        return this.instance.init(val)
            .checkPositive()
            .checkInt()
            .errors;
    }

    static positive = function (val) {
        return this.instance.init(val)
            .checkPositive()
            .errors;
    }

    init(value) {
        super.init();
        this.value = Number(value);
        let isNumber = !isNaN(this.value);
        this.check(
            () => isNumber,
            "field must be a number"
        );
        this.invalidType = !isNumber;
        return this;
    }

    checkPositive() {
        this.check(
            () => this.value > 0,
            "field must be more then 0"
        );
        return this;
    }

    checkInt() {
        this.check(
            () => this.value === parseInt(this.value),
            "field must be an integer"
        );
    }

}
NumberValidator.instance = new NumberValidator();


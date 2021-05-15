const PHONE_REG_EXP = new RegExp("^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$");
const EMAIL_REG_EXP = new RegExp("[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+");

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
            this.setInvalid(`must be a ${type}`);
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
        return StringValidator
            .instance
            .init(val)
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
            `length must be less or equals then ${size}`
        );
        return this;
    }

    checkNotBlank() {
        this.check(
            () => this.value.trim().length !== 0,
            "mustn't be blank"
        );
        return this;
    }

    checkNoWhitespaces() {
        this.check(
            () => this.value.split(new RegExp("\\s")).length === 1,
            "mustn't contains whitespaces"
        );
        return this;
    }

    checkPhone() {
        this.check(
            () => PHONE_REG_EXP.test(this.value),
            "is not a phone"
        );
        return this;
    }

    checkEmail() {
        this.check(
            () => EMAIL_REG_EXP.test(this.value),
            "is not an email"
        );
        return this;
    }

    checkPassport() {
        this.check(
            () => {
                const noWhiteSpaces = this.value.split(new RegExp("\\s")).join("");
                if (noWhiteSpaces.length !== 10) return false;
                for (let ch of noWhiteSpaces) {
                    if (!Number.isInteger(Number(ch))) {
                        return false;
                    }
                }
                return true;
            },
            "is not a passport"
        );
        return this;
    }
}

StringValidator.instance = new StringValidator();

export class DateValidator extends Validator {

    static future(val) {
        return DateValidator
            .instance
            .init(val)
            .checkFuture()
            .errors;
    }

    init(value) {
        super.init();
        this.value = new Date(value);
        if (this.value.toString() === "Invalid Date") {
            this.invalidType = true;
            this.errors.push("mustn't be empty");
        }
        return this;
    }

    checkFuture() {
        this.check(
            () => this.value.getTime() > new Date().getTime(),
            "must be a future"
        );
        return this;
    }
}

DateValidator.instance = new DateValidator();

export class NumberValidator extends Validator {

    static positiveInt = function (val) {
        return NumberValidator
            .instance
            .init(val)
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
        if (!isNumber) {
            this.invalidType = true;
            this.errors.push("must be a number");
        }
        return this;
    }

    checkPositive() {
        this.check(
            () => this.value > 0,
            "must be more then 0"
        );
        return this;
    }

    checkInt() {
        this.check(
            () => this.value === parseInt(this.value),
            "must be an integer"
        );
        return this;
    }

}

NumberValidator.instance = new NumberValidator();


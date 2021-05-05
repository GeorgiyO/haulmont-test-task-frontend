export class Decorator {

    constructor(weak) {
        this.decorators = weak ?
                          new WeakSet() :
                          new Set();
    }

    /**
     * @param {function(value): value} decorator
     * @returns {Decorator} this
     */
    add(decorator) {
        this.decorators.add(decorator);
        return this;
    }

    remove(decorator) {
        this.decorators.delete(decorator);
    }

    apply(value) {
        this.decorators.forEach((foo) => value = foo(value));
        return value;
    }
}

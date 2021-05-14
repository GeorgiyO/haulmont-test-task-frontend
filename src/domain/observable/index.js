export class Observable {

    constructor(val) {
        this.val = val;
        this.consumers = new Set();
    }

    /**
     * @param {function(value, oldValue)} consumer
     * @returns {function} consumer
     */
    watch(consumer) {
        this.consumers.add(consumer);
        return consumer;
    }

    unwatch(consumer) {
        this.consumers.delete(consumer);
    }

    get() {
        return this.val;
    }

    set(val) {
        this.consumers.forEach((foo) => foo(val, this.val));
        this.val = val;
    }

}
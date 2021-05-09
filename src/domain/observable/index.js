export class Observable {

    constructor(val) {
        this.val = val;
        this.consumers = new Set();
    }

    listen(consumer) {
        this.consumers.add(consumer);
        return consumer;
    }

    get() {
        return this.val;
    }

    set(val) {
        this.consumers.forEach((foo) => foo(val));
        this.val = val;
    }

}
import React from "react";

export class Observable {

    static useWatch(observable) {

        const [val, setVal] = React.useState(observable.get());

        React.useEffect(() => {
            observable.watch(setVal);
            return function () {
                observable.unwatch(setVal);
            }
        }, [observable]);

        return [val, observable.set.bind(observable)];
    }

    static useConsumer(observable, consumer) {
        React.useEffect(() => {
            observable.watch(consumer);
            return function () {
                observable.unwatch(consumer);
            }
        }, [observable]);

        React.useEffect(() => {
            consumer(observable.get());
        }, []);
    }

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
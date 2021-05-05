import {Decorator} from "../decorator";

export class Ref {

    constructor(val, weak) {
        this.val = val;
        this.getterDecorator = new Decorator(weak);
        this.setterDecorator = new Decorator(weak);
    }

    get() {
        return this.getterDecorator.apply(this.val);
    }

    set(val) {
        this.val = this.setterDecorator.apply(val);
    }

}

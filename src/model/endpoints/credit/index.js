import {RESTApi} from "../entityRESTTemplate";

export function Credit() {
    Object.defineProperty(this, "id", {
        enumerable: false
    });

}

export const API = new RESTApi("/credit");

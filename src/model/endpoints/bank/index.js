const {RESTApi} = require("../entityRESTTemplate");

export function Bank(id, name) {
    this.id = id;
    this.name = name;
}

export const API = new RESTApi(serverUrl + "/banks");

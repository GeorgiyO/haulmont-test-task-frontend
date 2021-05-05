async function sendRequest(url, method, data) {
    let init = {method}
    if (data !== undefined) init.body = JSON.stringify(data);

    let response = await fetch(url, init);
    return response.status === 200 ?
           response.json() :
           response.status;
}

export function RESTApi(entityUrl) {
    this.getById = (id) => sendRequest(entityUrl + "/" + id, "GET"),
    this.getAll = () => sendRequest(entityUrl, "GET"),
    this.post = (entity) => sendRequest(entityUrl, "POST", entity),
    this.put = (entity, id) => sendRequest(entityUrl + "/" + id, "PUT", entity),
    this.delete = (id) => sendRequest(entityUrl + "/" + id, "DELETE")
}

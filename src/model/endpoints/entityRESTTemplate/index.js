async function sendRequest(method, url, data) {
    let init = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (data !== undefined) init.body = JSON.stringify(data);

    let response = await fetch(url, init);
    return response.status >= 200 && response.status < 300 ?
           response.json() :
           response.status;
}

export function RESTApi(entityUrl) {
    this.getById = (id) => sendRequest("GET", entityUrl + "/" + id),
        this.getAll = () => sendRequest("GET", entityUrl),
        this.post = (entity) => sendRequest("POST", entityUrl, entity),
        this.put = (entity, id) => sendRequest("PUT", entityUrl + "/" + id, entity),
        this.delete = (id) => sendRequest("DELETE", entityUrl + "/" + id)
}

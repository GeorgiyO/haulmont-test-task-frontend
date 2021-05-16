async function sendRequest(method, url, data) {
    let init = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data !== undefined) init.body = JSON.stringify(data);

    return await fetch(url, init);
}

export function RESTApi(entityUrl) {

    this.getById = (id) => sendRequest(
        "GET",
        entityUrl + "/" + id
    ).then((response) => {

        if (response.status >= 200 && response.status < 300)
        return response.json();

    });

    this.getAll = () => sendRequest(
        "GET",
        entityUrl
    ).then((response) => response.json());

    this.add = (entity) => sendRequest(
        "POST",
        entityUrl,
        entity
    ).then((response) => response.json());

    this.update = (entity, id) => sendRequest(
        "PUT",
        entityUrl + "/" + id,
        entity
    ).then((response) => response.json());

    this.delete = (id) => sendRequest(
        "DELETE",
        entityUrl + "/" + id
    );
}

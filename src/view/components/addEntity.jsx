import React from "react";
import {useHistory} from "react-router-dom";

export function AddEntity({
    template,
    API,
    entityUrl,
    entityName,
    formProvider,
    entityToId = (entity) => entity.id
}) {

    const history = useHistory();

    const add = function () {
        if (template.validate()) {
            API.add(template.toInstance()).then((entity) => {
                history.push("/" + entityUrl + "/" + entityToId(entity));
            });
        }
    };

    return formProvider({
        template: template,
        label: "Add " + entityName,
        buttonLabel: "Add",
        action: add
    });
}

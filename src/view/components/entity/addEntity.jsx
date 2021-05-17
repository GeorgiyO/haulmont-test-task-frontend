import React from "react";
import {useHistory} from "react-router-dom";
import {show} from "src/view/components/notify";
import {handleApiError} from "src/view/components/apiErrorHandler";

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
            API.add(template.toInstance())
                .then((entity) => {
                    history.push("/" + entityUrl + "/" + entityToId(entity));
                    show("Success");
                })
                .catch((error) => {
                    handleApiError("Can't add " + entityName, error);
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

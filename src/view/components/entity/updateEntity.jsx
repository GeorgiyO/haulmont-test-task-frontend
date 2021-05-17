import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {handleApiError} from "src/view/components/apiErrorHandler";
import {show} from "src/view/components/notify";

export function UpdateEntity({
    template,
    API,
    entityUrl,
    entityName,
    formProvider,
    entityToId = (entity) => entity.id
}) {

    const history = useHistory();
    const {id} = useParams();

    const [content, setContent] = React.useState("...loading");

    React.useEffect(() => {
        API.getById(id)
            .then((entity) => {

                template.fromInstance(entity);

                const update = function () {
                    if (template.validate()) {
                        API.update(template.toInstance(), id)
                            .then((entity) => {
                                history.push("/" + entityUrl + "/" + entityToId(entity))
                                show("Succeed");
                            })
                            .catch((error) => {
                                handleApiError("Can't update " + entityName, error);
                            });
                    }
                };

                setContent(formProvider({
                    template: template,
                    label: "Update " + entityName,
                    buttonLabel: "Update",
                    action: update
                }));
            })
            .catch((error) => {
                handleApiError(`on get ${entityName} with id: ${id}`, error);
            });
    }, []);

    return content;

}
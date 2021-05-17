import React from "react";
import {handleApiError} from "src/view/components/apiErrorHandler";

export function EntityList({API, label, entityToJsxFunction}) {

    const [content, setContent] = React.useState("...loading");

    React.useEffect(() => {
        API.getAll()
            .then((entities) => {
                setContent(
                    entities.length === 0 ?
                    "empty set" :
                    entities.map((entity, i) => (
                        <div key={i}>
                            {entityToJsxFunction(entity)}
                        </div>
                    ))
                );
            })
            .catch((error) => {
                handleApiError("on get list " + label, error);
            })
        ;
    }, []);

    return (
        <div>
            <p>{label}:</p>
            <div className={"entity-list"}>
                {content}
            </div>
        </div>
    );
}

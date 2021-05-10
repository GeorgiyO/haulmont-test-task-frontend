import React from "react";

export function EntityList({API, label, entityToJsxFunction}) {

    const [content, setContent] = React.useState("...loading");

    React.useEffect(() => {
        API.getAll().then((entities) => {
            setContent(
                entities.length === 0 ?
                "empty set" :
                entities.map((entity, i) => (
                    <div key={i}>
                        {entityToJsxFunction(entity)}
                    </div>
                ))
            );
        });
    }, []);

    return (
        <div>
            <p>{label}:</p>
            {content}
        </div>
    );
}

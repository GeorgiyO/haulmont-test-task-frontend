import React from "react";
import {useHistory, useParams} from "react-router-dom";

export function EntityPage({API, url, entityToJsxFunction}) {
    const history = useHistory();
    const {id} = useParams();

    const [content, setContent] = React.useState("...loading");

    const deleteInstance = function () {
        API.delete(id).then(() => {
            history.push(url);
        });
    }

    const updateInstance = function () {
        history.push(url + "/update/" + id);
    }

    React.useEffect(() => {
        API.getById(id).then((entity) => {
            setContent(
                <div>
                    {entityToJsxFunction(entity)}
                    <button className={"red"} onClick={deleteInstance}>Delete</button>
                    <button onClick={updateInstance}>Change</button>
                </div>
            )
        })
    }, []);

    return content;
}
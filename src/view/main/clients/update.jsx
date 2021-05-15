import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {API, ClientTemplate} from "src/model/entities/client";
import {ClientForm} from "src/view/main/clients/form";

export function UpdateClient() {

    const history = useHistory();
    const {id} = useParams();

    const [content, setContent] = React.useState("...loading");

    React.useEffect(() => {
        API.getById(id).then((client) => {

            const template = new ClientTemplate().fromInstance(client);

            const updateClient = function () {
                if (template.validate()) {
                    API.update(template.toInstance(), id).then((client) => {
                        history.push("/clients/" + client.passportNumber);
                    });
                }
            };

            setContent(<ClientForm template={template} label={"Update client"} buttonLabel={"Update"} action={updateClient}/>);
        });
    }, []);

    return content;
}

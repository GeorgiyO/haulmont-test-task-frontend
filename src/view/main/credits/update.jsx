import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {API, CreditTemplate} from "src/model/entities/credit";
import {CreditForm} from "src/view/main/credits/form";

export function UpdateCredit() {

    const history = useHistory();
    const {id} = useParams();

    const [content, setContent] = React.useState("...loading");

    React.useEffect(() => {
        API.getById(id).then((credit) => {

            const template = new CreditTemplate().fromInstance(credit);

            const updateCredit = function () {
                if (template.validate()) {
                    API.update(template.toInstance(), id).then((credit) => {
                        history.push("/credits/" + credit.id);
                    });
                }
            };

            setContent(<CreditForm template={template} label={"Update credit"} buttonLabel={"Update"} action={updateCredit}/>)
        })
    }, [])

    return content;
}

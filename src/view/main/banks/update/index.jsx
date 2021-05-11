import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {API, BankTemplate} from "/src/model/entities/bank";
import {BankForm} from "../form";

export function UpdateBank() {

    const history = useHistory();
    const {id} = useParams();

    const [content, setContent] = React.useState("...loading");

    React.useEffect(() => {
        API.getById(id).then((bank) => {

            const template = new BankTemplate().fromInstance(bank);

            const updateBank = function () {
                if (template.validate()) {
                    API.update(template.toInstance(), id).then((bank) => {
                        history.push("/banks/" + bank.id);
                    });
                }
            };

            setContent(<BankForm template={template} label={"Update bank"} buttonLabel={"Update"} action={updateBank}/>);
        });
    }, []);

    return content;
}

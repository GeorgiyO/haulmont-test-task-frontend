import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {API, BankTemplate} from "/src/model/endpoints/bank";
import {StringValidator} from "/src/model/validations";
import {Input} from "/src/view/components/input";
import {Observable} from "/src/domain/observable";

export function UpdateBank() {

    const history = useHistory();
    const {id} = useParams();

    const [content, setContent] = React.useState("...loading");

    React.useEffect(() => {
        API.getById(id).then((bank) => {

            const template = new BankTemplate(bank.name);
            const errors = new Observable([]);

            const updateBank = function () {

                errors.set(StringValidator.notBlank250LengthMin(template.name.get()));

                if (errors.get().length === 0) {
                    API.update(template.toInstance(), id).then((bank) => {
                        history.push("/banks/" + bank.id);
                    });
                }
            };

            setContent(
                <div>
                    <h2>Update bank:</h2>
                    <Input type={"text"} valueRef={template.name} errorsRef={errors}/>
                    <button onClick={updateBank}>Update</button>
                </div>
            );
        });
    }, []);

    return content;
}

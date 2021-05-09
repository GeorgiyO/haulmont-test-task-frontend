import React from "react";
import {useHistory} from "react-router-dom";
import {API, BankTemplate} from "/src/model/endpoints/bank";
import {StringValidator} from "/src/model/validations";
import {Input} from "/src/view/components/input";
import {Observable} from "/src/domain/observable";

export function AddBank() {

    const history = useHistory();

    const template = new BankTemplate("");
    const errors = new Observable([]);

    const addBank = function () {

        errors.set(StringValidator.notBlank250LengthMin(template.name.get()));

        if (errors.get().length === 0) {
            API.add(template.toInstance()).then((bank) => {
                history.push("/banks/" + bank.id);
            });
        }
    };

    return (
        <div>
            <h2>Add bank:</h2>
            <Input type={"text"} valueRef={template.name} errorsRef={errors}/>
            <button onClick={addBank}>Add</button>
        </div>
    );
}

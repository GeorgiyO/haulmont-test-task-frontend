import React from "react";
import {API, Bank} from "/src/model/endpoints/bank";
import {StringValidator} from "/src/model/validations";
import {Input} from "/src/view/components/input";
import {Observable} from "/src/util/observable";

export function AddBank() {

    const validator = new StringValidator();

    const bankTemplate = {
        name: new Observable(""),
    };

    const errors = new Observable([]);

    const addBank = function () {

        errors.set(StringValidator.notBlank250LengthMin(bankTemplate.name.get()));

        if (errors.get().length === 0) {
            API.post(new Bank(bankTemplate.name.get()))
                .then((response) => {
                    console.log("bank api response: ", response);
                    bankTemplate.name.set(response.name);
                });
        }
    };

    return (
        <div className={"banks"}>
            <h2>Добавить банк:</h2>
            <Input valueRef={bankTemplate.name} type={"text"} errorsRef={errors}/>
            <button onClick={addBank}>Add bank</button>
        </div>
    );
}

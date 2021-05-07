import React from "react";
import {API, Bank} from "/src/model/endpoints/bank";
import {StringValidator} from "/src/model/validations";
import {Input} from "/src/view/components/Input";
import {Observable} from "/src/util/observable";

export function Banks() {

    const validator = new StringValidator();

    const bankTemplate = {
        name: new Observable(""),
    };

    const errors = new Observable([]);

    const addBank = function () {

        errors.set(validator
            .init(bankTemplate.name.get())
            .checkLessOrEqualsThen(250)
            .checkNotBlank()
            .errors
        );

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
            <Input valueRef={bankTemplate.name} type={"text"} errorsRef={errors}/>
            <button onClick={addBank}>Add bank</button>
        </div>
    );
}

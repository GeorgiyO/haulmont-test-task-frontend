import React from "react";
import {useHistory} from "react-router-dom";
import {API, ClientTemplate} from "/src/model/endpoints/client";
import {Observable} from "/src/domain/observable";
import {Input} from "../../../components/input";
import {StringValidator} from "../../../../model/validations";

export function AddClient() {

    const history = useHistory();

    const template = new ClientTemplate();
    const errors = {};
    Object.keys(template).forEach((k) => {
        errors[k] = new Observable([]);
    });

    const addClient = function () {
        ["firstName", "secondName", "patronymic"].forEach((nameProp) => {
            errors[nameProp].set(StringValidator.notBlank250LengthMin(template[nameProp].get()));
        })
        errors.passportNumber.set(
            new StringValidator()
                .init(template.passportNumber.get())
                .checkPassport()
                .errors
        );
        errors.email.set(
            new StringValidator()
                .init(template.email.get())
                .checkNoWhitespaces()
                .checkEmail()
                .errors
        );
        errors.phone.set(
            new StringValidator()
                .init(template.phone.get())
                .checkNoWhitespaces()
                .checkPhone()
                .errors
        );

        let valid = true;
        Object.values(errors).forEach((errArr) => {
            if (errArr.get().length !== 0) valid = false
        });

        if (valid) {
            template.passportNumber.set(
                template.passportNumber.get().split(" ").join("")
            );
            API.add(template.toInstance()).then((client) => {
                history.push("/clients/" + client.passportNumber);
            });
        }
    }

    return (
        <div className={"add-page"}>
            <h2>Add client:</h2>
            <Input type={"text"} label={"First name"} valueRef={template.firstName} errorsRef={errors.firstName}/>
            <Input type={"text"} label={"Second name"} valueRef={template.secondName} errorsRef={errors.secondName}/>
            <Input type={"text"} label={"Patronymic"} valueRef={template.patronymic} errorsRef={errors.patronymic}/>
            <Input type={"text"} label={"Passport number"} valueRef={template.passportNumber} errorsRef={errors.passportNumber}/>
            <Input type={"text"} label={"Email"} valueRef={template.email} errorsRef={errors.email}/>
            <Input type={"text"} label={"Phone"} valueRef={template.phone} errorsRef={errors.phone}/>
            <button onClick={addClient}>Add</button>
        </div>
    );
}

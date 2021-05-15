import React from "react";
import {Input} from "src/view/components/input";

export function ClientForm({template, label, buttonLabel, action}) {
    const errors = template.errors;
    return (
        <div className={"entity-form"}>
            <h2>{label}:</h2>
            <Input type={"text"} label={"First name"} valueRef={template.firstName} errorsRef={errors.firstName}/>
            <Input type={"text"} label={"Second name"} valueRef={template.secondName} errorsRef={errors.secondName}/>
            <Input type={"text"} label={"Patronymic"} valueRef={template.patronymic} errorsRef={errors.patronymic}/>

            <Input type={"number"} label={"Passport number"} valueRef={template.passportNumber}
                   errorsRef={errors.passportNumber}
                   inputDecorator={Input.positiveNumberAsString}
            />
            <Input type={"text"} label={"Email"} valueRef={template.email} errorsRef={errors.email}/>
            <Input type={"text"} label={"Phone"} valueRef={template.phone} errorsRef={errors.phone}/>
            <button onClick={action}>{buttonLabel}</button>
        </div>
    )
}

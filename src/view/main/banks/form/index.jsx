import React from "react";
import {Input} from "../../../components/input";

export function BankForm({template, label, buttonLabel, action}) {
    const errors = template.errors;
    return (
        <div className={"entity-form"}>
            <h2>{label}:</h2>
            <Input type={"text"} label={"name"} valueRef={template.name} errorsRef={errors.name}/>
            <button onClick={action}>{buttonLabel}</button>
        </div>
    )
}

import React from "react";
import {API as BanksAPI} from "src/model/entities/bank";
import {EntitySelect} from "src/view/components/entitySelect";
import {Input} from "src/view/components/input";

export function CreditForm({template, label, buttonLabel, action}) {
    const errors = template.errors;
    return (
        <div className={"entity-form"}>
            <h2>{label}:</h2>
            <Input type={"number"} label={"Percentage"} valueRef={template.percentage} errorsRef={errors.percentage}
                   inputDecorator={Input.positiveNumberAsString}
            />
            <Input type={"number"} label={"Limit"} valueRef={template.limit} errorsRef={errors.limit}
                   inputDecorator={Input.positiveNumberAsString}
            />
            <EntitySelect label={"Bank"} valueRef={template.bank}
                          entitiesSupplier={BanksAPI.getAll} entityToText={(bank) => bank.name}
            />
            <button onClick={action}>{buttonLabel}</button>
        </div>
    )
}

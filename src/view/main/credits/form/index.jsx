import React from "react";
import {EntitySelect} from "../../../components/entitySelect";
import {API as BanksAPI} from "../../../../model/entities/bank";
import {Input} from "../../../components/input";

export function CreditForm({template, label, buttonLabel, action}) {
    const errors = template.errors;
    return (
        <div className={"entity-form"}>
            <h2>{label}:</h2>
            <Input type={"text"} label={"Percentage"} valueRef={template.percentage} errorsRef={errors.percentage}/>
            <Input type={"text"} label={"Limit"} valueRef={template.limit} errorsRef={errors.limit}/>
            <EntitySelect label={"Bank"} valueRef={template.bank}
                          entitiesSupplier={BanksAPI.getAll} entityToText={(bank) => bank.name}
            />
            <button onClick={action}>{buttonLabel}</button>
        </div>
    )
}

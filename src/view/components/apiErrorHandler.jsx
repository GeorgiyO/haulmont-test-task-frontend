import React from "react";
import {Entry} from "src/view/components/entry";
import {showError} from "./notify";

export function handleApiError(label, error) {
    const reason = getErrorBodyHandler(error.type)(error);
    showError(
        <div>
            <h3>Error! Code: {error.code}</h3>
            <p>{error.type}</p>
            <p>{label}</p>
            {reason && <div>{reason}</div>}
        </div>
    );
}

function getErrorBodyHandler(type) {
    switch (type) {
        case "not found":
            return handleNotFound;
        case "constraint violation":
            return handleConstraintViolation;
        case "argument type mismatch":
            return handleArgumentTypeMismatch;
        default:
            return console.log;
    }
}

function handleNotFound(error) {
    return error.body;
}

function handleConstraintViolation(error) {

    const errors = [];

    Object.keys(error.body).forEach((k, i) => {
        errors.push(<p key={i}>{k}: {error.body[k]}</p>);
    })

    return (
        <div>
            Fields violations:
            {errors}
        </div>
    );
}

function handleArgumentTypeMismatch(error) {
    return (
        <div>
            Parameter name: {error.body.name}
        </div>
    );
}
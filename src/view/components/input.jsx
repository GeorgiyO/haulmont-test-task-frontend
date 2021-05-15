import React from "react";
import {Observable} from "src/domain/observable";

export function Input({type, label, valueRef, errorsRef = new Observable([]), inputDecorator = (val) => val}) {

    const [value, setValue] = Observable.useWatch(valueRef);
    const [errors, setErrors] = Observable.useWatch(errorsRef);

    const handleInput = (e) => {
        const val = inputDecorator(e.target.value);
        setValue(val);
        setErrors([]);
    }

    return (
        <div className={"input-container"}>
            <p>{label}:</p>
            <input type={type} value={value} onInput={handleInput}/>
            <div className={"errors"}>{errors.map((e, i) => <span key={i}>{e}</span>)}</div>
        </div>
    );
}

Input.positiveNumber = (val) => {
    val = Number(val);
    if (val < 0) return 0;
    return val;
}

Input.positiveNumberAsString = (val) => Input.positiveNumber(val).toString();
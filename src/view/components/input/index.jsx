import React from "react";

export function Input({type, label, valueRef, errorsRef}) {

    const [value, setValue] = React.useState(valueRef.get());
    const [errors, setErrors] = React.useState(errorsRef.get());

    React.useEffect(() => {
        valueRef.consumers.add(setValue);
        errorsRef.consumers.add(setErrors);

        return function () {
            valueRef.consumers.delete(setValue);
            errorsRef.consumers.delete(setErrors);
        }
    }, [valueRef, errorsRef]);

    const handleInput = (e) => {
        errorsRef.set([]);
        valueRef.set(e.target.value);
    }

    const errorsSpans = errors.map((e, i) => <span key={i}>{e}</span>);

    return (
        <div className={"input-container"}>
            <p>{label}:</p>
            <input type={type} value={value} onInput={handleInput}/>
            <div className={"errors"}>{errorsSpans}</div>
        </div>
    );
}
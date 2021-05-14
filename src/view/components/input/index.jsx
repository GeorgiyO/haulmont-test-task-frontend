import React from "react";

export function Input({type, label, valueRef, errorsRef, inputDecorator = (val) => val}) {

    const [value, setValue] = React.useState(valueRef.get());
    const [errors, setErrors] = React.useState(errorsRef.get());

    React.useEffect(() => {
        valueRef.watch(setValue);
        errorsRef.watch(setErrors);

        return function () {
            valueRef.unwatch(setValue);
            errorsRef.unwatch(setErrors);
        }
    }, [valueRef, errorsRef]);

    const handleInput = (e) => {
        const val = inputDecorator(e.target.value);
        errorsRef.set([]);
        valueRef.set(val);
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

Input.positiveNumberDecorator = (val) => {
    val = Number(val);
    if (val < 0) return 0;
    return val;
}
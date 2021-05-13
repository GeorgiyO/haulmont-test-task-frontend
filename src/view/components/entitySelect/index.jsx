import React from "react";

export function EntitySelect({
    label,
    valueRef,
    allowNone = false,
    entitiesSupplier,
    entityToText,
    errorRef
}) {

    const [options, setOptions] = React.useState([]);
    const [value, setValue] = React.useState(valueRef.get());
    const [error, setError] = React.useState("");

    const setRefValue = (json) => valueRef.set(JSON.parse(json));

    React.useEffect(() => {
        errorRef?.consumers.add(setError);

        return function () {
            errorRef?.consumers.delete(setError);
        }
    }, [valueRef, errorRef]);

    React.useEffect(() => {
        entitiesSupplier().then((entities) => {
            setOptions(entities.map((entity, i) => (
                <option key={i} value={JSON.stringify(entity)}>{entityToText(entity)}</option>
            )));
        });
    }, []);

    const handleSelect = (e) => {
        setRefValue(e.target.value);
        setValue(e.target.value);
    }

    return (
        <div className={"select-container"}>
            <p>{label}:</p>
            <select value={value} onChange={handleSelect}>
                {allowNone && <option value={""}>None</option>}
                {options}
            </select>
            <div className={"errors"}>{error}</div>
        </div>
    )
}
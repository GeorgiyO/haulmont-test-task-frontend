import React from "react";

export function EntitySelect({
    label,
    valueRef,
    allowNone = false,
    entitiesSupplier,
    entityToValue,
    entityToText,
    errorRef
}) {

    const [options, setOptions] = React.useState([]);
    const [value, setValue] = React.useState(valueRef.get());
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        valueRef.consumers.add(setValue);
        errorRef?.consumers.add(setError);

        return function () {
            valueRef.consumers.delete(setValue);
            errorRef?.consumers.delete(setError);
        }
    }, [valueRef, errorRef]);

    React.useEffect(() => {
        entitiesSupplier().then((entities) => {
            valueRef.val = entityToValue(entities[0]); // чтобы избежать повторного бесполезного рендера задаем значение напрямую
            setOptions(entities.map((entity, i) => (
                <option key={i} value={entityToValue(entity)}>{entityToText(entity)}</option>
            )));
        });
    }, []);

    const handleSelect = (e) => {
        valueRef.set(e.target.value);
    }

    return (
        <div className={"select-container"}>
            <p>{label}:</p>
            <select value={value} onChange={handleSelect}>
                {allowNone && <option value={""}>None</option>}
                {options}
            </select>
        </div>
    )
}
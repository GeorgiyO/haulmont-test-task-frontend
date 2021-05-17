import React from "react";
import {Observable} from "src/domain/observable";
import {handleApiError} from "src/view/components/apiErrorHandler";

export function EntitySelect({
    label,
    valueRef,
    API,
    entityToText,
    allowNone = false,
    errorsRef = new Observable([""])
}) {

    const [options, setOptions] = React.useState([]);
    const [value, setValue] = React.useState(valueRef.get());

    const [errors] = Observable.useWatch(errorsRef);

    React.useEffect(() => {
        API.getAll()
            .then((entities) => {
                setOptions(entities.map((entity, i) => (
                    <option key={i} value={JSON.stringify(entity)}>{entityToText(entity)}</option>
                )));
                valueRef.set(entities[0]);
            })
            .catch((error) => {
                handleApiError("on get entity list for select", error);
            });
    }, []);


    const setRefValue = (json) => valueRef.set(JSON.parse(json));

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
            <div className={"errors"}>{errors.map((e, i) => <span key={i}>{e}</span>)}</div>
        </div>
    )
}
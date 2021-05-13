import React from "react";

export function Entry({info, value}) {
    return (
        <div className={"entry"}>
            <div className={"info"}>{info}</div>
            <div className={"value"}>{value}</div>
        </div>
    );
}
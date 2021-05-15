import React from "react";

export function Overview() {
    return (
        <div className={"overview"}>
            <h1>Overview</h1>
            <hr/>
            <p>Functions:</p>
            <p>Adding, editing, deleting entities:</p>
            <ul>
                <li>Clients</li>
                <li>Banks</li>
                <li>Credits</li>
                <li>Credit offers (or loan)</li>
            </ul>
            <p>The process of creating loan for a client contains automatic calculations of the:</p>
            <ul>
                <li>Total amount of the interest on the loan</li>
                <li>Amount of the monthly payment, taking into account the interest rates</li>
            </ul>
        </div>
    )
}

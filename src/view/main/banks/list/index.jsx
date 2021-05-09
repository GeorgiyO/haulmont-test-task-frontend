import React from "react";
import {API} from "/src/model/endpoints/bank";
import {Link} from "react-router-dom";

export function BanksList() {

    const [content, setContent] = React.useState("...loading");

    React.useEffect(() => {
        API.getAll().then((banks) => {
            setContent(
                banks.length === 0 ?
                "empty set" :
                banks.map((bank, i) => (
                    <div key={i}>
                        <Link to={"/banks/" + bank.id}>{bank.name}</Link>
                    </div>
                ))
            );
        });
    }, []);

    return (
        <div>
            <p>Banks:</p>
            {content}
        </div>
    );
}

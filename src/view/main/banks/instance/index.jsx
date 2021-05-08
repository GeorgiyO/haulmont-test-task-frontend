import React from "react";
import {
    useParams
} from "react-router-dom";
import {API} from "/src/model/endpoints/bank";

export function BankInstance() {

    const {id} = useParams();

    const [content, setContent] = React.useState("...loading");

    React.useEffect(() => {
        API.getById(id).then((bank) => {
            setContent(
                <div>
                    {bank.name}
                </div>
            )
        });
    }, []);

    return (
        <div>
            {content}
        </div>
    )
}
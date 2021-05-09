import React from "react";
import {
    useParams,
    useHistory
} from "react-router-dom";
import {API} from "/src/model/endpoints/bank";

export function BankInstance() {

    const history = useHistory();
    const {id} = useParams();

    const [content, setContent] = React.useState("...loading");

    const deleteInstance = function () {
        API.delete(id).then(() => {
            history.push("/banks");
        });
    }

    const updateInstance = function () {
        history.push("/banks/update/" + id);
    }

    React.useEffect(() => {
        API.getById(id).then((bank) => {
            setContent(
                <div>
                    <p>{bank.name}</p>
                    <button className={"red"} onClick={deleteInstance}>Delete</button>
                    <button onClick={updateInstance}>Change</button>
                </div>
            )
        });
    }, []);

    return content;
}
import React from "react";
import {API} from "/src/model/endpoints/client";
import {Link} from "react-router-dom";

export function ClientList() {

    const [content, setContent] = React.useState("...loading");

    React.useEffect(() => {
        API.getAll().then((clients) => {
            console.log(clients);
            setContent(
                clients.length === 0 ?
                "empty set" :
                clients.map((client, i) => {
                    const {firstName, secondName, patronymic, passportNumber} = client;
                    return (
                        <div key={i}>
                            <Link to={"/banks/" + passportNumber}>
                                {`${firstName} ${secondName} ${patronymic}`}
                            </Link>
                        </div>
                    );
                })
            );
        });
    }, []);

    return (
        <div>
            <p>Clients:</p>
            {content}
        </div>
    );

}

import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {API, CreditOfferTemplate} from "src/model/entities/creditOffer";
import {CreditOfferForm} from "src/view/main/creditOffers/form";

export function UpdateCreditOffer() {

    const history = useHistory();
    const {id} = useParams();

    const [content, setContent] = React.useState("...loading");

    React.useEffect(() => {
        API.getById(id).then((offer) => {

            offer.paymentGraph.forEach((pge) => {
                pge.date = new Date(pge.date).toISOString().substring(0, 10);
            });
            const template = new CreditOfferTemplate().fromInstance(offer);

            const updateCreditOffer = function () {
                if (template.validate()) {
                    API.update(template.toInstance(), id).then((offer) => {
                        history.push("/credit-offers/" + offer.id);
                    });
                }
            };

            setContent(<CreditOfferForm template={template} label={"Update credit offer"}
                                        buttonLabel={"Update"} action={updateCreditOffer}/>);
        });
    }, []);

    return content;
}

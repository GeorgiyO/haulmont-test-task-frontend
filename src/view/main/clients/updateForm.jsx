import React from "react";
import {ClientForm} from "src/view/main/clients/form";

export function ClientUpdateForm({template, label, buttonLabel, action}) {
    return <ClientForm template={template} label={label} buttonLabel={buttonLabel} action={action} withPassport={false}/>
}
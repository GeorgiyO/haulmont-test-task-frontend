import React from "react";
import {ClientList} from "./list";
import {AddClient} from "./add";
import {ClientInstance} from "./instance";
import {UpdateClient} from "./update";
import {EntityMainPage} from "src/view/components/entityMainPage";

export function Clients() {
    return <EntityMainPage addPage={AddClient}
                           updatePage={UpdateClient}
                           instancePage={ClientInstance}
                           listPage={ClientList}
                           entityName={"client"}
    />;
}

import React from "react";
import {BankList} from "./list";
import {AddBank} from "./add";
import {BankInstance} from "./instance";
import {UpdateBank} from "./update";
import {EntityMainPage} from "src/view/components/entityMainPage";

export function Banks() {
    return <EntityMainPage addPage={AddBank}
                           updatePage={UpdateBank}
                           instancePage={BankInstance}
                           listPage={BankList}
                           entityName={"bank"}
    />
}

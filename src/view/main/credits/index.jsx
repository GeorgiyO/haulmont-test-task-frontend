import React from "react";
import {EntityMainPage} from "src/view/components/entity/entityMainPage";
import {AddCredit} from "./add";
import {UpdateCredit} from "./update";
import {CreditInstance} from "./instance";
import {CreditList} from "./list";

export function Credits() {
    return <EntityMainPage addPage={AddCredit}
                           updatePage={UpdateCredit}
                           instancePage={CreditInstance}
                           listPage={CreditList}
                           entityName={"credit"}
    />
}

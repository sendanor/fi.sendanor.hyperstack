// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { HyperAppDTO } from "../../dto/HyperAppDTO";
import { findHyperAppDTO } from "./findHyperAppDTO";
import { populateHyperAppDTO } from "./populateHyperAppDTO";

export function findAndPopulateHyperAppDTO (
    appName : string,
    allApps : readonly HyperAppDTO[],
) : HyperAppDTO {
    console.log(`WOOT: findAndPopulateHyperAppDTO: 0: `, appName, allApps)
    const item : HyperAppDTO = findHyperAppDTO(appName, allApps);

    if (item.extend === undefined) {
        console.log(`WOOT: findAndPopulateHyperAppDTO: 1: item = `, item);
        return item;
    }

    console.log(`WOOT: findAndPopulateHyperAppDTO: 2: item = `, item);
    return populateHyperAppDTO( item, allApps );
}

// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { find } from "../../../../hg/core/functions/find";
import { HyperAppDTO } from "../../dto/HyperAppDTO";

/**
 *
 * @param appName
 * @param allApps
 */
export function findHyperAppDTO (
    appName : string,
    allApps : readonly HyperAppDTO[],
) : HyperAppDTO {
    const app : HyperAppDTO | undefined = find(
        allApps,
        (a: HyperAppDTO) : boolean => a.name === appName
    );
    if (!app) throw new TypeError(`Could not find app by name: ${appName}`);
    return app;
}

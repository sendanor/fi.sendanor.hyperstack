// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { find } from "../../../../hg/core/functions/find";
import { LogService } from "../../../../hg/core/LogService";
import {
    createHyperViewDTO,
    HyperViewDTO,
} from "../../dto/HyperViewDTO";

const LOG = LogService.createLogger( 'findHyperViewDTO' );

export function findHyperViewDTO (
    viewName : string,
    allViews : readonly HyperViewDTO[],
) : HyperViewDTO {
    const view : HyperViewDTO | undefined = find(
        allViews,
        (a: HyperViewDTO) : boolean => a.name === viewName
    );
    if (!view) {
        LOG.warn(`Warning! Could not find view by name: ${viewName}`);
        return createHyperViewDTO(
            viewName,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
        );
    }
    return view;
}

// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { find } from "../../../../hg/core/functions/find";
import { HyperViewDTO } from "../../dto/HyperViewDTO";

export function findHyperViewDTO (
    viewName : string,
    allViews : readonly HyperViewDTO[],
) : HyperViewDTO {
    let view : HyperViewDTO | undefined = find(
        allViews,
        (a: HyperViewDTO) : boolean => a.name === viewName
    );
    if (!view) throw new TypeError(`Could not find app by name: ${viewName}`);
    return view;
}

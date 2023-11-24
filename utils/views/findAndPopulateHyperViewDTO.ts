// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { HyperViewDTO } from "../../dto/HyperViewDTO";
import { findHyperViewDTO } from "./findHyperViewDTO";
import { populateHyperViewDTO } from "./populateHyperViewDTO";

export function findAndPopulateHyperViewDTO (
    viewName : string,
    allViews : readonly HyperViewDTO[],
    publicUrl : string,
) : HyperViewDTO {
    const view : HyperViewDTO = populateHyperViewDTO(
        findHyperViewDTO(viewName, allViews),
        allViews,
        publicUrl,
    );
    return {
        ...view,
        name: viewName,
    };
}

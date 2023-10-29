// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperRouteDTO, HyperRouteDTO } from "../../../dto/HyperRouteDTO";
import { LOADING_VIEW_NAME } from "../views/LoadingView";

export type LoadingRoute = HyperRouteDTO;

export function createLoadingRoute (
    name: string,
) : LoadingRoute {
    return createHyperRouteDTO(
        name,
        '/',
        undefined,
        undefined,
        undefined,
        LOADING_VIEW_NAME,
        undefined
    );
}

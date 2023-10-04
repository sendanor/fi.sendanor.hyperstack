// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperRouteDTO, HyperRouteDTO } from "../../../../dto/HyperRouteDTO";

export const ANY_ROUTE_NAME : string = 'AnyRoute';

export type AnyRoute = HyperRouteDTO;

export function createAnyRoute (
    redirect: string
) : AnyRoute {
    return createHyperRouteDTO(
        ANY_ROUTE_NAME,
        '*',
        undefined,
        undefined,
        undefined,
        undefined,
        redirect
    );
}

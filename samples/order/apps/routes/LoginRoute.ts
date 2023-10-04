// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperRouteDTO, HyperRouteDTO } from "../../../../dto/HyperRouteDTO";
import { LOGIN_VIEW_NAME } from "../../views/LoginView";

export const LOGIN_ROUTE_NAME : string = 'LoginRoute';

export type LoginRoute = HyperRouteDTO;

export function createLoginRoute () : LoginRoute {
    return createHyperRouteDTO(
        LOGIN_ROUTE_NAME,
        '/',
        undefined,
        undefined,
        undefined,
        LOGIN_VIEW_NAME,
        undefined
    );
}

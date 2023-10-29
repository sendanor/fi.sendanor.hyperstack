// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperRouteDTO, HyperRouteDTO } from "../../../dto/HyperRouteDTO";
import { LOGIN_VIEW_NAME } from "../views/LoginView";

export type LoginRoute = HyperRouteDTO;

export function createLoginRoute (
    name: string,
) : LoginRoute {
    return createHyperRouteDTO(
        name,
        '/',
        undefined,
        undefined,
        undefined,
        LOGIN_VIEW_NAME,
        undefined
    );
}

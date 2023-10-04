// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperAppDTO, HyperAppDTO } from "../../../dto/HyperAppDTO";
import { createAnyRoute } from "./routes/AnyRoute";
import { LOGIN_ROUTE_NAME } from "./routes/LoginRoute";

export const DEFAULT_APP_NAME: string = 'DefaultApp';

export type DefaultApp = HyperAppDTO;

export function createDefaultApp (
    publicUrl: string,
    language: string
) : DefaultApp {
    return createHyperAppDTO(
        DEFAULT_APP_NAME,
        undefined,
        [
            createAnyRoute(LOGIN_ROUTE_NAME)
        ],
        publicUrl,
        language
    );
}

// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperAppDTO, HyperAppDTO } from "../../../dto/HyperAppDTO";
import { DEFAULT_APP_NAME } from "./DefaultApp";
import { createLoginRoute } from "./routes/LoginRoute";

export type OrderApp = HyperAppDTO;

export function createOrderApp (
    myAppName: string
) : OrderApp {
    return createHyperAppDTO(
        myAppName,
        DEFAULT_APP_NAME,
        [
            createLoginRoute()
        ],
        undefined,
        undefined
    );
}

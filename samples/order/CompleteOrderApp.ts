// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperDTO, HyperDTO } from "../../dto/HyperDTO";
import { createDefaultApp } from "./apps/DefaultApp";
import { createOrderApp } from "./apps/OrderApp";
import { createTextComponent } from "./components/TextComponent";
import { createDefaultView } from "./views/DefaultView";
import { createLoginView } from "./views/LoginView";

export type CompleteOrderApp = HyperDTO;

export function createCompleteOrderApp (
    myAppName: string,
    publicUrl: string,
    language: string
) : CompleteOrderApp {
    return createHyperDTO(
        [
            createTextComponent()
        ],
        [
            createDefaultView(),
            createLoginView()
        ],
        [
            createDefaultApp(
                publicUrl,
                language
            ),
            createOrderApp(
                myAppName
            )
        ]
    );
}

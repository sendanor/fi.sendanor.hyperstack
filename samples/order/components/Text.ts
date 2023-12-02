// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperComponentDTO, HyperComponentDTO } from "../../../dto/HyperComponentDTO";
import { TEXT_COMPONENT_NAME } from "./TextComponent";

export type Text = HyperComponentDTO;

export function createText (
    name: string,
    text: string,
) : Text {
    return createHyperComponentDTO(
        name,
        TEXT_COMPONENT_NAME,
        [
            text
        ],
        undefined,
        undefined,
    );
}

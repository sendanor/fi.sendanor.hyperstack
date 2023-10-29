// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperComponentDTO, HyperComponentDTO } from "../../../dto/HyperComponentDTO";
import { HyperComponent } from "../../../dto/types/HyperComponent";

export const TEXT_COMPONENT_NAME: string = 'TextComponent';

export type TextComponent = HyperComponentDTO;

export function createTextComponent (
) : TextComponent {
    return createHyperComponentDTO(
        TEXT_COMPONENT_NAME,
        HyperComponent.Article,
        [],
        undefined,
    );
}

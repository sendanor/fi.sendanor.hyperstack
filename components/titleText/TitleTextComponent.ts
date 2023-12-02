// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperComponentDTO, HyperComponentDTO } from "../../dto/HyperComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const TITLE_TEXT_COMPONENT_NAME: string = 'TitleTextComponent';

export type TitleTextComponent = HyperComponentDTO;

export function createTitleTextComponent (
) : TitleTextComponent {
    return createHyperComponentDTO(
        TITLE_TEXT_COMPONENT_NAME,
        HyperComponent.H1,
        [],
        undefined,
        undefined,
    );
}

export function registerTitleTextComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(TITLE_TEXT_COMPONENT_NAME, createTitleTextComponent);
}

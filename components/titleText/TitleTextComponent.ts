// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../dto/ComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const TITLE_TEXT_COMPONENT_NAME: string = 'TitleTextComponent';

export type TitleTextComponent = ComponentDTO;

export function createTitleTextComponent (
) : TitleTextComponent {
    return createComponentDTO(
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

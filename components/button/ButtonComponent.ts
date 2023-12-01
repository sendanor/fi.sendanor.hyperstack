// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperComponentDTO, HyperComponentDTO } from "../../dto/HyperComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const BUTTON_COMPONENT_NAME: string = 'ButtonComponent';

export type ButtonComponent = HyperComponentDTO;

export function createButtonComponent (
) : ButtonComponent {
    return createHyperComponentDTO(
        BUTTON_COMPONENT_NAME,
        HyperComponent.Button,
        [],
        undefined
    );
}

export function registerButtonComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(BUTTON_COMPONENT_NAME, createButtonComponent);
}

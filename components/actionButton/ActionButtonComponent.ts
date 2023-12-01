// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperComponentDTO, HyperComponentDTO } from "../../dto/HyperComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const ACTION_BUTTON_COMPONENT_NAME: string = 'ActionButtonComponent';

export type ActionButtonComponent = HyperComponentDTO;

export function createActionButtonComponent (
) : ActionButtonComponent {
    return createHyperComponentDTO(
        ACTION_BUTTON_COMPONENT_NAME,
        HyperComponent.ActionButton,
        [],
        {}
    );
}

export function registerActionButtonComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(ACTION_BUTTON_COMPONENT_NAME, createActionButtonComponent);
}

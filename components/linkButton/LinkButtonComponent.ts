// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperComponentDTO, HyperComponentDTO } from "../../dto/HyperComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const LINK_BUTTON_COMPONENT_NAME: string = 'LinkButtonComponent';

export type LinkButtonComponent = HyperComponentDTO;

export function createLinkButtonComponent (
) : LinkButtonComponent {
    return createHyperComponentDTO(
        LINK_BUTTON_COMPONENT_NAME,
        HyperComponent.LinkButton,
        [],
        {},
        undefined,
    );
}

export function registerLinkButtonComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(LINK_BUTTON_COMPONENT_NAME, createLinkButtonComponent);
}

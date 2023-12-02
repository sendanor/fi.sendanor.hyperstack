// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createComponentDTO, ComponentDTO } from "../../dto/ComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { StyleEntity } from "../../entities/StyleEntity";
import { ComponentFactory } from "../../services/ComponentFactory";

export const LINK_BUTTON_COMPONENT_NAME: string = 'LinkButtonComponent';

export type LinkButtonComponent = ComponentDTO;

export function createLinkButtonComponent (
) : LinkButtonComponent {
    return createComponentDTO(
        LINK_BUTTON_COMPONENT_NAME,
        HyperComponent.LinkButton,
        [],
        {},
        StyleEntity.create()
                   .getDTO(),
    );
}

export function registerLinkButtonComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(LINK_BUTTON_COMPONENT_NAME, createLinkButtonComponent);
}

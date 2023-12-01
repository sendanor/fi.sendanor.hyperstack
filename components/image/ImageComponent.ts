// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperComponentDTO, HyperComponentDTO } from "../../dto/HyperComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const IMAGE_COMPONENT_NAME: string = 'ImageComponent';

export type ImageComponent = HyperComponentDTO;

export function createImageComponent (
) : ImageComponent {
    return createHyperComponentDTO(
        IMAGE_COMPONENT_NAME,
        HyperComponent.Image,
        [],
        undefined
    );
}

export function registerImageComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(IMAGE_COMPONENT_NAME, createImageComponent);
}

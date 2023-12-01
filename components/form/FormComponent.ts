// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperComponentDTO, HyperComponentDTO } from "../../dto/HyperComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const FORM_COMPONENT_NAME: string = 'FormComponent';

export type FormComponent = HyperComponentDTO;

export function createFormComponent (
) : FormComponent {
    return createHyperComponentDTO(
        FORM_COMPONENT_NAME,
        HyperComponent.Form,
        [],
        {}
    );
}

export function registerFormComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(FORM_COMPONENT_NAME, createFormComponent);
}

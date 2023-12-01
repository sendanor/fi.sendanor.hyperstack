// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { createHyperComponentDTO, HyperComponentDTO } from "../../dto/HyperComponentDTO";
import { HyperComponent } from "../../dto/types/HyperComponent";
import { ComponentFactory } from "../../services/ComponentFactory";

export const TABLE_COMPONENT_NAME: string = 'TableComponent';

export type TableComponent = HyperComponentDTO;

export function createTableComponent (
) : TableComponent {
    return createHyperComponentDTO(
        TABLE_COMPONENT_NAME,
        HyperComponent.Table,
        [],
        undefined
    );
}

export function registerTableComponent (factory: ComponentFactory) : void {
    factory.registerComponentConstructor(TABLE_COMPONENT_NAME, createTableComponent);
}

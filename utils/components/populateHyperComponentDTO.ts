// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { find } from "../../../../hg/core/functions/find";
import { createHyperComponentDTO, HyperComponentContent, HyperComponentDTO } from "../../dto/HyperComponentDTO";
import { isHyperComponent } from "../../dto/types/HyperComponent";
import { mergeHyperComponentContent } from "./mergeHyperComponentContent";

export function populateHyperComponentDTO (
    component  : HyperComponentDTO,
    components : readonly HyperComponentDTO[]
): HyperComponentDTO {

    const extend: string | undefined = component.extend;
    if ( extend === undefined ) {
        return component;
    }

    const extendComponent: HyperComponentDTO | undefined = find(
        components,
        (c: HyperComponentDTO): boolean => c.name === extend
    );

    const componentContent: HyperComponentContent = component.content;

    if ( !extendComponent ) {
        // Is built in component
        if ( isHyperComponent( extend ) ) {
            return createHyperComponentDTO(
                extend,
                undefined,
                componentContent,
                component.meta,
            );
        }
        throw new TypeError( `Could not find component by name ${extend} to extend for ${component.name}` );
    }

    const extendContent: HyperComponentContent = extendComponent.content;

    return populateHyperComponentDTO(
        createHyperComponentDTO(
            extendComponent.name,
            extendComponent.extend,
            mergeHyperComponentContent(extendContent, componentContent),
            {
                ...extendComponent.meta,
                ...component.meta
            }
        ),
        components
    );

}
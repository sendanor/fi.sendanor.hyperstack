// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { find } from "../../../../hg/core/functions/find";
import { HyperComponentContent } from "../../dto/HyperComponentDTO";
import { createHyperViewDTO, HyperViewDTO } from "../../dto/HyperViewDTO";
import { mergeHyperComponentContent } from "../components/mergeHyperComponentContent";

export function populateHyperViewDTO (
    view: HyperViewDTO,
    components: readonly HyperViewDTO[]
): HyperViewDTO {

    const extend: string | undefined = view.extend;
    if ( extend === undefined ) {
        return view;
    }

    const extendView: HyperViewDTO | undefined = find(
        components,
        (c: HyperViewDTO): boolean => c.name === extend
    );

    if ( !extendView ) {
        throw new TypeError( `Could not find view by name ${extend} to extend for ${view.name}` );
    }

    const componentContent: HyperComponentContent | undefined = view.content;
    const extendContent: HyperComponentContent | undefined = extendView.content;

    return populateHyperViewDTO(
        createHyperViewDTO(
            extendView.name,
            extendView.extend,
            extendView.publicUrl ?? view.publicUrl,
            extendView.language ?? view.language,
            {
                ...(extendView.seo ? extendView.seo : {}),
                ...(view.seo ? view.seo : {}),
            },
            mergeHyperComponentContent(extendContent, componentContent),
            {
                ...(extendView.style ? extendView.style : {}),
                ...(view.style ? view.style : {}),
            },
        ),
        components
    );

}
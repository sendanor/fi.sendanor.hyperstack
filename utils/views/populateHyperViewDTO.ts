// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { find } from "../../../../hg/core/functions/find";
import { LogService } from "../../../../hg/core/LogService";
import { HyperComponentContent } from "../../dto/HyperComponentDTO";
import { createHyperViewDTO, HyperViewDTO } from "../../dto/HyperViewDTO";
import { mergeHyperComponentContent } from "../components/mergeHyperComponentContent";

const LOG = LogService.createLogger( 'populateHyperViewDTO' );

/**
 *
 * @param view
 * @param views
 * @param publicUrl
 */
export function populateHyperViewDTO (
    view: HyperViewDTO,
    views: readonly HyperViewDTO[],
    publicUrl : string,
): HyperViewDTO {

    publicUrl = view.publicUrl ?? publicUrl;

    let extend: string | undefined = view.extend;
    if ( extend === undefined ) {
        return view;
    }
    if (extend.startsWith('/')) {
        extend = `${publicUrl}${extend}`;
    }

    const extendView: HyperViewDTO | undefined = find(
        views,
        (c: HyperViewDTO): boolean => c.name === extend
    );

    if ( !extendView ) {
        LOG.debug(`views = `, views);
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
            {
                ...(extendView.meta ? extendView.meta : {}),
                ...(view.meta ? view.meta : {}),
            },
        ),
        views,
        publicUrl,
    );

}
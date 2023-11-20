// Copyright (c) 2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { some } from "../../../hg/core/functions/some";
import { explainHyperViewDTO, HyperViewDTO, isHyperViewDTO } from "../dto/HyperViewDTO";
import { HyperDTO } from "../dto/HyperDTO";
import { HttpService } from "../../../hg/core/HttpService";
import { LogService } from "../../../hg/core/LogService";
import { ReadonlyJsonAny } from "../../../hg/core/Json";
import { explainHyperComponentDTO, HyperComponentDTO, isHyperComponentDTO } from "../dto/HyperComponentDTO";
import { explainHyperRouteDTO, HyperRouteDTO, isHyperRouteDTO } from "../dto/HyperRouteDTO";

const LOG = LogService.createLogger('HttpService');

export async function populateHyperDTO (
    hyper: HyperDTO,
    baseUrl: string | undefined = undefined
): Promise<HyperDTO> {

    baseUrl = baseUrl ?? hyper.publicUrl ?? '';

    // Views
    let newViews : HyperViewDTO[] = [];
    for (const view of hyper.views) {

        let extend: string | undefined = view.extend;
        if (extend === undefined) {
            newViews.push(view);
            continue;
        }
        if (extend.startsWith('/')) {
            extend = baseUrl + extend;
        }

        if (extend.startsWith('http://') || extend.startsWith('https://')) {

            newViews.push({
                ...view,
                extend
            });

            // Skip if we already have the resource
            if (some(
                [...newViews, ...hyper.views],
                (item: HyperViewDTO) : boolean => item.name === extend
            )) {
                continue;
            }

            // Fetch missing resources
            const response: ReadonlyJsonAny | HyperViewDTO | undefined = await HttpService.getJson(extend);
            if ( isHyperViewDTO(response) ) {
                newViews.push( {
                    ...(response as HyperViewDTO),
                    name: extend,
                } );
            } else {
                LOG.debug( `response: ${explainHyperViewDTO(response)}: `, response );
                throw new TypeError( `Response was not HyperViewDTO` );
            }

        } else {
            newViews.push(view);
        }
    }

    // Components
    let newComponents : HyperComponentDTO[] = [];
    for (const component of hyper.components) {
        newComponents.push(component);
        let extend: string | undefined = component.extend;

        if (extend === undefined) {
            continue;
        }
        if (extend.startsWith('/')) {
            extend = baseUrl + extend;
        }
        if (extend.startsWith('http://') || extend.startsWith('https://')) {

            // Skip if we already have the resource
            if (some(
                [...newComponents, ...hyper.components],
                (item: HyperComponentDTO) : boolean => item.name === extend
            )) {
                continue;
            }

            // Fetch missing resources
            const response: ReadonlyJsonAny | undefined = await HttpService.getJson(extend);
            if ( isHyperComponentDTO( response ) ) {
                newComponents.push( {
                    ...(response as HyperComponentDTO),
                    name: extend
                } );
            } else {
                LOG.debug( `response: ${explainHyperComponentDTO( response )}: `, response );
                throw new TypeError( `Response was not HyperComponentDTO` );
            }

        }
    }

    // Routes
    let newRoutes : HyperRouteDTO[] = [];
    for (const route of hyper.routes) {
        newRoutes.push(route);
        let extend: string | undefined = route.extend;

        if (extend === undefined) {
            continue;
        }
        if (extend.startsWith('/')) {
            extend = baseUrl + extend;
        }
        if (extend.startsWith('http://') || extend.startsWith('https://')) {

            // Skip if we already have the resource
            if (some(
                [...newRoutes, ...hyper.routes],
                (item: HyperRouteDTO) : boolean => item.name === extend
            )) {
                continue;
            }

            // Fetch missing resources
            const response: ReadonlyJsonAny | undefined = await HttpService.getJson(extend);
            if ( isHyperRouteDTO( response ) ) {
                newRoutes.push( {
                    ...(response as HyperRouteDTO),
                    name: extend
                } );
            } else {
                LOG.debug( `response: ${explainHyperRouteDTO( response )}: `, response );
                throw new TypeError( `Response was not HyperRouteDTO` );
            }
            newRoutes.push(response);

        }
    }

    return {
        ...hyper,
        views: newViews,
        components: newComponents,
        routes: newRoutes,
    };

}
